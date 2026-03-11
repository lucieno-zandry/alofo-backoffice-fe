import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useTransactionDetailStore } from "~/hooks/use-transaction-detail-store";
import { useState } from "react";
import { resolveTransactionDispute } from "~/api/http-requests";
import { toast } from "sonner";

export type ResolveDisputeDialogViewProps = {
    open: boolean;
    isSubmitting: boolean;
    submitError: string | null;
    outcome: string;
    reason: string;
    onOutcomeChange: (v: string) => void;
    onReasonChange: (v: string) => void;
    onClose: () => void;
    onSubmit: () => void;
};

export function ResolveDisputeDialogView({
    open, isSubmitting, submitError,
    outcome, reason, onOutcomeChange, onReasonChange, onClose, onSubmit,
}: ResolveDisputeDialogViewProps) {
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>Resolve Dispute</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-400">Outcome</Label>
                        <Select value={outcome} onValueChange={onOutcomeChange}>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                <SelectValue placeholder="Select outcome..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="RESOLVED">Resolved (in our favour)</SelectItem>
                                <SelectItem value="LOST">Lost (in customer's favour)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-400">Resolution notes <span className="text-red-400">*</span></Label>
                        <Textarea
                            placeholder="Document the resolution..."
                            value={reason}
                            onChange={(e) => onReasonChange(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 resize-none h-20 text-sm"
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
                        disabled={isSubmitting || !outcome || reason.length < 5}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white gap-2"
                    >
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                        Resolve
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function ResolveDisputeDialog() {
    const { transaction, openDialog, closeDialog, isSubmitting, submitError,
        setSubmitting, setSubmitError, patchTransaction } = useTransactionDetailStore();

    const [outcome, setOutcome] = useState<"RESOLVED" | "LOST" | "">("");
    const [reason, setReason] = useState("");

    const handleSubmit = async () => {
        if (!transaction || !outcome) return;
        setSubmitting(true);
        setSubmitError(null);
        try {
            const updated = (await resolveTransactionDispute(
                transaction.uuid, { outcome: outcome as "RESOLVED" | "LOST", reason }
            )).data?.transaction;

            if (updated)
                patchTransaction({ dispute_status: updated.dispute_status, dispute_resolved_at: updated.dispute_resolved_at });

            toast.success(`Dispute marked as ${outcome.toLowerCase()}.`);
            closeDialog();
            setOutcome("");
            setReason("");
        } catch (e: any) {
            setSubmitError(e?.message ?? "An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ResolveDisputeDialogView
            open={openDialog === "resolve-dispute"}
            isSubmitting={isSubmitting}
            submitError={submitError}
            outcome={outcome}
            reason={reason}
            onOutcomeChange={(v) => setOutcome(v as "RESOLVED" | "LOST")}
            onReasonChange={setReason}
            onClose={closeDialog}
            onSubmit={handleSubmit}
        />
    );
}