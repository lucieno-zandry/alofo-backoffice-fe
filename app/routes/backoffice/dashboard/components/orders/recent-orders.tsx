import { useDashboardStore } from "../../stores/use-dashboard-store";
import { RecentOrdersView } from "./recent-orders-view";
import { useDashboardData } from "../../hooks/use-dashboard-data";
import { useParams } from "react-router";

export function RecentOrders() {
  const { recentOrders, loading } = useDashboardStore();
  const { refresh } = useDashboardData();
  const params = useParams();
  const lang = (params as any).lang ?? "en";

  return (
    <RecentOrdersView
      orders={recentOrders}
      loading={loading.orders}
      onRefresh={refresh.orders}
      lang={lang}
    />
  );
}