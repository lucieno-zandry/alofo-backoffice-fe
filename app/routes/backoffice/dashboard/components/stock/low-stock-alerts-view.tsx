import { PackageX, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { SectionHeader } from "../section-header";
import { EmptyState } from "../empty-state";
import { cn } from "~/lib/utils";
import type { LowStockVariant } from "../../types/dashboard-types";

type Props = {
  variants: LowStockVariant[];
  loading: boolean;
  onRefresh: () => void;
  lang: string;
};

function StockBar({ stock }: { stock: number }) {
  const pct = Math.min((stock / 5) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            stock === 0 ? "bg-rose-500" : stock <= 2 ? "bg-amber-500" : "bg-yellow-400"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={cn(
          "font-mono text-xs font-bold tabular-nums",
          stock === 0 ? "text-rose-500" : stock <= 2 ? "text-amber-500" : "text-yellow-600 dark:text-yellow-400"
        )}
      >
        {stock}
      </span>
    </div>
  );
}

export function LowStockAlertsView({ variants, loading, onRefresh, lang }: Props) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-sm">
      <div className="border-b border-border/50 p-5">
        <SectionHeader
          title="Low Stock Alerts"
          subtitle="Variants with fewer than 5 units"
          icon={PackageX}
          iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          onRefresh={onRefresh}
        />
      </div>

      <div className="divide-y divide-border/30">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-3.5 w-16" />
              </div>
            ))
          : variants.length === 0
          ? <EmptyState icon={PackageX} title="All stocked up" description="No variants below threshold" />
          : variants.map((v) => (
              <div
                key={v.id}
                className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/30"
              >
                {/* Thumbnail */}
                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {v.image?.url ? (
                    <img src={v.image.url} alt={v.sku} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <PackageX className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {v.product?.title ?? "Unknown Product"}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">{v.sku}</p>
                </div>

                {/* Stock bar */}
                <StockBar stock={v.stock} />

                {/* Link */}
                {v.product?.slug && (
                  <Link
                    to={`/${lang}/products/${v.product.slug}`}
                    className="ml-1 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}