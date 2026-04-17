import { create } from "zustand";
import type {
  DashboardData,
  DashboardLoadingState,
  KpiData,
  SalesTrendData,
  DashboardOrder,
  LowStockVariant,
  UserIssue,
  FailedTransaction,
  DisputeTransaction,
  ActivePromotion,
} from "../types/dashboard-types";

type DashboardStore = DashboardData & {
  loading: DashboardLoadingState;
  errors: Partial<Record<keyof DashboardLoadingState, string>>;

  setKpi: (data: KpiData) => void;
  setRecentOrders: (data: DashboardOrder[]) => void;
  setLowStock: (data: LowStockVariant[]) => void;
  setUserIssues: (data: UserIssue[]) => void;
  setFailedTransactions: (data: FailedTransaction[]) => void;
  setDisputes: (data: DisputeTransaction[]) => void;
  setActivePromotions: (data: ActivePromotion[]) => void;
  setSalesTrend: (data: SalesTrendData) => void;

  setLoading: (key: keyof DashboardLoadingState, value: boolean) => void;
  setError: (key: keyof DashboardLoadingState, msg: string | undefined) => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  kpi: null,
  recentOrders: [],
  lowStock: [],
  userIssues: [],
  failedTransactions: [],
  disputes: [],
  activePromotions: [],
  salesTrend: null,
  loading: {
    kpi: true,
    orders: true,
    stock: true,
    users: true,
    transactions: true,
    promotions: true,
    trend: true,
  },
  errors: {},

  setKpi: (data) => set({ kpi: data }),
  setRecentOrders: (data) => set({ recentOrders: data }),
  setLowStock: (data) => set({ lowStock: data }),
  setUserIssues: (data) => set({ userIssues: data }),
  setFailedTransactions: (data) => set({ failedTransactions: data }),
  setDisputes: (data) => set({ disputes: data }),
  setActivePromotions: (data) => set({ activePromotions: data }),
  setSalesTrend: (data) => set({ salesTrend: data }),

  setLoading: (key, value) =>
    set((s) => ({ loading: { ...s.loading, [key]: value } })),
  setError: (key, msg) =>
    set((s) => ({ errors: { ...s.errors, [key]: msg } })),
}));