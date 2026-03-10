import { cn } from "~/lib/utils";
import { Badge } from "../ui/badge";

const METHOD_STYLES: Record<string, string> = {
    VISA: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    MASTERCARD: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    PAYPAL: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    ORANGEMONEY: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    AIRTELMONEY: "bg-red-500/15 text-red-400 border-red-500/30",
    MVOLA: "bg-green-500/15 text-green-400 border-green-500/30",
};

export type TransactionMethodBadgeViewProps = {
    method: string;
    className?: string;
};

export function TransactionMethodBadgeView({
    method,
    className,
}: TransactionMethodBadgeViewProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "font-mono text-[11px] tracking-wider uppercase px-2 py-0.5 border",
                METHOD_STYLES[method] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
                className
            )}
        >
            {method}
        </Badge>
    );
}

export type TransactionMethodBadgeProps = TransactionMethodBadgeViewProps;

export default function TransactionMethodBadge(props: TransactionMethodBadgeProps) {
    return <TransactionMethodBadgeView {...props} />;
}