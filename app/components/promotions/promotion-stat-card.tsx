// ~/components/promotions/promotion-stat-card.tsx
import { cn } from "~/lib/utils";

export type StatAccent = "default" | "amber" | "red" | "green" | "violet" | "indigo" | "teal";

export type PromotionStatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: StatAccent;
};

const accentMap: Record<
  StatAccent,
  { wrapper: string; icon: string }
> = {
  default: {
    wrapper: "bg-muted/30",
    icon: "bg-background border",
  },
  amber: {
    wrapper:
      "border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800",
    icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/40",
  },
  red: {
    wrapper:
      "border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-800",
    icon: "bg-red-100 text-red-600 dark:bg-red-900/40",
  },
  green: {
    wrapper:
      "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40",
  },
  violet: {
    wrapper:
      "border-violet-200 bg-violet-50/50 dark:bg-violet-950/20 dark:border-violet-800",
    icon: "bg-violet-100 text-violet-600 dark:bg-violet-900/40",
  },
  indigo: {
    wrapper:
      "border-indigo-200 bg-indigo-50/50 dark:bg-indigo-950/20 dark:border-indigo-800",
    icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40",
  },
  teal: {
    wrapper:
      "border-teal-200 bg-teal-50/50 dark:bg-teal-950/20 dark:border-teal-800",
    icon: "bg-teal-100 text-teal-600 dark:bg-teal-900/40",
  },
};

export function PromotionStatCard({
  icon,
  label,
  value,
  sub,
  accent = "default",
}: PromotionStatCardProps) {
  const { wrapper, icon: iconCn } = accentMap[accent];

  return (
    <div className={cn("rounded-xl border p-3.5 space-y-2", wrapper)}>
      <div
        className={cn(
          "h-7 w-7 rounded-lg flex items-center justify-center",
          iconCn
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold leading-none">{value}</p>
        <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
        <p className="text-[10px] text-muted-foreground/70">{sub}</p>
      </div>
    </div>
  );
}