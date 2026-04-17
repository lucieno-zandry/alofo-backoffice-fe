import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { KpiCardView } from "./kpi-card-view";
import { formatCurrency } from "../../helpers/dashboard-helpers";
import { useDashboardStore } from "../../stores/use-dashboard-store";

export function KpiCards() {
  const { kpi, loading } = useDashboardStore();

  const cards = [
    {
      label: "Total Revenue",
      value: kpi ? formatCurrency(kpi.total_revenue) : "—",
      icon: DollarSign,
      accentClass: "bg-violet-500",
    },
    {
      label: "Total Orders",
      value: kpi ? kpi.total_orders.toLocaleString() : "—",
      icon: ShoppingCart,
      accentClass: "bg-sky-500",
    },
    {
      label: "Avg. Order Value",
      value: kpi ? formatCurrency(kpi.average_order_value) : "—",
      icon: TrendingUp,
      accentClass: "bg-amber-500",
    },
    {
      label: "Pending Refunds",
      value: kpi ? kpi.pending_refunds_count.toLocaleString() : "—",
      icon: AlertCircle,
      accentClass:
        kpi && kpi.pending_refunds_count > 0 ? "bg-rose-500" : "bg-slate-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <KpiCardView key={card.label} {...card} loading={loading.kpi} />
      ))}
    </div>
  );
}