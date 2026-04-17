import { useDashboardData } from "./hooks/use-dashboard-data";
import { DashboardHeader } from "./components/dashboard-header";
import { KpiCards } from "./components/kpi/kpi-cards";
import { SalesTrend } from "./components/trend/sales-trend";
import { RecentOrders } from "./components/orders/recent-orders";
import { LowStockAlerts } from "./components/stock/low-stock-alerts";
import { UserIssues } from "./components/users/user-issues";
import { TransactionIssues } from "./components/transactions/transaction-issues";
import { ActivePromotions } from "./components/promotions/active-promotions";

/**
 * Dashboard Page
 *
 * Smart orchestrator — calls useDashboardData() once here so all
 * child smart components share the same store. No JSX logic here,
 * just layout and composition.
 */
export default function DashboardPage() {
    // Trigger all data fetches on mount
    useDashboardData();

    return (
        <div className="h-full overflow-y-auto bg-background/80 backdrop-blur-md rounded-2xl">
            <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6">

                    {/* ── Page Header ─────────────────────────────────────────────── */}
                    <DashboardHeader />

                    {/* ── KPI Cards ───────────────────────────────────────────────── */}
                    <KpiCards />

                    {/* ── Trend + Low Stock ───────────────────────────────────────── */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                        <div className="xl:col-span-8">
                            <SalesTrend />
                        </div>
                        <div className="xl:col-span-4">
                            <LowStockAlerts />
                        </div>
                    </div>

                    {/* ── Recent Orders ───────────────────────────────────────────── */}
                    <RecentOrders />

                    {/* ── Bottom Row: Transactions · Users · Promotions ───────────── */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <TransactionIssues />
                        </div>
                        <div className="lg:col-span-4">
                            <UserIssues />
                        </div>
                        <div className="lg:col-span-3">
                            <ActivePromotions />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}