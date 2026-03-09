import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { format } from "date-fns";
import { useOrderDetailStore } from "~/hooks/use-order-detail-store";
import formatPrice from "~/lib/format-price";
import { StatusBadge } from "../custom-ui/status-badge";

// ===== VIEW =====
export type OrderPaymentsViewProps = {
    transactions: Transaction[];
};

export function OrderPaymentsView({ transactions }: OrderPaymentsViewProps) {
    if (transactions.length === 0) {
        return <div className="border rounded-lg p-8 text-center text-muted-foreground">No payment transactions.</div>;
    }

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reference</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                            <TableCell>{format(new Date(tx.created_at), "dd/MM/yyyy HH:mm")}</TableCell>
                            <TableCell>{tx.method}</TableCell>
                            <TableCell>{formatPrice(tx.amount)}</TableCell>
                            <TableCell>
                                <StatusBadge status={tx.status}> {tx.status}</StatusBadge>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{tx.informations?.transaction_id || "—"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

// ===== CONTAINER =====
export default function OrderPayments() {
    const { order } = useOrderDetailStore();
    if (!order) return null;

    return <OrderPaymentsView transactions={order.transactions || []} />;
}