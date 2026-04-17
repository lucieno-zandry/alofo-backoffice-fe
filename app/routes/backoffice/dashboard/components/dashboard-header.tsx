import { useState, useCallback } from "react";
import { useDashboardData } from "../hooks/use-dashboard-data";
import { DashboardHeaderView } from "./dashboard-header-view";

export function DashboardHeader() {
  const { refresh } = useDashboardData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());

  const handleRefreshAll = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all(Object.values(refresh).map((fn) => fn()));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  }, [refresh]);

  return (
    <DashboardHeaderView
      onRefreshAll={handleRefreshAll}
      isRefreshing={isRefreshing}
      lastUpdated={lastUpdated}
    />
  );
}