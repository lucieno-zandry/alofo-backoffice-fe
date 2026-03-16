import { RefundActionDialogView } from "./refund-action-dialog-view";

type RejectRefundDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isProcessing?: boolean;
};

export default function RejectRefundDialog(props: RejectRefundDialogProps) {
    return (
        <RefundActionDialogView
            {...props}
            title="Reject Refund Request"
            description="Are you sure you want to reject this refund request? This action cannot be undone."
            confirmText="Reject"
        />
    );
}