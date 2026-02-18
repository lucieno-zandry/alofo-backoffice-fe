import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { Package } from "lucide-react";
import { useProductListItem, type ProductListItemProps } from "./product-list-item.controller";

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

export function ProductListItem({ product, isSelected, onClick }: ProductListItemProps) {
  const { totalStock, variantCount, lowestPrice, hasDiscount, stockStatus, thumbnail } =
    useProductListItem(product);

  return (
    <button
      onClick={() => onClick(product)}
      className={cn(
        "w-full text-left flex items-center gap-3 px-4 py-3 border-b border-border transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        isSelected && "bg-muted border-l-2 border-l-primary"
      )}
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-12 h-12 rounded-md overflow-hidden bg-muted border border-border flex items-center justify-center">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{product.title}</p>
        <p className="text-xs text-muted-foreground truncate">
          {product.category?.title ?? "Uncategorized"} · {variantCount} variant
          {variantCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Right side */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        {lowestPrice !== null && (
          <span className={cn("text-sm font-semibold", hasDiscount && "text-emerald-600")}>
            {(lowestPrice / 100).toLocaleString("fr-MG", {
              style: "currency",
              currency: "MGA",
              maximumFractionDigits: 0,
            })}
          </span>
        )}
        <Badge variant={stockBadgeVariant[stockStatus]} className="text-xs py-0">
          {stockLabel[stockStatus]}
        </Badge>
      </div>
    </button>
  );
}