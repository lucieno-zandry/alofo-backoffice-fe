import { useParams } from "react-router";
import { useDashboardStore } from "../../stores/use-dashboard-store";
import { useDashboardData } from "../../hooks/use-dashboard-data";
import { TransactionIssuesView } from "./transaction-issues-view";
import { bulkReviewTransactions } from "~/api/http-requests";
import { toast } from "sonner";

export function TransactionIssues() {
  const { failedTransactions, disputes, loading } = useDashboardStore();
  const { refresh } = useDashboardData();
  const params = useParams();
  const lang = (params as any).lang ?? "en";

  async function handleMarkReviewed(uuid: string) {
    try {
      await bulkReviewTransactions([uuid]);
      toast.success("Transaction marked as reviewed");
      refresh.transactions();
    } catch {
      toast.error("Failed to mark as reviewed");
    }
  }

  function handleOpenRefund(uuid: string) {
    // Navigate to transaction detail page which has a refund flow
    window.location.href = `/${lang}/transactions/${uuid}`;
  }

  return (
    <TransactionIssuesView
      failed={failedTransactions}
      disputes={disputes}
      loading={loading.transactions}
      onRefresh={refresh.transactions}
      onMarkReviewed={handleMarkReviewed}
      onOpenRefund={handleOpenRefund}
      lang={lang}
    />
  );
}