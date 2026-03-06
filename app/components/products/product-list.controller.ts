import { useState, useEffect, useCallback } from "react";
import { useCategoryStore } from "~/hooks/use-category-store";
import { getProducts } from "~/api/http-requests";
import useProductsStore from "~/hooks/use-products-store";
import useDebounce from "~/hooks/use-debounce";
import type { ProductQueryParams } from "~/lib/serialize-product-params";

const PAGE_SIZE = 10;

export type SortOption = {
  order_by: "created_at" | "title";
  direction: "ASC" | "DESC";
  label: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { order_by: "created_at", direction: "DESC", label: "Newest first" },
  { order_by: "created_at", direction: "ASC", label: "Oldest first" },
  { order_by: "title", direction: "ASC", label: "Name A → Z" },
  { order_by: "title", direction: "DESC", label: "Name Z → A" },
];

export type ProductFilters = {
  categoryId: number | null;
  minPrice: string;  // string for controlled inputs, parsed on fetch
  maxPrice: string;
  sortKey: string;   // `${order_by}:${direction}`
};

const DEFAULT_FILTERS: ProductFilters = {
  categoryId: null,
  minPrice: "",
  maxPrice: "",
  sortKey: "created_at:DESC",
};

export function useProductList() {
  const { products, setProducts } = useProductsStore();
  const { categories } = useCategoryStore();

  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [filters, setFiltersState] = useState<ProductFilters>(DEFAULT_FILTERS);
  const debouncedMinPrice = useDebounce(filters.minPrice, 400);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 400);

  // Command overlay
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const [commandResults, setCommandResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedCommandSearch = useDebounce(commandSearch, 300);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const parsedSort = (sortKey: string): Pick<ProductQueryParams, "order_by" | "direction"> => {
    const [order_by, direction] = sortKey.split(":") as ["created_at" | "title", "ASC" | "DESC"];
    return { order_by, direction };
  };

  // Changing any filter resets to page 1
  const setFilters = useCallback((patch: Partial<ProductFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getProducts({
        category_id: filters.categoryId ?? undefined,
        min_price: debouncedMinPrice ? Number(debouncedMinPrice) : undefined,
        max_price: debouncedMaxPrice ? Number(debouncedMaxPrice) : undefined,
        ...parsedSort(filters.sortKey),
        limit: PAGE_SIZE,
        page,
        with: ["category", "images", "variants"],
      });
      setProducts(res.data?.data || []);
      setTotal(res.data?.total ?? 0);
    } finally {
      setIsLoading(false);
    }
  }, [filters.categoryId, filters.sortKey, debouncedMinPrice, debouncedMaxPrice, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Command search: quick lookup, no pagination
  useEffect(() => {
    if (!commandOpen) return;
    if (!debouncedCommandSearch.trim()) {
      setCommandResults([]);
      return;
    }
    setIsSearching(true);
    getProducts({ search: debouncedCommandSearch, limit: 10 })
      .then((res) => setCommandResults(res.data?.data || []))
      .finally(() => setIsSearching(false));
  }, [debouncedCommandSearch, commandOpen]);

  const closeCommand = useCallback(() => {
    setCommandOpen(false);
    setCommandSearch("");
    setCommandResults([]);
  }, []);

  const hasActiveFilters =
    filters.categoryId !== null ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.sortKey !== DEFAULT_FILTERS.sortKey;

  return {
    // list
    products,
    isLoading,
    total,
    // pagination
    page,
    setPage,
    totalPages,
    pageSize: PAGE_SIZE,
    // filters
    filters,
    setFilters,
    resetFilters,
    hasActiveFilters,
    categories,
    // command
    commandOpen,
    setCommandOpen,
    closeCommand,
    commandSearch,
    setCommandSearch,
    commandResults,
    isSearching,
  };
}