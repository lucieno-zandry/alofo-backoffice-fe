import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { Tag, CalendarDays, RefreshCw, Layers, Pencil } from "lucide-react";
import { useProductDetail } from "./product-detail.controller";
import { ProductImages } from "./product-images.view";
import { VariantsTable } from "../variants/variants-table.view";

type ProductDetailProps = {
  product: Product;
};

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="text-foreground font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { priceRange, totalStock, skusOnSale, createdAt, updatedAt } =
    useProductDetail(product);

  const formatPrice = (cents: number) =>
    (cents / 100).toLocaleString("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    });

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-border shrink-0">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold leading-tight">{product.title}</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">/{product.slug}</p>
        </div>
        <Button size="sm" variant="outline" className="shrink-0 gap-1.5">
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-6 py-5 space-y-6">
          {/* Images */}
          <ProductImages images={product.images ?? []} />

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border p-3 text-center">
              <p className="text-2xl font-bold">{product.variants?.length ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Variants</p>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <p className="text-2xl font-bold">{totalStock}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Units</p>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <p className="text-2xl font-bold">{skusOnSale}</p>
              <p className="text-xs text-muted-foreground mt-0.5">On Sale</p>
            </div>
          </div>

          {/* Price range */}
          {priceRange && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">
                {priceRange.isSingle
                  ? formatPrice(priceRange.min)
                  : `${formatPrice(priceRange.min)} – ${formatPrice(priceRange.max)}`}
              </span>
            </div>
          )}

          {/* Category */}
          {product.category && (
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-muted-foreground" />
              <Badge variant="outline">{product.category.title}</Badge>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold mb-1">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Variants table */}
          <VariantsTable
            variants={product.variants ?? []}
            variantGroups={product.variant_groups ?? []}
          />

          <Separator />

          {/* Metadata */}
          <div className="space-y-1.5">
            <MetaItem icon={CalendarDays} label="Created" value={createdAt} />
            <MetaItem icon={RefreshCw} label="Updated" value={updatedAt} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}