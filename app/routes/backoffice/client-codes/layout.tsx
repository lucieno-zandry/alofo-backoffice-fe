// routes/backoffice/client-codes/layout.tsx
import { Outlet } from "react-router";

/**
 * Layout wrapper for the /client-codes section.
 * Renders the two-column master/detail shell.
 * The left column (list) always visible; right column driven by child routes.
 */
export default function ClientCodesLayout() {
    return <Outlet />;
}