import { Bell, Menu } from "lucide-react";
import useBackofficeSidebar from "~/hooks/use-backoffice-sidebar";
import UserDropdown from "./user-dropdown";
import BreadcrumbNav from "./breadcrumb-nav";
import { NotificationsPopover } from "../notifications/notifications-popover";

export default function () {
    const { setIsMobileOpen } = useBackofficeSidebar();

    return <HeaderView onMenuClick={() => setIsMobileOpen(true)} />
}

export function HeaderView({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="flex items-center justify-between px-6 py-2 bg-card backdrop-blur-md border border-border rounded-2xl mb-2 sticky top-0 z-30 transition-colors duration-300">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={onMenuClick}
                    className="p-2 lg:hidden text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg transition-colors"
                >
                    <Menu size={20} />
                </button>

                {/* Breadcrumb */}
                <BreadcrumbNav />
            </div>

            <div className="flex items-center gap-3">
                {/* Notifications */}
                <NotificationsPopover />

                {/* Divider */}
                <div className="h-4 w-[px] bg-border mx-1" />

                {/* User Profile Trigger */}
                <UserDropdown />
            </div>
        </header>
    );
}