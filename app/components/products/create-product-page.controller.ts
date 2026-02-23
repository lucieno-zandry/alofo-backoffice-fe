import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createFullProduct } from "~/api/http-requests";
import useRouterStore from "~/hooks/use-router-store";
import { buildFullCreateFormData } from "~/lib/build-formdata";

// --- helpers -----------------------------------------------------------------

let _id = 0;
const uid = (prefix: string) => `${prefix}_${++_id}`;

function emptyDraft(): ProductDraft {
    return {
        title: "",
        slug: "",
        description: "",
        category_id: "",
        images: [],
        variantGroups: [],
        variants: [],
    };
}

export type Step = 1 | 2 | 3;

// --- hook --------------------------------------------------------------------

export function useCreateProductPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>(1);
    const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isCreateProductSheetOpen, setIsCreateProductSheetOpen] = useState(false);

    // --- Step navigation -------------------------------------------------------

    const goTo = (s: Step) => setStep(s);
    const goNext = () => setStep((s) => Math.min(s + 1, 3) as Step);
    const goPrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

    // --- Step 1: basics --------------------------------------------------------

    const setBasics = useCallback(
        (
            fields: Partial<
                Pick<ProductDraft, "title" | "slug" | "description" | "category_id">
            >
        ) => {
            setDraft((d) => ({ ...d, ...fields }));
        },
        []
    );

    const setImages = useCallback((files: File[]) => {
        setDraft((d) => ({ ...d, images: files.slice(0, 4) }));
    }, []);

    /**
     * Called on every title keystroke.
     * The random prefix is read from the ref — it was created once on mount
     * and never changes, so the slug is stable while the user types.
     *
     * Example:  title "Classic Shoe"  =>  slug "a3f9bc12-classic-shoe"
     */
    const setTitleAndSlug = useCallback((title: string) => {
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        setDraft((d) => ({ ...d, title, slug }));
    }, []); // slugPrefix.current is a ref -- safe to omit from deps

    // --- Step 2: variant groups ------------------------------------------------

    const addGroup = useCallback(() => {
        const newGroup: DraftVariantGroup = {
            tempId: uid("grp"),
            name: "",
            options: [],
        };
        setDraft((d) => ({
            ...d,
            variantGroups: [...d.variantGroups, newGroup],
        }));
    }, []);

    const updateGroupName = useCallback((groupTempId: string, name: string) => {
        setDraft((d) => ({
            ...d,
            variantGroups: d.variantGroups.map((g) =>
                g.tempId === groupTempId ? { ...g, name } : g
            ),
        }));
    }, []);

    const removeGroup = useCallback((groupTempId: string) => {
        setDraft((d) => ({
            ...d,
            variantGroups: d.variantGroups.filter((g) => g.tempId !== groupTempId),
            variants: d.variants.filter(
                (v) => !v.optionRefs.some((r) => r.groupTempId === groupTempId)
            ),
        }));
    }, []);

    const addOption = useCallback((groupTempId: string) => {
        const newOpt: DraftOption = { tempId: uid("opt"), value: "" };
        setDraft((d) => ({
            ...d,
            variantGroups: d.variantGroups.map((g) =>
                g.tempId === groupTempId
                    ? { ...g, options: [...g.options, newOpt] }
                    : g
            ),
        }));
    }, []);

    const updateOption = useCallback(
        (groupTempId: string, optionTempId: string, value: string) => {
            setDraft((d) => ({
                ...d,
                variantGroups: d.variantGroups.map((g) =>
                    g.tempId === groupTempId
                        ? {
                            ...g,
                            options: g.options.map((o) =>
                                o.tempId === optionTempId ? { ...o, value } : o
                            ),
                        }
                        : g
                ),
            }));
        },
        []
    );

    const removeOption = useCallback(
        (groupTempId: string, optionTempId: string) => {
            setDraft((d) => ({
                ...d,
                variantGroups: d.variantGroups.map((g) =>
                    g.tempId === groupTempId
                        ? {
                            ...g,
                            options: g.options.filter((o) => o.tempId !== optionTempId),
                        }
                        : g
                ),
                variants: d.variants.filter(
                    (v) =>
                        !v.optionRefs.some(
                            (r) =>
                                r.groupTempId === groupTempId &&
                                r.optionTempId === optionTempId
                        )
                ),
            }));
        },
        []
    );

    // --- Step 3: variants ------------------------------------------------------

    const generateVariants = useCallback((currentDraft: ProductDraft) => {
        const groups = currentDraft.variantGroups.filter(
            (g) => g.options.length > 0
        );

        if (!groups.length) {
            const existing = currentDraft.variants.find((v) => !v.optionRefs.length);
            return [
                existing ?? {
                    tempId: uid("var"),
                    sku: "",
                    price: "",
                    special_price: "",
                    stock: "",
                    optionRefs: [],
                },
            ];
        }

        type Combo = DraftVariantOptionRef[];
        let combos: Combo[] = [[]];
        for (const group of groups) {
            const next: Combo[] = [];
            for (const combo of combos) {
                for (const opt of group.options) {
                    next.push([
                        ...combo,
                        { groupTempId: group.tempId, optionTempId: opt.tempId },
                    ]);
                }
            }
            combos = next;
        }

        return combos.map((refs) => {
            const existing = currentDraft.variants.find(
                (v) =>
                    v.optionRefs.length === refs.length &&
                    refs.every((r) =>
                        v.optionRefs.some(
                            (vr) =>
                                vr.groupTempId === r.groupTempId &&
                                vr.optionTempId === r.optionTempId
                        )
                    )
            );
            if (existing) return existing;

            const optLabels = refs.map((r) => {
                const g = currentDraft.variantGroups.find(
                    (g) => g.tempId === r.groupTempId
                );
                const o = g?.options.find((o) => o.tempId === r.optionTempId);
                return o?.value?.toUpperCase().slice(0, 3) ?? "?";
            });
            const skuBase = currentDraft.title
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .slice(0, 4);

            return {
                tempId: uid("var"),
                sku: [skuBase, ...optLabels].filter(Boolean).join("-"),
                price: "",
                special_price: "",
                stock: "",
                optionRefs: refs,
            } satisfies DraftVariant;
        });
    }, []);

    const applyGeneratedVariants = useCallback(() => {
        setDraft((d) => ({ ...d, variants: generateVariants(d) }));
    }, [generateVariants]);

    const updateVariant = useCallback(
        (
            variantTempId: string,
            fields: Partial<
                Pick<DraftVariant, "sku" | "price" | "special_price" | "stock">
            >
        ) => {
            setDraft((d) => ({
                ...d,
                variants: d.variants.map((v) =>
                    v.tempId === variantTempId ? { ...v, ...fields } : v
                ),
            }));
        },
        []
    );

    const removeVariant = useCallback((variantTempId: string) => {
        setDraft((d) => ({
            ...d,
            variants: d.variants.filter((v) => v.tempId !== variantTempId),
        }));
    }, []);

    const bulkSetVariants = useCallback(
        (
            fields: Partial<Pick<DraftVariant, "price" | "special_price" | "stock">>
        ) => {
            setDraft((d) => ({
                ...d,
                variants: d.variants.map((v) => ({ ...v, ...fields })),
            }));
        },
        []
    );

    // --- Validation ------------------------------------------------------------

    const step1Valid =
        draft.title.trim().length >= 2 && draft.slug.trim().length >= 2;

    const step2Valid = draft.variantGroups.every(
        (g) =>
            g.name.trim().length >= 2 &&
            g.options.length > 0 &&
            g.options.every((o) => o.value.trim().length >= 1)
    );

    const step3Valid =
        draft.variants.length > 0 &&
        draft.variants.every(
            (v) => v.sku.trim().length >= 2 && v.price !== "" && v.stock !== ""
        );

    // --- Submit ----------------------------------------------------------------

    const { lang } = useRouterStore();

    const submit = useCallback(async () => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const fd = buildFullCreateFormData(draft);
            const result = await createFullProduct(fd);
            toast.success("Product created successfully!");
            navigate(`/${lang}/products/${result.data!.product.slug}`);

            setIsCreateProductSheetOpen(false);
        } catch (err: any) {
            setSubmitError(err?.message ?? "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    }, [draft, navigate, lang]);

    return {
        step,
        draft,
        goTo,
        goNext,
        goPrev,
        setTitleAndSlug,
        setBasics,
        setImages,
        addGroup,
        updateGroupName,
        removeGroup,
        addOption,
        updateOption,
        removeOption,
        applyGeneratedVariants,
        updateVariant,
        removeVariant,
        bulkSetVariants,
        step1Valid,
        step2Valid,
        step3Valid,
        isSubmitting,
        submitError,
        submit,
        isCreateProductSheetOpen,
        setIsCreateProductSheetOpen
    };
}

export type CreateProductPageController = ReturnType<typeof useCreateProductPage>;