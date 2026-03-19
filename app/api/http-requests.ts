
import { serializeProductParams, type ProductQueryParams } from "~/lib/serialize-product-params";
import appFetch, { type PaginatedResponse } from "./app-fetch";
import type { OrdersQueryParams, OrdersResponse } from "~/types/orders";
import type {
    TransactionsQueryParams,
    TransactionsResponse,
    TransactionDetailResponse,
    AuditLogsResponse,
    WebhookLogsResponse,
} from "~/types/transactions";
import type { FetchShipmentsParams } from "~/types/shipments";
import type { FetchUsersParams } from "~/types/users";

// auth

export function getEmailInfo(email: string) {
    return appFetch.post<{ is_taken: boolean }>('/auth/email/info', { email });
}

export function logInWithEmail(data: { email: FormDataEntryValue, password: FormDataEntryValue }) {
    return appFetch.post<{
        auth: User,
        token: string,
    }>('/auth/login', { ...data, role: 'admin' });
}

export function registerUser(data: {
    email: FormDataEntryValue,
    password: FormDataEntryValue,
    password_confirmation: FormDataEntryValue,
    name: string,
    role: string,
}) {
    return appFetch.post<{
        auth: User,
        token: string,
    }>('/auth/register', data)
}

export function getAuthUser() {
    return appFetch.get<{ user: User }>('/auth/user/get');
}

export function updateAuthUser(payload: {
    name?: string,
    email?: string,
    password?: string,
    password_confirmation?: string,
    current_password?: string,
    client_code_id?: number,
} | FormData) {
    return appFetch.post<{ user: User }>('/auth/user/update', payload);
}

export function sendEmailVerificationCode() {
    return appFetch.post<{ link_sent: boolean }>('/auth/email/send-validation-code', {});
}

export function attemptEmailVerification(code: FormDataEntryValue) {
    return appFetch.post<{ user: User }>('/auth/email/verify', { code });
}

export function sendPasswordResetLink(email: FormDataEntryValue) {
    return appFetch.post<{ link_sent: boolean }>('/auth/password/forgot', { email });
}

export function resetPassword(payload: FormData | { password: FormDataEntryValue, password_confirmation: FormDataEntryValue, token: FormDataEntryValue }) {
    return appFetch.post<{ user: User, token: string }>('/auth/password/reset', payload);
}

// End Auth

// Product
export function getProducts(params?: ProductQueryParams) {
    return appFetch.get<PaginatedResponse<Product>>('/product/all', {
        params: serializeProductParams({
            with: ['variants', 'images', 'category'],
            ...params,
        }),
    });
}

export function getProduct(slug: string) {
    return appFetch.get<{ product: Product }>(`/product/get/${slug}`);
}

export function createProduct(data: FormData) {
    return appFetch.post<{ product: Product }>('/product/create', data);
}

export function createFullProduct(data: FormData) {
    return appFetch.post<{ product: Product }>('/product/full-create', data);
}

export function createVariant(data: FormData) {
    return appFetch.post<{ variant: Variant }>('/variant/create', data);
}

export function createVariantOption(data: FormData) {
    return appFetch.post<{ "variant-option": VariantOption }>('/variant-option/create', data);
}

export function updateFullProduct(id: number, data: FormData) {
    return appFetch.post<{ product: Product }>(`/product/full-update/${id}`, data);
}

export function deleteProducts(ids: number[]) {
    return appFetch.delete(`/product/delete?product_ids=${ids.join(',')}`);
}

// End Product

export function getCouponFromCode(code: string) {
    return appFetch.get<{ coupon: Coupon }>(`/coupon/get/${code}`);
}

export function getOrder(uuid: string) {
    return appFetch.get<{ order: Order }>(`/order/get/${uuid}?with=transactions,shipments,user.avatar_image,cart_items,refund_requests`);
}

export function getNotifications() {
    return appFetch.get<{
        notifications: AppNotification[],
        unread: AppNotification[],
        unread_count: number,
    }>('/notifications');
}

export function getUnreadNotifications() {
    return appFetch.get<{
        notifications: AppNotification[],
        count: number,
    }>('/notifications/unread');
}

export function clearReadNotifications() {
    return appFetch.delete<{ message: string }>('/notifications/clear-read');
}

