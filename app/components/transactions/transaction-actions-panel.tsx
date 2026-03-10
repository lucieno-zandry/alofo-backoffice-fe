import { AlertTriangle, CheckSquare, RefreshCw, Send, ShieldAlert } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { toast } from "sonner";
import { useState } from "react";
import { useTransactionDetailStore } from "~/hooks/use-transaction-detail-store";
import { resendTransactionNotification } from "~/api/http-requests";

// ─── View ─────────────────────────────────────────────────────────────────────

export type TransactionActionsPanelViewProps = {
  canOverrideStatus: boolean;
  canRefund: boolean;
  canResend: boolean;
  canOpenDispute: boolean;
  canResolveDispute: boolean;
  isResending: boolean;
  onOverrideStatus: () => void;
  onRefund: () => void;
  onResend: () => void;
  onOpenDispute: () => void;
  onResolveDispute: () => void;
};

export function TransactionActionsPanelView({
  canOverrideStatus, canRefund, canResend,
  canOpenDispute, canResolveDispute,
  isResending,
  onOverrideStatus, onRefund, onResend,
  onOpenDispute, onResolveDispute,
}: TransactionActionsPanelViewProps) {
  const hasAnyAction =
    canOverrideStatus || canRefund || canResend || canOpenDispute || canResolveDispute;

  if (!hasAnyAction) return null;

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-sm font-medium text-zinc-300">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {canOverrideStatus && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOverrideStatus}
            className="w-full justify-start gap-2 border-zinc-800 text-zinc-400 hover:text-amber-300 hover:border-amber-500/30 bg-transparent h-9"
          >
            <CheckSquare className="h-4 w-4" />
            Override status
          </Button>
        )}

        {canRefund && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefund}
            className="w-full justify-start gap-2 border-zinc-800 text-zinc-400 hover:text-pink-300 hover:border-pink-500/30 bg-transparent h-9"
          >
            <RefreshCw className="h-4 w-4" />
            Issue refund
          </Button>
        )}

        {canResend && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResend}
            disabled={isResending}
            className="w-full justify-start gap-2 border-zinc-800 text-zinc-400 hover:text-sky-300 hover:border-sky-500/30 bg-transparent h-9"
          >
            <Send className="h-4 w-4" />
            Resend notification
          </Button>
        )}

        {(canOpenDispute || canResolveDispute) && (
          <Separator className="bg-zinc-800 my-1" />
        )}

        {canOpenDispute && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenDispute}
            className="w-full justify-start gap-2 border-zinc-800 text-zinc-400 hover:text-orange-300 hover:border-orange-500/30 bg-transparent h-9"
          >
            <AlertTriangle className="h-4 w-4" />
            Open dispute
          </Button>
        )}

        {canResolveDispute && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResolveDispute}
            className="w-full justify-start gap-2 border-zinc-800 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/30 bg-transparent h-9"
          >
            <ShieldAlert className="h-4 w-4" />
            Resolve dispute
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Smart ────────────────────────────────────────────────────────────────────

export default function TransactionActionsPanel() {
  const { transaction, setOpenDialog } = useTransactionDetailStore();
  const [isResending, setIsResending] = useState(false);

  if (!transaction) return null;

  const isSuccess = transaction.status === "SUCCESS";
  const isPayment = transaction.type === "PAYMENT";
  const hasDispute = !!transaction.dispute_status;
  const disputeIsOpen = transaction.dispute_status === "OPEN";

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendTransactionNotification(transaction.uuid);
      toast.success("Notification resent.");
    } catch {
      toast.error("Failed to resend notification.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <TransactionActionsPanelView
      canOverrideStatus={!isSuccess}
      canRefund={isSuccess && isPayment}
      canResend={isSuccess || transaction.status === "FAILED"}
      canOpenDispute={isSuccess && !hasDispute}
      canResolveDispute={disputeIsOpen}
      isResending={isResending}
      onOverrideStatus={() => setOpenDialog("override-status")}
      onRefund={() => setOpenDialog("refund")}
      onResend={handleResend}
      onOpenDispute={() => setOpenDialog("open-dispute")}
      onResolveDispute={() => setOpenDialog("resolve-dispute")}
    />
  );
}