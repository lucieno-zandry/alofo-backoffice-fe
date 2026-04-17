import { useParams } from "react-router";
import { useDashboardStore } from "../../stores/use-dashboard-store";
import { useDashboardData } from "../../hooks/use-dashboard-data";
import { LowStockAlertsView } from "./low-stock-alerts-view";

export function LowStockAlerts() {
  const { lowStock, loading } = useDashboardStore();
  const { refresh } = useDashboardData();
  const params = useParams();
  const lang = (params as any).lang ?? "en";

  return (
    <LowStockAlertsView
      variants={lowStock}
      loading={loading.stock}
      onRefresh={refresh.stock}
      lang={lang}
    />
  );
}