export function markAllNotificationsAsRead() {
    return appFetch.post<{
        message: string,
    }>('/notifications/mark-all-read', {});
}

export function removeNotification(id: string) {
    return appFetch.delete<{ message: string }>(`/notifications/${id}`);
}

export function markNotificationAsRead(id: string) {
    return appFetch.patch<{
        message: string,
        notification: AppNotification
    }>(`/notifications/${id}/read`, {});
}

export function searchProducts(keywords: string) {
    return appFetch.get<{ products: Product[] }>(`/product/search/${keywords}?with=category,variants,images`);
}

export function deleteOrder(uuid: string) {
    return appFetch.delete<{ message: string }>(`/order/delete?order_uuids=${uuid}`);
}

// Categories
export function getCategories() {
    return appFetch.get<{ categories: Category[] }>('/category/all');
}

export function createCategory(data: FormData | { title: FormDataEntryValue | null, parent_id?: FormDataEntryValue | null }) {
    return appFetch.post<{ category: Category }>('/category/create', data);
}

export function updateCategory(id: FormDataEntryValue | null, data: FormData) {
    return appFetch.post<{ category: Category }>(`/category/update/${id}`, data);
}

export function deleteCategory(id: FormDataEntryValue | null) {
    return appFetch.delete<{ message: string }>(`/category/delete?category_ids=${id}`);
}

// End Categories

export function getClientCode(code: string) {
    return appFetch.get<{ client_code: ClientCode | null }>(`/client-code/get/${code}`);
}

// Order

export async function fetchOrders(params: OrdersQueryParams = {}) {
    const searchParams = new URLSearchParams();

    searchParams.append('with', 'user,transactions,shipments');

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });

    return appFetch.get<OrdersResponse>(`/order/all?${searchParams.toString()}`);
}

export async function bulkUpdateShipmentStatus(orderUuids: string[], status: string, data?: Record<string, any>) {
    return appFetch.post<{
        message: string,
        updated: number,
        errors: string[]
    }>('/shipment/bulk-update-shipment', { order_uuids: orderUuids, status, data });
}


// ── List & Detail ─────────────────────────────────────────────────────────────

export function getTransactions(params: TransactionsQueryParams = {}) {
    const searchParams = new URLSearchParams();
    searchParams.append("with", "user,order");

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "" && value !== "*") {
            searchParams.append(key, String(value));
        }
    });

    return appFetch.get<TransactionsResponse>(
        `/transactions?${searchParams.toString()}`
    );
}

export function getTransaction(uuid: string) {
    return appFetch.get<TransactionDetailResponse>(
        `/transactions/${uuid}?with=user,order.cart_items,audit_logs.performed_by_user,parent_transaction,child_transactions`
    );
}

// ── Actions ───────────────────────────────────────────────────────────────────

export function overrideTransactionStatus(
    uuid: string,
    data: { status: string; reason: string }
) {
    return appFetch.patch<{ transaction: Transaction }>(
        `/transactions/${uuid}/override-status`,
        data
    );
}

export function refundTransaction(
    uuid: string,
    data: { amount?: number; reason: string }
) {
    return appFetch.post<{ refund_transaction: Transaction }>(
        `/transactions/${uuid}/refund`,
        data
    );
}

export function resendTransactionNotification(uuid: string) {
    return appFetch.post<{ message: string }>(
        `/transactions/${uuid}/resend-notification`,
        {}
    );
}

export function bulkReviewTransactions(transaction_uuids: string[]) {
    return appFetch.post<{ message: string }>(
        `/transactions/bulk-review`,
        { transaction_uuids }
    );
}

export function exportTransactions(params: TransactionsQueryParams = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
        }
    });
    // Returns a blob — handle with URL.createObjectURL in the component
    return appFetch.get<Blob>(`/transactions/export?${searchParams.toString()}`);
}

export function deleteTransactions(ids: number[], reason?: string) {
    return appFetch.delete<{ deleted: number }>(`/transactions`, {
        body: JSON.stringify({ transaction_ids: ids, reason }),
    });
}

// ── Dispute ───────────────────────────────────────────────────────────────────

export function openTransactionDispute(
    uuid: string,
    data: { reason: string }
) {
    return appFetch.post<{ transaction: Transaction }>(
        `/transactions/${uuid}/dispute`,
        data
    );
}

