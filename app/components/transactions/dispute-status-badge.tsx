import { cn } from "~/lib/utils";
import { Badge } from "../ui/badge";

const DISPUTE_STYLES: Record<string, string> = {
    OPEN: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    RESOLVED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    LOST: "bg-red-500/15 text-red-400 border-red-500/30",
};

export type DisputeStatusBadgeViewProps = {
    status: string;
    className?: string;
};

export function DisputeStatusBadgeView({ status, className }: DisputeStatusBadgeViewProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "font-mono text-[11px] tracking-wider uppercase px-2 py-0.5 border",
                DISPUTE_STYLES[status] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
                className
            )}
        >
            ⚠ {status}
        </Badge>
    );
}

export function DisputeStatusBadge(props: DisputeStatusBadgeViewProps) {
    return <DisputeStatusBadgeView {...props} />;
}