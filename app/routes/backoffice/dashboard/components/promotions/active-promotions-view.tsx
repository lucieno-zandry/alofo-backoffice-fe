import { Zap, Layers, ArrowUpDown } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { SectionHeader } from "../section-header";
import { EmptyState } from "../empty-state";
import { cn } from "~/lib/utils";
import type { ActivePromotion } from "../../types/dashboard-types";

type Props = {
    promotions: ActivePromotion[];
    loading: boolean;
    onRefresh: () => void;
};

function daysLeft(endDate: string): number {
    const diff = new Date(endDate).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function DiscountChip({ discount, type }: { discount: number; type: "PERCENTAGE" | "FIXED_AMOUNT" }) {
    return (
        <span className="rounded-md bg-violet-500/10 px-2 py-0.5 font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
            {type === "PERCENTAGE" ? `${discount}%` : `$${discount}`}
        </span>
    );
}

function DaysLeftChip({ days }: { days: number }) {
    const urgent = days <= 3;
    return (
        <span
            className={cn(
                "rounded-md px-2 py-0.5 text-xs font-medium",
                urgent
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            )}
        >
            {days === 0 ? "Ends today" : `${days}d left`}
        </span>
    );
}

function AppliesToChip({ applies_to }: { applies_to: string }) {
    const labels: Record<string, string> = {
        all: "All",
        client_code_only: "Client",
        regular_only: "Regular",
    };
    return (
        <span className="rounded-md bg-slate-500/10 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400">
            {labels[applies_to] ?? applies_to}
        </span>
    );
}

export function ActivePromotionsView({ promotions, loading, onRefresh }: Props) {
    return (
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm">
            <div className="border-b border-border/50 p-5">
                <SectionHeader
                    title="Active Promotions"
                    subtitle="Currently running campaigns"
                    icon={Zap}
                    iconClass="bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    onRefresh={onRefresh}
                />
            </div>

            <div className="divide-y divide-border/30">
                {loading
                    ? [...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-2 px-5 py-3.5">
                            <Skeleton className="h-3.5 w-36" />
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-12 rounded-md" />
                                <Skeleton className="h-5 w-16 rounded-md" />
                                <Skeleton className="h-5 w-14 rounded-md" />
                            </div>
                        </div>
                    ))
                    : promotions.length === 0
                        ? <EmptyState icon={Zap} title="No active promotions" description="No campaigns running right now" />
                        : promotions.map((p) => (
                            <div key={p.id} className="px-5 py-3.5 transition-colors hover:bg-muted/30">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {p.badge && (
                                                <span className="rounded bg-violet-500 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                                                    {p.badge}
                                                </span>
                                            )}
                                            <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                                        </div>
                                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                            <DiscountChip discount={p.discount} type={p.type} />
                                            <AppliesToChip applies_to={p.applies_to} />
                                            <DaysLeftChip days={daysLeft(p.end_date)} />
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 flex-col items-end gap-1.5 text-muted-foreground">
                                        {/* Priority */}
                                        <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide">
                                            <ArrowUpDown className="h-3 w-3" />
                                            P{p.priority}
                                        </div>
                                        {/* Stackable */}
                                        {p.stackable && (
                                            <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-500">
                                                <Layers className="h-3 w-3" />
                                                Stackable
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
}