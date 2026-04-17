import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  loading: boolean;
  accentClass: string;
};

export function KpiCardView({
  label,
  value,
  icon: Icon,
  trend,
  trendUp,
  loading,
  accentClass,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group">
      {/* Accent glow top bar */}
      <div className={cn("absolute inset-x-0 top-0 h-0.5", accentClass)} />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          {loading ? (
            <Skeleton className="mt-2 h-9 w-32" />
          ) : (
            <p className="mt-1.5 text-3xl font-bold tracking-tight text-foreground font-mono">
              {value}
            </p>
          )}
          {trend && !loading && (
            <p
              className={cn(
                "mt-1.5 text-xs font-medium",
                trendUp ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
            accentClass
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}