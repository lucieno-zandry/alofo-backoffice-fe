import { useMemo, useState } from "react";

export function useProductList(products: Product[]) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

  const categories = useMemo(() => {
    const map = new Map<number, string>();
    products.forEach((p) => {
      if (p.category) map.set(p.category.id, p.category.title);
    });
    return Array.from(map.entries()).map(([id, title]) => ({ id, title }));
  }, [products]);

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