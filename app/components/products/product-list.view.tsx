import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Search, PackageOpen } from "lucide-react";
import { useProductList } from "./product-list.controller";
import { ProductListItem } from "./product-list-item.view";

type ProductListProps = {
  products: Product[];
  selectedId: number | null;
  onSelect: (product: Product) => void;
};

export function ProductList({ products, selectedId, onSelect }: ProductListProps) {
  const { search, setSearch, categoryFilter, setCategoryFilter, categories, filtered } =
    useProductList(products);

  return (
    <div className="flex flex-col h-full border-r border-border">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Products</h2>
          <span className="text-xs text-muted-foreground">{filtered.length} items</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>

        {/* Category filter */}
        <Select
          value={categoryFilter?.toString() ?? "all"}
          onValueChange={(v) =>
            setCategoryFilter(v === "all" ? null : parseInt(v))
          }
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <PackageOpen className="w-10 h-10" />
            <p className="text-sm">No products found</p>
          </div>
        ) : (
          filtered.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              isSelected={selectedId === product.id}
              onClick={onSelect}
            />
          ))
        )}
      </ScrollArea>
    </div>
  );
}