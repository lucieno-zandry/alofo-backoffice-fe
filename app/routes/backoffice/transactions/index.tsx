import { useEffect } from "react";
import { getTransactions } from "~/api/http-requests";
import { TransactionsExportButton } from "~/components/transactions/transaction-export-button";
import TransactionsFilters from "~/components/transactions/transaction-filters";
import TransactionsBulkActions from "~/components/transactions/transactions-bulk-actions";
import { TransactionsPagination } from "~/components/transactions/transactions-pagination";
import TransactionsSearchBar from "~/components/transactions/transactions-search-bar";
import TransactionsTable from "~/components/transactions/transactions-table";
import { useTransactionsListStore } from "~/hooks/use-transactions-list-store";

export default function TransactionsIndexPage() {
    const {
        getQueryParams,
        setTransactions,
        setLoading,
        setError,
        filtersOpen,
        filters,
        sort,
    } = useTransactionsListStore();

    // Re-fetch whenever filters or sort change
    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = getQueryParams();
                const transactions = (await getTransactions(params)).data!.transactions;
                if (!cancelled) setTransactions(transactions);
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? "Failed to load transactions.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // Depend on the serialized filters + sort so the effect re-runs on changes
        JSON.stringify(filters),
        JSON.stringify(sort),
    ]);

    return (
        <div className="space-y-4 p-6 bg-background/80 backdrop-blur-md rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
                        Transactions
                    </h1>
                    <p className="text-sm text-zinc-500 mt-0.5">
                        All payment, refund, and manual transactions.
                    </p>
                </div>
                <TransactionsExportButton />
            </div>

            {/* Search + filter toggle */}
            <TransactionsSearchBar />

            {/* Collapsible filters */}
            {filtersOpen && <TransactionsFilters />}

            {/* Bulk action bar (only visible when rows are selected) */}
            <TransactionsBulkActions />

            {/* Table */}
            <TransactionsTable />

            {/* Pagination */}
            <TransactionsPagination />
        </div>
    );
}