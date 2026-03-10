import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCallback } from "react";
import { useTransactionsListStore } from "~/hooks/use-transactions-list-store";
import useDebounce from "~/hooks/use-debounce";

// ─── View ─────────────────────────────────────────────────────────────────────

export type TransactionsSearchBarViewProps = {
    value: string;
    filtersOpen: boolean;
    onSearchChange: (v: string) => void;
    onToggleFilters: () => void;
};

export function TransactionsSearchBarView({
    value,
    filtersOpen,
    onSearchChange,
    onToggleFilters,
}: TransactionsSearchBarViewProps) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                    placeholder="Search by ID, UUID, email, payment reference..."
                    defaultValue={value}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 h-9 bg-zinc-900 border-zinc-800 text-sm placeholder:text-zinc-600"
                />
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={onToggleFilters}
                className={`h-9 gap-2 border-zinc-800 ${filtersOpen ? "bg-zinc-800 text-white" : "bg-transparent text-zinc-400"
                    }`}
            >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
            </Button>
        </div>
    );
}

// ─── Smart ────────────────────────────────────────────────────────────────────

export default function TransactionsSearchBar() {
    const { filters, filtersOpen, setFilter, toggleFiltersOpen } =
        useTransactionsListStore();

    const debouncedSearch = useDebounce(
        (v: string) => setFilter("search", v || undefined),
        350
    );

    return (
        <TransactionsSearchBarView
            value={filters.search ?? ""}
            filtersOpen={filtersOpen}
            onSearchChange={debouncedSearch}
            onToggleFilters={toggleFiltersOpen}
        />
    );
} 