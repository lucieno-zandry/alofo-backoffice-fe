import { RefundActionDialogView } from "./refund-action-dialog-view";

type ApproveRefundDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isProcessing?: boolean;
};

export default function ApproveRefundDialog(props: ApproveRefundDialogProps) {
    return (
        <RefundActionDialogView
            {...props}
            title="Approve Refund Request"
            description="Are you sure you want to approve this refund request? This action cannot be undone."
            confirmText="Approve"
        />
    );
}