// ─── KPI ────────────────────────────────────────────────────────────────────

export type KpiData = {
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  pending_refunds_count: number;
};

// ─── Sales Trend ─────────────────────────────────────────────────────────────

export type SalesTrendData = {
  labels: string[];
  data: number[];
};

// ─── Recent Orders ────────────────────────────────────────────────────────────

export type DashboardOrder = {
  uuid: string;
  user?: { name: string };
  total: number;
  created_at: string;
  shipments?: { status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "PENDING"; is_active: boolean }[];
  transactions?: { status: "FAILED" | "PENDING" | "SUCCESS"; type: string }[];
};

// ─── Low Stock ────────────────────────────────────────────────────────────────

export type LowStockVariant = {
  id: number;
  sku: string;
  stock: number;
  product?: { title: string; slug: string };
  image?: { url: string };
};

// ─── User Issues ─────────────────────────────────────────────────────────────

export type UserIssue = {
  id: number;
  name: string;
  email: string;
  status: { status: "blocked" | "suspended"; reason?: string; expires_at?: string; created_at: string } | null;
};

// ─── Transaction Issues ───────────────────────────────────────────────────────

export type FailedTransaction = {
  uuid: string;
  amount: number;
  method: string;
  created_at: string;
  order_uuid: string;
  user?: { name: string };
};

export type DisputeTransaction = {
  uuid: string;
  amount: number;
  dispute_reason?: string;
  dispute_status?: string;
  order_uuid: string;
  user?: { name: string };
};

// ─── Active Promotion ─────────────────────────────────────────────────────────

export type ActivePromotion = {
  id: number;
  name: string;
  discount: number;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  stackable: boolean;
  priority: number;
  badge?: string;
  applies_to: string;
  end_date: string;
};

// ─── Dashboard State ─────────────────────────────────────────────────────────

export type DashboardLoadingState = {
  kpi: boolean;
  orders: boolean;
  stock: boolean;
  users: boolean;
  transactions: boolean;
  promotions: boolean;
  trend: boolean;
};

export type DashboardData = {
  kpi: KpiData | null;
  recentOrders: DashboardOrder[];
  lowStock: LowStockVariant[];
  userIssues: UserIssue[];
  failedTransactions: FailedTransaction[];
  disputes: DisputeTransaction[];
  activePromotions: ActivePromotion[];
  salesTrend: SalesTrendData | null;
};