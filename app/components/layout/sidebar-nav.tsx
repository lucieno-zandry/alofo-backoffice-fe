import { NavLink } from "react-router";

import {
    LayoutDashboard, Package, FolderTree, ShoppingCart,
    CreditCard, Truck, Users, Landmark, TicketPercent,
    Sparkles, Settings,
    type LucideProps
} from "lucide-react";

type NavGroup = ({
    group: string;
    links: ({
        to: string;
        label: string;
        icon: any;
        end?: boolean;
    })[];
})

export const navGroups: NavGroup[] = [
    {
        group: "General",
        links: [
            { to: "", label: "Dashboard", icon: LayoutDashboard, end: true },
        ]
    },
    {
        group: "Catalog",
        links: [
            { to: "products", label: "Products", icon: Package },
            { to: "categories", label: "Categories", icon: FolderTree },
        ]
    },
    {
        group: "Sales",
        links: [
            { to: "orders", label: "Orders", icon: ShoppingCart },
            { to: "transactions", label: "Transactions", icon: CreditCard },
            { to: "shipments", label: "Shipments", icon: Truck },
        ]
    },
    {
        group: "Customers",
        links: [
            { to: "users", label: "Users", icon: Users },
            { to: "client-codes", label: "Client Codes", icon: Landmark },
        ]
    },
    {
        group: "Marketing",
        links: [
            { to: "coupons", label: "Coupons", icon: TicketPercent },
            { to: "promotions", label: "Promotions", icon: Sparkles },
        ]
    },
    {
        group: "System",
        links: [
            { to: "settings", label: "Settings", icon: Settings },
        ]
    }
];

type SidebarNavProps = {
    collapsedView: boolean,
    lang: string,
}

export default function SidebarNav({ collapsedView, lang }: SidebarNavProps) {
    return (
        <nav className="flex-1 px-3 space-y-6 overflow-y-auto py-4 custom-scrollbar">
            {navGroups.map((group) => (
                <div key={group.group} className="space-y-1">
                    <div className="px-4 h-6 flex items-center">
                        {!collapsedView ? (
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                                {group.group}
                            </span>
                        ) : (
                            <div className="h-px bg-sidebar-border w-full" />
                        )}
                    </div>

                    {group.links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={`/${lang}/${link.to}`}
                            end={link.end}
                            className={({ isActive }) => `
                                flex items-center rounded-xl transition-all duration-200 group py-2.5 relative
                                ${collapsedView ? "justify-center px-0" : "px-4 gap-3"}
                                ${isActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <link.icon size={20} className={`flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />

                                    {!collapsedView && (
                                        <span className="text-sm whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2">
                                            {link.label}
                                        </span>
                                    )}

                                    {collapsedView && (
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-popover text-popover-foreground text-xs font-medium rounded-md 
                                            opacity-0 invisible -translate-x-2 transition-all duration-200
                                            group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 z-50 pointer-events-none whitespace-nowrap shadow-xl border border-border">
                                            {link.label}
                                        </div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            ))}
        </nav>
    );
}