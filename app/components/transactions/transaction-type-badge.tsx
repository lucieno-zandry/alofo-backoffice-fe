import { cn } from "~/lib/utils";
import { Badge } from "../ui/badge";

const TYPE_STYLES: Record<string, string> = {
    PAYMENT: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    REFUND: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    MANUAL: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

export type TransactionTypeBadgeViewProps = {
    type: string;
    className?: string;
};

export function TransactionTypeBadgeView({
    type,
    className,
}: TransactionTypeBadgeViewProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "font-mono text-[11px] tracking-wider uppercase px-2 py-0.5 border",
                TYPE_STYLES[type] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
                className
            )}
        >
            {type}
        </Badge>
    );
}

export type TransactionTypeBadgeProps = TransactionTypeBadgeViewProps;

export default function TransactionTypeBadge(props: TransactionTypeBadgeProps) {
    return <TransactionTypeBadgeView {...props} />;
}