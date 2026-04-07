// ============================================
// COMPONENT: ProductList.tsx (Smart + Dumb)
// ============================================
import { useParams } from 'react-router';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '~/components/ui/pagination';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { useState } from 'react';
import { useProducts } from '../hooks/use-products';
import { useDeleteProduct } from '../hooks/use-delete-product';
import { useProductFilterStore } from '../stores/use-product-filter-store';
import { Loader2, Trash2, Package } from 'lucide-react';
import formatPrice from '~/lib/format-price';
import { cn } from '~/lib/utils';
import appNavigate from '~/lib/app-navigate';
import { ProductListSkeleton } from './product-list-skeleton';
import { ProductListItem } from './product-list-item';

const stockBadgeVariant = {
    in_stock: "default",
    low_stock: "secondary",
    out_of_stock: "destructive",
} as const;

const stockLabel = {
    in_stock: "In Stock",
    low_stock: "Low Stock",
    out_of_stock: "Out of Stock",
} as const;

// Dumb Component
interface ProductListViewProps {
    products: Product[];
    isLoading: boolean;
    currentPage: number;
    lastPage: number;
    selectedSlug?: string;
    onSelectProduct: (slug: string) => void;
    onPageChange: (page: number) => void;
    onDeleteClick: (product: Product) => void;
}

export const ProductListView = ({
    products,
    isLoading,
    currentPage,
    lastPage,
    selectedSlug,
    onSelectProduct,
    onPageChange,
    onDeleteClick,
}: ProductListViewProps) => {
    if (isLoading) {
        return <ProductListSkeleton />
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed rounded-xl bg-card">
                <div className="bg-muted p-4 rounded-full mb-4">
                    <Package className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-muted-foreground mt-1 max-w-sm">
                    Adjust your search or filters to find what you're looking for.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-card overflow-hidden divide-y divide-border shadow-sm flex flex-col">
                {products.map((product) => {
                    const isSelected = selectedSlug === product.slug;

                    return <ProductListItem
                        isSelected={isSelected}
                        onDelete={onDeleteClick}
                        onSelect={onSelectProduct}
                        product={product}
                        key={product.id} />;
                })}
            </div>

            {/* Pagination Controls */}
            {lastPage > 1 && (
                <Pagination className="justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>
                        {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
                            let pageNum: number;
                            if (lastPage <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= lastPage - 2) {
                                pageNum = lastPage - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        onClick={() => onPageChange(pageNum)}
                                        isActive={currentPage === pageNum}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                        {lastPage > 5 && currentPage < lastPage - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
                                className={currentPage === lastPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

// Smart Component
export const ProductList = () => {
    const { slug } = useParams();
    const { data, isLoading} = useProducts();
    const { setPage } = useProductFilterStore();
    const deleteProduct = useDeleteProduct();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const products = data?.data || [];
    const currentPage = data?.current_page || 1;
    const lastPage = data?.last_page || 1;

    const handleSelectProduct = (productSlug: string) => {
        appNavigate(`/products/${productSlug}`);
    };

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            deleteProduct.mutate([productToDelete.id]);
            setDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    return (
        <>
            <ProductListView
                products={products}
                isLoading={isLoading}
                currentPage={currentPage}
                lastPage={lastPage}
                selectedSlug={slug}
                onSelectProduct={handleSelectProduct}
                onPageChange={setPage}
                onDeleteClick={handleDeleteClick}
            />

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete <span className="font-semibold text-foreground">"{productToDelete?.title}"</span>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};