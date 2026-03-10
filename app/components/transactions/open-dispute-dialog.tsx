import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useTransactionDetailStore } from "~/hooks/use-transaction-detail-store";
import { useState } from "react";
import { openTransactionDispute } from "~/api/http-requests";
import { toast } from "sonner";

export type OpenDisputeDialogViewProps = {
    open: boolean;
    isSubmitting: boolean;
    submitError: string | null;
    reason: string;
    onReasonChange: (v: string) => void;
    onClose: () => void;
    onSubmit: () => void;
};

export function OpenDisputeDialogView({
    open, isSubmitting, submitError,
    reason, onReasonChange, onClose, onSubmit,
}: OpenDisputeDialogViewProps) {
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>Open Dispute</DialogTitle>
                    <DialogDescription className="text-zinc-500 text-sm">
                        Document the reason for the dispute. This will be tracked in the audit log.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-400">Dispute reason <span className="text-red-400">*</span></Label>
                        <Textarea
                            placeholder="Describe the dispute..."
                            value={reason}
                            onChange={(e) => onReasonChange(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 resize-none h-24 text-sm"
                        />
                    </div>
                    {submitError && (
                        <p className="text-sm text-red-400 bg-red-400/10 rounded-md p-3">{submitError}</p>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} className="text-zinc-400">Cancel</Button>
                    <Button
                        onClick={onSubmit}
                        disabled={isSubmitting || reason.length < 10}
                        className="bg-orange-700 hover:bg-orange-600 text-white gap-2"
                    >
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                        Open dispute
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function OpenDisputeDialog() {
    const { transaction, openDialog, closeDialog, isSubmitting, submitError,
        setSubmitting, setSubmitError, patchTransaction } = useTransactionDetailStore();

    const [reason, setReason] = useState("");

    const handleSubmit = async () => {
        if (!transaction) return;
        setSubmitting(true);
        setSubmitError(null);
        try {
            const updated = (await openTransactionDispute(transaction.uuid, { reason })).data?.transaction;
            if (updated)
                patchTransaction({ dispute_status: updated.dispute_status, dispute_opened_at: updated.dispute_opened_at });

            toast.success("Dispute opened.");
            closeDialog();
            setReason("");
        } catch (e: any) {
            setSubmitError(e?.message ?? "An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <OpenDisputeDialogView
            open={openDialog === "open-dispute"}
            isSubmitting={isSubmitting}
            submitError={submitError}
            reason={reason}
            onReasonChange={setReason}
            onClose={closeDialog}
            onSubmit={handleSubmit}
        />
    );
}