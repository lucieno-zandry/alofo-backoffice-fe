import { Skeleton } from "~/components/ui/skeleton";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { formatShortDate } from "../../helpers/dashboard-helpers";
import type { SalesTrendData } from "../../types/dashboard-types";
import CustomTooltip from "./custom-tooltip";

type Props = {
    data: SalesTrendData | null;
    loading: boolean;
    currencySymbol: string;
};

export function SalesTrendView({ data, loading, currencySymbol }: Props) {
    const chartData =
        data?.labels.map((label, i) => ({
            label: formatShortDate(label),
            revenue: data.data[i] ?? 0,
        })) ?? [];

    return (
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                        Sales Trend
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground/60">
                        Last 14 days — daily revenue
                    </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
                        Revenue
                    </span>
                </div>
            </div>

            {loading ? (
                <Skeleton className="h-52 w-full rounded-xl" />
            ) : (
                <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 4, right: 8, left: -24, bottom: 0 }}

                        >
                            <defs>
                                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="currentColor"
                                className="text-border/40"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="label"
                                tick={{ fontSize: 11, fill: "currentColor" }}
                                className="text-muted-foreground"
                                axisLine={false}
                                tickLine={false}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "currentColor" }}
                                className="text-muted-foreground"
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${currencySymbol} ${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
                            />
                            <Tooltip content={<CustomTooltip currencySymbol={currencySymbol} />} />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8b5cf6"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 5, fill: "#8b5cf6", stroke: "white", strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}