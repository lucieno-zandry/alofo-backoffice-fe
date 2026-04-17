import { useDashboardStore } from "../../stores/use-dashboard-store";
import { useDashboardData } from "../../hooks/use-dashboard-data";
import { ActivePromotionsView } from "./active-promotions-view";

export function ActivePromotions() {
  const { activePromotions, loading } = useDashboardStore();
  const { refresh } = useDashboardData();

  return (
    <ActivePromotionsView
      promotions={activePromotions}
      loading={loading.promotions}
      onRefresh={refresh.promotions}
    />
  );
}