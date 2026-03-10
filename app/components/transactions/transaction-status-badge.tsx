import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

// ─── Transaction Status Badge ─────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  SUCCESS: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PENDING: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  FAILED:  "bg-red-500/15 text-red-400 border-red-500/30",
};

export type TransactionStatusBadgeViewProps = {
  status: string;
  className?: string;
};

export function TransactionStatusBadgeView({
  status,
  className,
}: TransactionStatusBadgeViewProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-[11px] tracking-wider uppercase px-2 py-0.5 border",
        STATUS_STYLES[status] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
        className
      )}
    >
      {status}
    </Badge>
  );
}

export type TransactionStatusBadgeProps = TransactionStatusBadgeViewProps;

export default function TransactionStatusBadge(props: TransactionStatusBadgeProps) {
  return <TransactionStatusBadgeView {...props} />;
}
