import { CheckCheck, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useTransactionsListStore } from "~/hooks/use-transactions-list-store";
import { useState } from "react";
import { bulkReviewTransactions } from "~/api/http-requests";
import { toast } from "sonner";

export type TransactionsBulkActionsViewProps = {
    count: number;
    isReviewing: boolean;
    onReview: () => void;
    onClear: () => void;
};

export function TransactionsBulkActionsView({
    count,
    isReviewing,
    onReview,
    onClear,
}: TransactionsBulkActionsViewProps) {
    if (count === 0) return null;

    return (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-violet-500/10 border border-violet-500/30 rounded-lg">
            <span className="text-sm text-violet-300 font-medium">
                {count} selected
            </span>
            <div className="flex items-center gap-2 ml-auto">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onReview}
                    disabled={isReviewing}
                    className="h-7 text-xs gap-1.5 border-violet-500/30 text-violet-300 hover:text-white hover:bg-violet-500/20"
                >
                    {isReviewing ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                        <CheckCheck className="h-3 w-3" />
                    )}
                    Mark reviewed
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onClear}
                    className="h-7 w-7 p-0 text-zinc-500 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default function TransactionsBulkActions() {
    const { selectedUuids, transactions, clearSelection } = useTransactionsListStore();
    const [isReviewing, setIsReviewing] = useState(false);

    const handleReview = async () => {
        setIsReviewing(true);
        try {
            const uuids = Array.from(selectedUuids);
            await bulkReviewTransactions(uuids);
            toast.success(`${uuids.length} transactions marked as reviewed.`);
            clearSelection();
        } catch {
            toast.error("Failed to mark transactions as reviewed.");
        } finally {
            setIsReviewing(false);
        }
    };

    return (
        <TransactionsBulkActionsView
            count={selectedUuids.size}
            isReviewing={isReviewing}
            onReview={handleReview}
            onClear={clearSelection}
        />
    );
}
