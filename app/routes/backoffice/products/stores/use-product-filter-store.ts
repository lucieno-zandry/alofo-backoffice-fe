// ============================================
// STORE: productFilterStore.ts
// ============================================
import { create } from 'zustand';
import type { ProductQueryParams } from '~/lib/serialize-product-params';

interface ProductFilterState {
    filters: ProductQueryParams;
    page: number;
    limit: number;
    setFilters: (filters: Partial<ProductQueryParams>) => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSort: (orderBy: 'created_at' | 'title', direction: 'ASC' | 'DESC') => void;
    resetFilters: () => void;
}

const defaultFilters: ProductQueryParams = {
    search: '',
    category_id: undefined,
    min_price: undefined,
    max_price: undefined,
    variant_option_ids: undefined,
    order_by: 'created_at',
    direction: 'DESC',
    limit: 10,
    page: 1,
    with: ['category', 'variants', 'images'],
};

export const useProductFilterStore = create<ProductFilterState>((set) => ({
    filters: defaultFilters,
    page: 1,
    limit: 10,
    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
            page: 1, // Reset to first page on filter change
        })),
    setPage: (page) => set({ page }),
    setLimit: (limit) =>
        set((state) => ({
            limit,
            filters: { ...state.filters, limit },
            page: 1,
        })),
    setSort: (order_by, direction) =>
        set((state) => ({
            filters: { ...state.filters, order_by, direction },
            page: 1,
        })),
    resetFilters: () => set({ filters: defaultFilters, page: 1, limit: 10 }),
}));