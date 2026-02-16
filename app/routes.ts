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
            route("products", "routes/backoffice/products/index.tsx"),
            route("categories", "routes/backoffice/categories/index.tsx"),
        ]),

        // error pages
        route("403", "routes/common/forbidden-error-page.tsx"),
        route("500", "routes/common/internal-server-error-page.tsx"),
        route("approval-pending", "routes/common/approval-pending-page.tsx"),

        // fallback
        route("*", "routes/common/not-found-error-page.tsx"),
    ]),

] satisfies RouteConfig;