import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LinkIcon } from "lucide-react";
import formatPrice from "~/lib/format-price";
import { useTransactionDetailStore } from "~/hooks/use-transaction-detail-store";
import useRouterStore from "~/hooks/use-router-store";

export type TransactionOrderCardViewProps = {
    orderUuid: string;
    orderTotal?: number;
    itemCount?: number;
    lang: string;
};

export function TransactionOrderCardView({
    orderUuid,
    orderTotal,
    itemCount,
    lang
}: TransactionOrderCardViewProps) {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-medium text-zinc-300">Linked Order</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-400 break-all">
                        {orderUuid}
                    </span>
                    <Link
                        to={`/${lang}/orders/${orderUuid}`}
                        className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 ml-2 flex-shrink-0"
                    >
                        <LinkIcon className="h-3 w-3" />
                        View
                    </Link>
                </div>
                {orderTotal !== undefined && (
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                        <span>Order total</span>
                        <span className="font-mono font-medium text-zinc-200">
                            {formatPrice(orderTotal)}
                        </span>
                    </div>
                )}
                {itemCount !== undefined && (
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                        <span>Items</span>
                        <span className="text-zinc-200">{itemCount}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export function TransactionOrderCard() {
    const transaction = useTransactionDetailStore((s) => s.transaction);
    const { lang } = useRouterStore();
    if (!transaction) return null;

    return (
        <TransactionOrderCardView
            orderUuid={transaction.order_uuid}
            orderTotal={transaction.order?.total}
            itemCount={transaction.order?.cart_items?.length}
            lang={lang}
        />
    );
}
