import getCurrency from "~/lib/get-currency";
import { useDashboardStore } from "../../stores/use-dashboard-store";
import { SalesTrendView } from "./sales-trend-view";

export function SalesTrend() {
    const { salesTrend, loading } = useDashboardStore();
    return <SalesTrendView data={salesTrend} currencySymbol={getCurrency.symbol()} loading={loading.trend} />;
}