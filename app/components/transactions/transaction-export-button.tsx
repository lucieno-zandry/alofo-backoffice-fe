import { Download, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useTransactionsListStore } from "~/hooks/use-transactions-list-store";
import { useState } from "react";
import { exportTransactions } from "~/api/http-requests";
import { toast } from "sonner";

export type TransactionsExportButtonViewProps = {
    isExporting: boolean;
    onClick: () => void;
};

export function TransactionsExportButtonView({
    isExporting,
    onClick,
}: TransactionsExportButtonViewProps) {
    return (
        <Button
            size="sm"
            variant="outline"
            onClick={onClick}
            disabled={isExporting}
            className="h-9 gap-2 border-zinc-800 text-zinc-400 hover:text-white bg-transparent"
        >
            {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Download className="h-4 w-4" />
            )}
            Export CSV
        </Button>
    );
}

export function TransactionsExportButton() {
    const { getQueryParams } = useTransactionsListStore();
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            const blob = await exportTransactions(getQueryParams());
            const url = URL.createObjectURL(blob as unknown as Blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } catch {
            toast.error("Export failed. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <TransactionsExportButtonView
            isExporting={isExporting}
            onClick={handleExport}
        />
    );
}
