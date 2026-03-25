// ~/components/promotions/promotion-assign-variants-dialog.tsx
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "~/components/ui/dialog";
import { toast } from "sonner";
import { VariantPicker } from "~/components/variant-picker/variant-picker";
import { useVariantPickerStore } from "~/hooks/use-variant-picker-store";
import { getCategories, bulkAttachPromotionVariants } from "~/api/http-requests";
import useDebounce from "~/hooks/use-debounce";
import type { ProductQueryParams } from "~/lib/serialize-product-params";

// ── Props ─────────────────────────────────────────────────────────────────────

export type PromotionAssignVariantsDialogProps = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    promotionId: number;
    promotionName: string;
    // Variant IDs already attached to this promotion — shown as "already assigned"
    alreadyAssignedVariantIds: number[];
    // Called after a successful bulk-assign so the detail panel can refresh
    onAssigned: () => void;
};

// ── Component (Smart) ─────────────────────────────────────────────────────────

export function PromotionAssignVariantsDialog({
    open,
    onOpenChange,
    promotionId,
    promotionName,
    alreadyAssignedVariantIds,
    onAssigned,
}: PromotionAssignVariantsDialogProps) {
    // ── Picker store ──────────────────────────────────────────────────────
    const {
        products,
        meta,
        loading,
        params,
        expandedProductIds,
        selectedVariantIds,
        loadProducts,
        setParams,
        toggleExpand,
        expandAll,
        collapseAll,
        toggleProduct,
        toggleVariant,
        getProductSelectionState,
        selectAll,
        clearSelection,
        reset,
    } = useVariantPickerStore();

    // ── Local UI state ────────────────────────────────────────────────────
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState<string>("all");
    const [categories, setCategories] = useState<Category[]>([]);
    const [sortBy, setSortBy] = useState<ProductQueryParams["order_by"]>("created_at");
    const [sortOrder, setSortOrder] = useState<ProductQueryParams["direction"]>("DESC");
    const [perPage, setPerPage] = useState(10);
    const [confirming, setConfirming] = useState(false);

    const debouncedSearch = useDebounce(search, 350);

    // ── Load categories once ──────────────────────────────────────────────
    useEffect(() => {
        if (!open) return;
        getCategories().then((res) => {
            if (res.data?.categories) setCategories(res.data.categories);
        });
    }, [open]);

    // ── Initial product load + reset when dialog opens ────────────────────
    useEffect(() => {
        if (open) {
            reset();
            setSearch("");
            setCategoryId("all");
            setSortBy("created_at");
            setSortOrder("DESC");
            setPerPage(10);
            loadProducts({
                page: 1,
                limit: 10,
                order_by: "created_at",
                direction: "DESC",
                with: ["variants.variant_options.variant_group", "images", "category"],
            });
        }
    }, [open]);

    // ── Reload on search / filter / sort / perPage changes ───────────────
    useEffect(() => {
        if (!open) return;
        const newParams: Partial<ProductQueryParams> = {
            search: debouncedSearch || undefined,
            category_id: categoryId !== "all" ? Number(categoryId) : undefined,
            order_by: sortBy,
            direction: sortOrder,
            limit: perPage,
            page: 1,
            with: ["variants.variant_options.variant_group", "images", "category"],
        };
        setParams(newParams);
        loadProducts(newParams);
    }, [debouncedSearch, categoryId, sortBy, sortOrder, perPage, open]);

    // ── Pagination ────────────────────────────────────────────────────────
    const handlePageChange = (page: number) => {
        setParams({ page });
        loadProducts({ page });
    };

    // ── Confirm: bulk-assign ──────────────────────────────────────────────
    const handleConfirm = async () => {
        // Filter out already-assigned variants
        const alreadySet = new Set(alreadyAssignedVariantIds);
        const toAttach = [...selectedVariantIds].filter((id) => !alreadySet.has(id));

        if (toAttach.length === 0) {
            toast.info("All selected variants are already assigned to this promotion.");
            return;
        }

        setConfirming(true);
        try {
            const res = await bulkAttachPromotionVariants(promotionId, toAttach);
            const result = res.data!;

            if (result.attached.length > 0) {
                toast.success(
                    `${result.attached.length} variant${result.attached.length !== 1 ? "s" : ""} assigned to "${promotionName}"`
                );
            }
            if (result.failed.length > 0) {
                toast.error(`${result.failed.length} variant(s) failed to attach.`);
            }

            onAssigned();
            onOpenChange(false);
        } catch (e: any) {
            toast.error(e?.message ?? "Failed to assign variants");
        } finally {
            setConfirming(false);
        }
    };

    const alreadyAssignedSet = new Set(alreadyAssignedVariantIds);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl h-[82vh] flex flex-col p-0 gap-0 overflow-y-auto">
                <DialogHeader className="px-6 pt-5 pb-4 shrink-0 border-b">
                    <DialogTitle className="flex items-center gap-2">
                        Assign Variants
                        <span className="text-muted-foreground font-normal text-base">
                            → {promotionName}
                        </span>
                    </DialogTitle>
                    <DialogDescription>
                        Select the product variants you want to apply this promotion to.
                        Variants already assigned are shown but cannot be re-selected.
                    </DialogDescription>
                </DialogHeader>

                {/* Picker fills remaining height */}
                <div className="flex-1 min-h-0">
                    <VariantPicker
                        products={products}
                        meta={meta}
                        loading={loading}
                        search={search}
                        onSearchChange={setSearch}
                        categoryId={categoryId}
                        categories={categories}
                        onCategoryChange={setCategoryId}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSortByChange={setSortBy}
                        onSortOrderChange={setSortOrder}
                        perPage={perPage}
                        onPerPageChange={setPerPage}
                        onExpandAll={expandAll}
                        onCollapseAll={collapseAll}
                        expandedProductIds={expandedProductIds}
                        selectedVariantIds={selectedVariantIds}
                        alreadyAssignedVariantIds={alreadyAssignedSet}
                        onToggleExpand={toggleExpand}
                        onToggleProduct={toggleProduct}
                        onToggleVariant={toggleVariant}
                        getProductSelectionState={getProductSelectionState}
                        onPageChange={handlePageChange}
                        onSelectAll={selectAll}
                        onClearSelection={clearSelection}
                        onConfirm={handleConfirm}
                        confirming={confirming}
                        confirmLabel="Assign to promotion"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}