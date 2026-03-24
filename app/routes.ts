// routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/i18n/root-redirect.tsx"),

    route("/:lang", "routes/i18n/lang-boundary.tsx", [
        route("auth", "routes/auth/layout.tsx", [
            index("routes/auth/index.tsx"),
            route("login", "routes/auth/login.tsx"),
            route("register", "routes/auth/register.tsx"),
            route("verify-email", "routes/auth/email-verification.tsx"),
            route("password-forgotten", "routes/auth/password-forgotten.tsx"),
            route("reset-password/:token", "routes/auth/reset-password.tsx"),
        ]),

        route("", "routes/backoffice/layout.tsx", [
            index("routes/backoffice/dashboard/index.tsx"),
            route("products", "routes/backoffice/products/layout.tsx", [
                route("", "routes/backoffice/products/index.tsx"),
                route(":slug", "routes/backoffice/products/product-detail.tsx"),
            ]),
            route("categories", "routes/backoffice/categories/index.tsx"),
            route("orders", "routes/backoffice/orders/index.tsx"),
            route("orders/:uuid", "routes/backoffice/orders/order-detail.tsx"),

            route("transactions", "routes/backoffice/transactions/index.tsx"),
            route("transactions/:transactionUuid", "routes/backoffice/transactions/transaction-detail.tsx"),

            route("shipments", "routes/backoffice/shipments/index.tsx"),

            route("users", "routes/backoffice/users/layout.tsx", [
                index("routes/backoffice/users/index.tsx"),
                route(":userId", "routes/backoffice/users/user-detail.tsx"),
            ]),

            // ── Client Codes ──────────────────────────────────────────────────
            route("client-codes", "routes/backoffice/client-codes/layout.tsx", [
                index("routes/backoffice/client-codes/index.tsx"),
            ]),

            // ── Coupons ───────────────────────────────────────────────────────
            route("coupons", "routes/backoffice/coupons/layout.tsx", [
                index("routes/backoffice/coupons/index.tsx"),
            ]),
        ]),

        // error pages
        route("403", "routes/common/forbidden-error-page.tsx"),
        route("500", "routes/common/internal-server-error-page.tsx"),
        route("pending-approval", "routes/common/pending-approval-page.tsx"),
        route("account-blocked", "routes/common/blocked-page.tsx"),
        route("account-suspended", "routes/common/suspended-page.tsx"),

        // fallback
        route("*", "routes/common/not-found-error-page.tsx"),
    ]),

] satisfies RouteConfig;