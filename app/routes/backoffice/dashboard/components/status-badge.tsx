import { cn } from "~/lib/utils";

type StatusBadgeProps = {
  label: string;
  variant:
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral"
    | "pending";
};

const variantStyles: Record<StatusBadgeProps["variant"], string> = {
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20",
  danger: "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20",
  info: "bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-500/20",
  neutral: "bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20",
  pending: "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-500/20",
};

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1",
        variantStyles[variant]
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          variant === "success" && "bg-emerald-500",
          variant === "warning" && "bg-amber-500",
          variant === "danger" && "bg-rose-500",
          variant === "info" && "bg-sky-500",
          variant === "neutral" && "bg-slate-500",
          variant === "pending" && "bg-violet-500"
        )}
      />
      {label}
    </span>
  );
}