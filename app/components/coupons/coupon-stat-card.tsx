// ~/components/coupons/coupon-stat-card.tsx
import { cn } from "~/lib/utils";

export type StatAccent = "default" | "amber" | "red" | "green" | "violet";

export type CouponStatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: StatAccent;
};

export function CouponStatCard({
  icon,
  label,
  value,
  sub,
  accent = "default",
}: CouponStatCardProps) {
  const wrapperCn = cn(
    "rounded-xl border p-3.5 space-y-2",
    accent === "amber" &&
      "border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800",
    accent === "red" &&
      "border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-800",
    accent === "green" &&
      "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800",
    accent === "violet" &&
      "border-violet-200 bg-violet-50/50 dark:bg-violet-950/20 dark:border-violet-800",
    accent === "default" && "bg-muted/30"
  );

  const iconCn = cn(
    "h-7 w-7 rounded-lg flex items-center justify-center",
    accent === "amber" &&
      "bg-amber-100 text-amber-600 dark:bg-amber-900/40",
    accent === "red" &&
      "bg-red-100 text-red-600 dark:bg-red-900/40",
    accent === "green" &&
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40",
    accent === "violet" &&
      "bg-violet-100 text-violet-600 dark:bg-violet-900/40",
    accent === "default" && "bg-background border"
  );

  return (
    <div className={wrapperCn}>
      <div className={iconCn}>{icon}</div>
      <div>
        <p className="text-lg font-bold leading-none">{value}</p>
        <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
        <p className="text-[10px] text-muted-foreground/70">{sub}</p>
      </div>
    </div>
  );
}