export function resolveTransactionDispute(
    uuid: string,
    data: { outcome: "RESOLVED" | "LOST"; reason: string }
) {
    return appFetch.patch<{ transaction: Transaction }>(
        `/transactions/${uuid}/dispute`,
        data
    );
}

// ── Logs ──────────────────────────────────────────────────────────────────────

export function getTransactionAuditLogs(uuid: string, page = 1) {
    return appFetch.get<AuditLogsResponse>(
        `/transactions/${uuid}/audit-logs?page=${page}`
    );
}

export function getTransactionWebhookLogs(uuid: string, page = 1) {
    return appFetch.get<WebhookLogsResponse>(
        `/transactions/${uuid}/webhook-logs?page=${page}`
    );
}


/**
 * Fetch refund requests, optionally filtered by order UUID.
 * The backend index likely accepts ?order_uuid=...
 */
export function getRefundRequests(orderUuid?: string) {
    const params = new URLSearchParams();
    if (orderUuid) {
        params.append('order_uuid', orderUuid);
    }
    // optionally include user and order relations
    params.append('with', 'user,order');

    return appFetch.get<{ refund_requests: RefundRequest[] }>(
        `/refund-requests?${params.toString()}`
    );
}

export function approveRefundRequest(uuid: string) {
    return appFetch.post<{ refund_request: RefundRequest }>(
        `/refund-requests/${uuid}/approve`,
        {}
    );
}

export function rejectRefundRequest(uuid: string) {
    return appFetch.post<{ refund_request: RefundRequest }>(
        `/refund-requests/${uuid}/reject`,
        {}
    );
}

// Shipments

export function fetchShipments(params: FetchShipmentsParams = {}) {
    const searchParams = new URLSearchParams();

    // Pagination
    if (params.page) searchParams.set('page', String(params.page));
    if (params.perPage) searchParams.set('per_page', String(params.perPage));

    // Sorting
    if (params.sortBy) searchParams.set('sort_by', params.sortBy);
    if (params.sortOrder) searchParams.set('sort_order', params.sortOrder);

    // Filters
    if (params.filters?.status && params.filters.status !== 'all') {
        searchParams.set('status', params.filters.status);
    }
    if (params.filters?.search) {
        searchParams.set('search', params.filters.search);
    }
    if (params.filters?.fromDate) {
        searchParams.set('from_date', params.filters.fromDate);
    }
    if (params.filters?.toDate) {
        searchParams.set('to_date', params.filters.toDate);
    }

    // Include relations – backend should support ?with=order,user etc.
    if (params.with?.length) {
        searchParams.set('with', params.with.join(','));
    } else {
        // default: include order and its user
        searchParams.set('with', 'order,order.user');
    }

    return appFetch.get<PaginatedResponse<Shipment>>(`/shipment/all?${searchParams.toString()}`);
}

export function deleteShipment(id: number) {
    const params = new URLSearchParams();

    params.append('shipment_ids', id.toString());

    return appFetch.delete(`/shipment/delete?${params.toString()}`);
}

// Users
export function fetchUsers(params: FetchUsersParams = {}) {
    const searchParams = new URLSearchParams();

    // default: include avatar relation
    if (params.with?.length) {
        searchParams.set("with", params.with.join(","));
    } else {
        searchParams.set("with", "avatar_image,client_code");
    }

    // pagination
    if (params.page) searchParams.set("page", String(params.page));
    if (params.per_page) searchParams.set("per_page", String(params.per_page));

    // filtering
    if (params.search) searchParams.set("search", params.search);
    if (params.role && params.role !== "all") searchParams.set("role", params.role);

    // sorting
    if (params.sort_by) searchParams.set("sort_by", params.sort_by);
    if (params.sort_order) searchParams.set("sort_order", params.sort_order);

    return appFetch.get<PaginatedResponse<User>>(
        `/user/all?${searchParams.toString()}`
    );
}

export function showUser(userId: number) {
    const params = new URLSearchParams();

    params.append('with', 'avatar_image,client_code,cart_items,addresses,orders,transactions,refund_requests,reviewed_refund_requests,performed_transaction_audit_logs,reviewed_transactions')

    return appFetch.get<{ user: User }>(`/user/get/${userId}?${params.toString()}`)
}