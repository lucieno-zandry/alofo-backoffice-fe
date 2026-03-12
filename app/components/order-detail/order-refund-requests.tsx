import { useEffect, useState } from 'react';
import { useOrderDetailStore } from '~/hooks/use-order-detail-store';
import { getRefundRequests, approveRefundRequest, rejectRefundRequest } from '~/api/http-requests';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import { format } from 'date-fns';
import formatPrice from '~/lib/format-price';
import { toast } from 'sonner';
import { StatusBadge } from '~/components/custom-ui/status-badge';
import { useRevalidator } from 'react-router';

// ===== VIEW =====
export type OrderRefundRequestsViewProps = {
    requests: RefundRequest[];
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
    isProcessing: boolean;
};

export function OrderRefundRequestsView({
    requests,
    onApprove,
    onReject,
    isProcessing,
}: OrderRefundRequestsViewProps) {
    if (requests.length === 0) {
        return (
            <div className="border rounded-lg p-8 text-center text-muted-foreground">
                No refund requests.
            </div>
        );
    }


    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell>
                                {format(new Date(req.created_at), 'dd/MM/yyyy HH:mm')}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{req.reason}</TableCell>
                            <TableCell>{formatPrice(req.amount)}</TableCell>
                            <TableCell>
                                <StatusBadge status={req.status}>{req.status}</StatusBadge>
                            </TableCell>
                            <TableCell className="text-right">
                                {req.status === 'pending' && (
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onApprove(req.id)}
                                            disabled={isProcessing}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => onReject(req.id)}
                                            disabled={isProcessing}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

// ===== CONTAINER =====
export default function OrderRefundRequests() {
    const { order } = useOrderDetailStore();


    const [processing, setProcessing] = useState(false);
    const revalidator = useRevalidator();

    const handleApprove = async (id: number) => {
        if (!confirm('Approve this refund request?')) return;
        setProcessing(true);
        try {
            await approveRefundRequest(id);
            toast.success('Refund request approved');
            revalidator.revalidate();
        } catch (error) {
            toast.error('Failed to approve request');
        } finally {
            setProcessing(false);
        }
    };

    const handleReject = async (id: number) => {
        if (!confirm('Reject this refund request?')) return;
        setProcessing(true);
        try {
            await rejectRefundRequest(id);
            toast.success('Refund request rejected');
            revalidator.revalidate();
        } catch (error) {
            toast.error('Failed to reject request');
        } finally {
            setProcessing(false);
        }
    };

    if (!order) return null;
    const { refund_requests: requests = [] } = order;

    return (
        <OrderRefundRequestsView
            requests={requests}
            onApprove={handleApprove}
            onReject={handleReject}
            isProcessing={processing}
        />
    );
}