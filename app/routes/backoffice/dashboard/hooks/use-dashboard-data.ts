import { useEffect } from "react";
import { useDashboardStore } from "../stores/use-dashboard-store";
import {
  fetchKpi,
  fetchOrders,
  fetchVariants,
  fetchUsers,
  getTransactions,
  fetchPromotions,
  fetchSalesTrend,
} from "~/api/http-requests";

// Helper to get today and N days ago as ISO strings
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

export function useDashboardData() {
  const store = useDashboardStore();

  useEffect(() => {
    loadKpi();
    loadRecentOrders();
    loadLowStock();
    loadUserIssues();
    loadTransactionIssues();
    loadActivePromotions();
    loadSalesTrend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadKpi() {
    store.setLoading("kpi", true);
    store.setError("kpi", undefined);
    try {
      const res = await fetchKpi();
      if (res.data) store.setKpi(res.data);
      else store.setError("kpi", "Failed to load KPI data");
    } catch {
      store.setError("kpi", "Network error");
    } finally {
      store.setLoading("kpi", false);
    }
  }

  async function loadRecentOrders() {
    store.setLoading("orders", true);
    store.setError("orders", undefined);
    try {
      const res = await fetchOrders({ per_page: 15, sort: "created_at" });
      if (res.data) store.setRecentOrders(res.data.data ?? []);
      else store.setError("orders", "Failed to load orders");
    } catch {
      store.setError("orders", "Network error");
    } finally {
      store.setLoading("orders", false);
    }
  }

  async function loadLowStock() {
    store.setLoading("stock", true);
    store.setError("stock", undefined);
    try {
      const res = await fetchVariants({
        low_stock: true,
        per_page: 10,
        with: ["product", "image"],
      });
      if (res.data) store.setLowStock(res.data.data ?? []);
      else store.setError("stock", "Failed to load stock data");
    } catch {
      store.setError("stock", "Network error");
    } finally {
      store.setLoading("stock", false);
    }
  }

  async function loadUserIssues() {
    store.setLoading("users", true);
    store.setError("users", undefined);
    try {
      const res = await fetchUsers({
        per_page: 10,
        statusIn: ["blocked", "suspended"],
        with: ["statuses"],
      });
      if (res.data) {
        const users = res.data.data ?? [];
        const issues = users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          status: u.statuses?.[0]
            ? {
                status: u.statuses[0].status as "blocked" | "suspended",
                reason: u.statuses[0].reason,
                expires_at: u.statuses[0].expires_at,
                created_at: u.statuses[0].created_at,
              }
            : null,
        }));
        store.setUserIssues(issues);
      } else {
        store.setError("users", "Failed to load user issues");
      }
    } catch {
      store.setError("users", "Network error");
    } finally {
      store.setLoading("users", false);
    }
  }

  async function loadTransactionIssues() {
    store.setLoading("transactions", true);
    store.setError("transactions", undefined);
    try {
      const [failedRes, disputeRes] = await Promise.all([
        getTransactions({
          status: "FAILED",
          date_from: daysAgo(7),
          per_page: 10,
          sort_by: "created_at",
          sort_dir: "desc",
        }),
        getTransactions({
          dispute_status: "OPEN",
          per_page: 10,
          sort_by: "created_at",
          sort_dir: "desc",
        }),
      ]);

      if (failedRes.data) {
        store.setFailedTransactions(failedRes.data.transactions.data ?? []);
      }
      if (disputeRes.data) {
        store.setDisputes(disputeRes.data.transactions.data ?? []);
      }
    } catch {
      store.setError("transactions", "Network error");
    } finally {
      store.setLoading("transactions", false);
    }
  }

  async function loadActivePromotions() {
    store.setLoading("promotions", true);
    store.setError("promotions", undefined);
    try {
      const res = await fetchPromotions({
        is_active: true,
        per_page: 10,
        sort_by: "priority",
        sort_order: "asc",
      });
      if (res.data) store.setActivePromotions(res.data.data ?? []);
      else store.setError("promotions", "Failed to load promotions");
    } catch {
      store.setError("promotions", "Network error");
    } finally {
      store.setLoading("promotions", false);
    }
  }

  async function loadSalesTrend() {
    store.setLoading("trend", true);
    store.setError("trend", undefined);
    try {
      const res = await fetchSalesTrend();
      if (res.data) store.setSalesTrend(res.data);
      else store.setError("trend", "Failed to load trend");
    } catch {
      store.setError("trend", "Network error");
    } finally {
      store.setLoading("trend", false);
    }
  }

  return {
    ...store,
    refresh: {
      kpi: loadKpi,
      orders: loadRecentOrders,
      stock: loadLowStock,
      users: loadUserIssues,
      transactions: loadTransactionIssues,
      promotions: loadActivePromotions,
      trend: loadSalesTrend,
    },
  };
}