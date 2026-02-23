import { useMemo, useState } from "react";
import { useCategoryStore } from "~/hooks/use-category-store";

export function useProductList(products: Product[]) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

  const { categories } = useCategoryStore();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === null || p.category_id === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  return { search, setSearch, categoryFilter, setCategoryFilter, categories, filtered };
}