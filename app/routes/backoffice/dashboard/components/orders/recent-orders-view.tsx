import { ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { SectionHeader } from "../section-header";
import { StatusBadge } from "../status-badge";
import { EmptyState } from "../empty-state";
import { formatCurrency, formatDate, truncateUuid } from "../../helpers/dashboard-helpers";
import type { DashboardOrder } from "../../types/dashboard-types";

type Props = {
  orders: DashboardOrder[];
  loading: boolean;
  onRefresh: () => void;
  lang: string;
};

function paymentVariant(status: string): "success" | "danger" | "warning" | "neutral" {
  if (status === "SUCCESS") return "success";
  if (status === "FAILED") return "danger";
  if (status === "PENDING") return "warning";
  return "neutral";
}

function shipmentVariant(status: string): "success" | "info" | "warning" | "neutral" {
  if (status === "DELIVERED") return "success";
  if (status === "SHIPPED") return "info";
  if (status === "PROCESSING") return "warning";
  return "neutral";
}

function OrderRowSkeleton() {
  return (
    <tr>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function RecentOrdersView({ orders, loading, onRefresh, lang }: Props) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-sm">
      <div className="border-b border-border/50 p-5">
        <SectionHeader
          title="Recent Orders"
          subtitle="Latest 15 orders with status"
          icon={ShoppingBag}
          iconClass="bg-sky-500/10 text-sky-600 dark:text-sky-400"
          onRefresh={onRefresh}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40">
              {["Order", "Customer", "Total", "Payment", "Shipment", "Date", ""].map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {loading
              ? [...Array(6)].map((_, i) => <OrderRowSkeleton key={i} />)
              : orders.length === 0
              ? (
                <tr>
                  <td colSpan={7} className="py-0">
                    <EmptyState icon={ShoppingBag} title="No orders yet" />
                  </td>
                </tr>
              )
              : orders.map((order) => {
                  const payStatus =
                    order.transactions?.find((t) => t.type === "PAYMENT")?.status ?? "NONE";
                  const shipStatus =
                    order.shipments?.find((s) => s.is_active)?.status ??
                    order.shipments?.[0]?.status ??
                    "NONE";

                  return (
                    <tr
                      key={order.uuid}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">
                        #{truncateUuid(order.uuid)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {order.user?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3 font-mono font-medium text-foreground">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-4 py-3">
                        {payStatus !== "NONE" ? (
                          <StatusBadge
                            label={payStatus}
                            variant={paymentVariant(payStatus) as any}
                          />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {shipStatus !== "NONE" ? (
                          <StatusBadge
                            label={shipStatus}
                            variant={shipmentVariant(shipStatus) as any}
                          />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/${lang}/orders/${order.uuid}`}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}