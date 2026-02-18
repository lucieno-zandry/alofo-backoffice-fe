import { useMemo } from "react";

export function useProductDetail(product: Product) {
    const priceRange = useMemo(() => {
        const prices = product.variants?.map((v) => v.special_price ?? v.price) ?? [];
        if (!prices.length) return null;
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return { min, max, isSingle: min === max };
    }, [product.variants]);

    const totalStock = useMemo(
        () => product.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0,
        [product.variants]
    );

    const skusOnSale = useMemo(
        () => product.variants?.filter((v) => v.special_price !== null).length ?? 0,
        [product.variants]
    );

    const createdAt = new Date(product.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const updatedAt = new Date(product.updated_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return { priceRange, totalStock, skusOnSale, createdAt, updatedAt };
}