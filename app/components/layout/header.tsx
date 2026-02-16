import { Bell, Menu } from "lucide-react";
import useBackofficeSidebar from "~/hooks/use-backoffice-sidebar";

export default function () {
    const { setIsMobileOpen } = useBackofficeSidebar();

    return <HeaderView onMenuClick={() => setIsMobileOpen(true)} />
}

export function HeaderView({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="flex items-center justify-between px-6 h-16 bg-card backdrop-blur-md border border-border rounded-2xl mb-2 sticky top-0 z-30 transition-colors duration-300">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={onMenuClick}
                    className="p-2 lg:hidden text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg transition-colors"
                >
                    <Menu size={20} />
                </button>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                        Admin
                    </span>
                    <span className="text-border">/</span>
                    <span className="text-foreground font-semibold">Dashboard</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Notifications */}
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all relative group">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card group-hover:scale-110 transition-transform" />
                </button>

                {/* Divider */}
                <div className="h-4 w-[px] bg-border mx-1" />

                {/* User Profile Trigger */}
                <button className="flex items-center gap-2 p-1 pr-2 hover:bg-accent rounded-lg transition-colors group">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-indigo-500 border border-white/10 group-hover:shadow-sm" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground hidden sm:block">
                        JD
                    </span>
                </button>
            </div>
        </header>
    );
}