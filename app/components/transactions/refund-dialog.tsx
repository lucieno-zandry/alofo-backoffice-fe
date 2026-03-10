import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useTransactionDetailStore } from "~/hooks/use-transaction-detail-store";
import { useState } from "react";
import { refundTransaction } from "~/api/http-requests";
import { toast } from "sonner";

export type RefundDialogViewProps = {
    open: boolean;
    isSubmitting: boolean;
    submitError: string | null;
    maxAmount: number;
    amount: string;
    reason: string;
    onAmountChange: (v: string) => void;
    onReasonChange: (v: string) => void;
    onClose: () => void;
    onSubmit: () => void;
};

export function RefundDialogView({
    open, isSubmitting, submitError,
    maxAmount, amount, reason,
    onAmountChange, onReasonChange, onClose, onSubmit,
}: RefundDialogViewProps) {
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>Initiate Refund</DialogTitle>
                    <DialogDescription className="text-zinc-500 text-sm">
                        Leave amount blank to refund the full transaction ({maxAmount}).
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-400">Refund amount (optional)</Label>
                        <Input
                            type="number"
                            placeholder={`Max: ${maxAmount}`}
                            value={amount}
                            onChange={(e) => onAmountChange(e.target.value)}
                            className="bg-zinc-800 border-zinc-700"
                            max={maxAmount}
                            min={0.01}
                            step={0.01}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-400">
                            Reason <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                            placeholder="Reason for the refund..."
                            value={reason}
                            onChange={(e) => onReasonChange(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 resize-none h-20 text-sm"
                        />
                    </div>

                    {submitError && (
                        <p className="text-sm text-red-400 bg-red-400/10 rounded-md p-3">
                            {submitError}
                        </p>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} className="text-zinc-400">
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={isSubmitting || reason.length < 5}
                        className="bg-pink-700 hover:bg-pink-600 text-white gap-2"
                    >
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                        Confirm refund
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function RefundDialog() {
    const { transaction, openDialog, closeDialog, isSubmitting, submitError,
        setSubmitting, setSubmitError } = useTransactionDetailStore();

    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = async () => {
        if (!transaction) return;
        setSubmitting(true);
        setSubmitError(null);
        try {
            await refundTransaction(transaction.uuid, {
                amount: amount ? parseFloat(amount) : undefined,
                reason,
            });

            toast.success("Refund initiated successfully.");
            closeDialog();
            setAmount("");
            setReason("");
        } catch (e: any) {
            setSubmitError(e?.message ?? "An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <RefundDialogView
            open={openDialog === "refund"}
            isSubmitting={isSubmitting}
            submitError={submitError}
            maxAmount={transaction?.amount ?? 0}
            amount={amount}
            reason={reason}
            onAmountChange={setAmount}
            onReasonChange={setReason}
            onClose={closeDialog}
            onSubmit={handleSubmit}
        />
    );
}