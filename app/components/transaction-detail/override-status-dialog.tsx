import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useTransactionDetailStore } from "~/hooks/use-transaction-detail-store";
import { overrideTransactionStatus } from "~/api/http-requests";
import { toast } from "sonner";

export type OverrideStatusDialogViewProps = {
    open: boolean;
    isSubmitting: boolean;
    submitError: string | null;
    status: string;
    reason: string;
    onStatusChange: (v: string) => void;
    onReasonChange: (v: string) => void;
    onClose: () => void;
    onSubmit: () => void;
};

export function OverrideStatusDialogView({
    open, isSubmitting, submitError,
    status, reason,
    onStatusChange, onReasonChange,
    onClose, onSubmit,
}: OverrideStatusDialogViewProps) {
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>Override Transaction Status</DialogTitle>
                    <DialogDescription className="text-zinc-500 text-sm">
                        This action is logged and cannot be undone automatically.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-400">New status</Label>
                        <Select value={status} onValueChange={onStatusChange}>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                <SelectValue placeholder="Select status..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SUCCESS">SUCCESS</SelectItem>
                                <SelectItem value="PENDING">PENDING</SelectItem>
                                <SelectItem value="FAILED">FAILED</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-400">
                            Reason <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                            placeholder="Explain why this status is being overridden..."
                            value={reason}
                            onChange={(e) => onReasonChange(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 resize-none h-24 text-sm"
                            minLength={10}
                        />
                        <p className="text-xs text-zinc-600">{reason.length} / 10 min chars</p>
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
                        disabled={isSubmitting || !status || reason.length < 10}
                        className="bg-amber-600 hover:bg-amber-500 text-white gap-2"
                    >
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                        Override status
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function OverrideStatusDialog() {
    const { transaction, openDialog, closeDialog, isSubmitting, submitError,
        setSubmitting, setSubmitError, patchTransaction } = useTransactionDetailStore();

    const [status, setStatus] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = async () => {
        if (!transaction) return;
        setSubmitting(true);
        setSubmitError(null);
        try {
            const response = await overrideTransactionStatus(
                transaction.uuid, { status, reason }
            );
            
            const updated = response.data?.transaction;

            if (updated)
                patchTransaction({ status: updated.status });

            toast.success("Transaction status updated.");
            closeDialog();
            setStatus("");
            setReason("");
        } catch (e: any) {
            setSubmitError(e?.message ?? "An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <OverrideStatusDialogView
            open={openDialog === "override-status"}
            isSubmitting={isSubmitting}
            submitError={submitError}
            status={status}
            reason={reason}
            onStatusChange={setStatus}
            onReasonChange={setReason}
            onClose={closeDialog}
            onSubmit={handleSubmit}
        />
    );
}
