import { useState } from "react";
import { NavLink, useParams } from "react-router";
import {
    LayoutDashboard, Package, ShoppingCart, Users, Settings,
    ChevronLeft, X, LogOut
} from "lucide-react";
import useBackofficeSidebar from "~/hooks/use-backoffice-sidebar";

const rawLinks = [
    { to: "", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "products", label: "Products", icon: Package },
    { to: "orders", label: "Orders", icon: ShoppingCart },
    { to: "users", label: "Users", icon: Users },
    { to: "settings", label: "Settings", icon: Settings },
];

export default function SidebarWrapper() {
    const { isMobileOpen, setIsMobileOpen } = useBackofficeSidebar();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { lang } = useParams();

    return (
        <Sidebar
            lang={lang || "en"}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isMobileOpen={isMobileOpen}
            setMobileOpen={setIsMobileOpen}
        />
    );
}

export function Sidebar({ lang, isCollapsed, setIsCollapsed, isMobileOpen, setMobileOpen }: any) {
    const showFull = !isCollapsed || isMobileOpen;
    const collapsedView = isCollapsed && !isMobileOpen

    return (
        <>
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 
                bg-zinc-950 border-r border-zinc-800 transition-all duration-300 flex flex-col
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                ${collapsedView ? "w-20" : "w-64"}
            `}>

                {/* Logo & Toggle Section */}
                <div className={`
                    flex p-4 min-h-[80px] transition-all duration-300
                    ${collapsedView ? "flex-col items-center gap-4" : "flex-row items-center justify-between"}
                `}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        {showFull && (
                            <span className="font-bold text-xl text-zinc-100 tracking-tight animate-in fade-in duration-500">
                                Admin
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => isMobileOpen ? setMobileOpen(false) : setIsCollapsed(!collapsedView)}
                        className={`
                            p-1.5 hover:bg-zinc-900 rounded-md text-zinc-500 hover:text-zinc-200 transition-all
                            ${collapsedView ? "mt-2" : ""} hidden lg:block
                        `}
                    >
                        {/* The arrow rotates 90 degrees down when collapsed, or 180 to face right */}
                        <ChevronLeft className={`transition-transform duration-300 ${collapsedView ? "-rotate-90" : ""}`} size={18} />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3 space-y-2 mt-4">
                    {rawLinks.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={`/${lang}/${to}`}
                            end={end}
                            className={({ isActive }) => `
                flex items-center rounded-xl transition-all duration-200 group py-3 relative
                ${collapsedView ? "justify-center px-0" : "px-4 gap-4"}
                ${isActive ? "bg-indigo-600/10 text-indigo-400 font-medium" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}
            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={22} className={`flex-shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-100"}`} />

                                    {/* Label for expanded view */}
                                    {!collapsedView && (
                                        <span className="whitespace-nowrap overflow-hidden animate-in slide-in-from-left-2 duration-300">
                                            {label}
                                        </span>
                                    )}

                                    {/* Tooltip for collapsed view */}
                                    {collapsedView && (
                                        <div className="absolute left-full ml-6 px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-md 
                                        opacity-0 invisible -translate-x-3 transition-all duration-200
                                        group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 z-50 pointer-events-none">
                                            {label}
                                            {/* The little arrow pointing left */}
                                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-indigo-600 rotate-45" />
                                        </div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
                
                {/* Footer Logic: Also Centered when collapsed */}
                <div className="p-4 border-t border-zinc-900">
                    <div className={`
                        flex items-center gap-3 transition-all
                        ${collapsedView ? "flex-col" : "flex-row bg-zinc-900/50 p-2 rounded-xl"}
                    `}>
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                            AR
                        </div>
                        {showFull && (
                            <div className="flex flex-col min-w-0 flex-1 uppercase tracking-tighter">
                                <span className="text-[11px] font-bold text-zinc-200 truncate">Alex Rivera</span>
                                <span className="text-[9px] text-zinc-500 truncate">Administrator</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}