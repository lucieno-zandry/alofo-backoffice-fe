import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { useTransactionsListStore } from "~/hooks/use-transactions-list-store";
import useDebounce from "~/hooks/use-debounce";
import { useEffect, useState } from "react";

// ─── View ─────────────────────────────────────────────────────────────────────

export type TransactionsFiltersViewProps = {
    status: string;
    method: string;
    type: string;
    dateFrom: string;
    dateTo: string;
    amountMin: string;
    amountMax: string;
    orderUuid: string;
    disputeStatus: string;
    onStatusChange: (v: string) => void;
    onMethodChange: (v: string) => void;
    onTypeChange: (v: string) => void;
    onDateFromChange: (v: string) => void;
    onDateToChange: (v: string) => void;
    onAmountMinChange: (v: string) => void;
    onAmountMaxChange: (v: string) => void;
    onOrderUuidChange: (v: string) => void;
    onDisputeStatusChange: (v: string) => void;
    onReset: () => void;
};

export function TransactionsFiltersView({
    status, method, type, dateFrom, dateTo,
    amountMin, amountMax, orderUuid, disputeStatus,
    onStatusChange, onMethodChange, onTypeChange,
    onDateFromChange, onDateToChange,
    onAmountMinChange, onAmountMaxChange,
    onOrderUuidChange, onDisputeStatusChange, onReset,
}: TransactionsFiltersViewProps) {
    return (
        <div className="grid grid-cols-2 gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-lg md:grid-cols-4">
            {/* Status */}
            <div className="space-y-1.5">
                <Label className="text-xs text-zinc-400">Status</Label>
                <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger className="h-8 bg-zinc-800 border-zinc-700 text-xs">
                        <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="*">All</SelectItem>
                        <SelectItem value="SUCCESS">Success</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="FAILED">Failed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Method */}
            <div className="space-y-1.5">
                <Label className="text-xs text-zinc-400">Method</Label>
                <Select value={method} onValueChange={onMethodChange}>
                    <SelectTrigger className="h-8 bg-zinc-800 border-zinc-700 text-xs">
                        <SelectValue placeholder="All methods" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="*">All</SelectItem>
                        {["VISA", "MASTERCARD", "PAYPAL", "ORANGEMONEY", "AIRTELMONEY", "MVOLA"].map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Type */}
            <div className="space-y-1.5">
                <Label className="text-xs text-zinc-400">Type</Label>
                <Select value={type} onValueChange={onTypeChange}>
                    <SelectTrigger className="h-8 bg-zinc-800 border-zinc-700 text-xs">
                        <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="*">All</SelectItem>
                        <SelectItem value="PAYMENT">Payment</SelectItem>
                        <SelectItem value="REFUND">Refund</SelectItem>
                        <SelectItem value="MANUAL">Manual</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Dispute status */}
            <div className="space-y-1.5">
                <Label className="text-xs text-zinc-400">Dispute</Label>
                <Select value={disputeStatus} onValueChange={onDisputeStatusChange}>
                    <SelectTrigger className="h-8 bg-zinc-800 border-zinc-700 text-xs">
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="*">Any</SelectItem>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                        <SelectItem value="LOST">Lost</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Date From */}
            <div className="space-y-1.5">
                <Label className="text-xs text-zinc-400">Date from</Label>
                <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => onDateFromChange(e.target.value)}
                    className="h-8 bg-zinc-800 border-zinc-700 text-xs"
                />
            </div>

            {/* Date To */}
            <div className="space-y-1.5">
                <Label className="text-xs text-zinc-400">Date to</Label>
                <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => onDateToChange(e.target.value)}
                    className="h-8 bg-zinc-800 border-zinc-700 text-xs"
                />
            </div>

            {/* Amount range */}
            <div className="space-y-1.5">
                <Label className="text-xs text-zinc-400">Amount min</Label>
                <Input
                    type="number"
                    placeholder="0"
                    value={amountMin}
                    onChange={(e) => onAmountMinChange(e.target.value)}
                    className="h-8 bg-zinc-800 border-zinc-700 text-xs"
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-zinc-400">Amount max</Label>
                <Input
                    type="number"
                    placeholder="∞"
                    value={amountMax}
                    onChange={(e) => onAmountMaxChange(e.target.value)}
                    className="h-8 bg-zinc-800 border-zinc-700 text-xs"
                />
            </div>

            {/* Order UUID */}
            <div className="col-span-2 space-y-1.5 md:col-span-3">
                <Label className="text-xs text-zinc-400">Order UUID</Label>
                <Input
                    placeholder="Filter by order UUID..."
                    value={orderUuid}
                    onChange={(e) => onOrderUuidChange(e.target.value)}
                    className="h-8 bg-zinc-800 border-zinc-700 text-xs font-mono"
                />
            </div>

            {/* Reset */}
            <div className="flex items-end">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="w-full h-8 text-xs text-zinc-400 hover:text-white"
                >
                    Reset filters
                </Button>
            </div>
        </div>
    );
}

// ─── Smart ────────────────────────────────────────────────────────────────────

export default function TransactionsFilters() {
    const { filters, setFilter, resetFilters } = useTransactionsListStore();

    // Local UI state
    const [orderUuid, setOrderUuid] = useState(filters.order_uuid ?? "");
    const [amountMin, setAmountMin] = useState(String(filters.amount_min ?? ""));
    const [amountMax, setAmountMax] = useState(String(filters.amount_max ?? ""));

    // Debounced values
    const debouncedOrderUuid = useDebounce(orderUuid, 400);
    const debouncedAmountMin = useDebounce(amountMin, 400);
    const debouncedAmountMax = useDebounce(amountMax, 400);

    // Sync debounced values to store
    useEffect(() => {
        setFilter("order_uuid", debouncedOrderUuid || undefined);
    }, [debouncedOrderUuid]);

    useEffect(() => {
        setFilter("amount_min", debouncedAmountMin || undefined);
    }, [debouncedAmountMin]);

    useEffect(() => {
        setFilter("amount_max", debouncedAmountMax || undefined);
    }, [debouncedAmountMax]);

    return (
        <TransactionsFiltersView
            status={filters.status ?? ""}
            method={filters.method ?? ""}
            type={filters.type ?? ""}
            dateFrom={filters.date_from ?? ""}
            dateTo={filters.date_to ?? ""}
            amountMin={amountMin}
            amountMax={amountMax}
            orderUuid={orderUuid}
            disputeStatus={filters.dispute_status ?? ""}

            onStatusChange={(v) => setFilter("status", v || undefined)}
            onMethodChange={(v) => setFilter("method", v || undefined)}
            onTypeChange={(v) => setFilter("type", v || undefined)}
            onDateFromChange={(v) => setFilter("date_from", v || undefined)}
            onDateToChange={(v) => setFilter("date_to", v || undefined)}

            onAmountMinChange={setAmountMin}
            onAmountMaxChange={setAmountMax}
            onOrderUuidChange={setOrderUuid}

            onDisputeStatusChange={(v) =>
                setFilter("dispute_status", v || undefined)
            }

            onReset={() => {
                resetFilters();
                setOrderUuid("");
                setAmountMin("");
                setAmountMax("");
            }}
        />
    );
}