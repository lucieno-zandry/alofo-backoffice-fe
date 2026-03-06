import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteProducts } from "~/api/http-requests";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import useProductDeleteDialogStore from "~/hooks/use-product-delete-dialog-store";
import { useRefetchProducts } from "~/hooks/use-product-list-store";
import useRouterStore from "~/hooks/use-router-store";

type VariantOption = {
    id: number;
    created_at: string;
    updated_at: string;
    value: string;
    variant_group_id: number;
    variants?: Variant[];
    variant_group?: VariantGroup;
};
// -------------------------------------

interface ProductDeleteDialogProps {
    /** The product currently selected for deletion */
    product: Product | null;
    /** Controls whether the dialog is visible */
    isOpen: boolean;
    /** Callback to update the open state of the dialog */
    onOpenChange: (open: boolean) => void;
    /** Callback fired when the user confirms the deletion */
    onConfirmDelete: (productId: number) => void;
    /** Optional loading state for the delete button */
    isDeleting?: boolean;
}

export function ProductDeleteDialogView({
    product,
    isOpen,
    onOpenChange,
    onConfirmDelete,
    isDeleting = false,
}: ProductDeleteDialogProps) {
    // If no product is selected, we don't render the content
    if (!product) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-foreground">
                            {product.title}
                        </span>
                        ? This action cannot be undone and will permanently remove the product, its variants, and associated data from the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            // Prevent the dialog from closing immediately if you want to show a loading state
                            e.preventDefault();
                            onConfirmDelete(product.id);
                        }}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function () {
    const { product, setProduct } = useProductDeleteDialogStore();
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const { lang } = useRouterStore();
    const refetchProducts = useRefetchProducts();

    const isOpen = useMemo(() => !!product, [product]);

    const handleOpenChange = useCallback(() => {
        setProduct(null);
    }, [setProduct]);

    const handleConfirmDelete = useCallback(async () => {
        if (!product) return;
        setIsDeleting(true);

        try {
            await deleteProducts([product.id]);
            await refetchProducts();
            setProduct(null);
            navigate(`/${lang}/products`);
            toast.success('Product removed successfully');
        } catch (e) {
            toast.error("Failed to delete product");
            console.error(`Failed to delete product : `, e);
        } finally {
            setIsDeleting(false);
        }
    }, [product, lang, navigate]);

    return <ProductDeleteDialogView
        isOpen={isOpen}
        onConfirmDelete={handleConfirmDelete}
        onOpenChange={handleOpenChange}
        product={product}
        isDeleting={isDeleting} />
}