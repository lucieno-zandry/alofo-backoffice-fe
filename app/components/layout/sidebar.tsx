import { useState } from "react";
import useBackofficeSidebar from "~/hooks/use-backoffice-sidebar";
import SidebarNav from "./sidebar-nav";
import SidebarOverlay from "./sidebar-overlay";
import SidebarLogo from "./sidebar-logo";
import SidebarToggle from "./sidebar-toggle";
import SidebarFooter from "./sidebar-footer";
import useRouterStore from "~/hooks/use-router-store";

export default function SidebarWrapper() {
    const { isMobileOpen, setIsMobileOpen } = useBackofficeSidebar();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { lang } = useRouterStore();

    const showFull = !isCollapsed || isMobileOpen;
    const collapsedView = isCollapsed && !isMobileOpen

    return (
        <Sidebar
            lang={lang}
            setIsCollapsed={setIsCollapsed}
            isMobileOpen={isMobileOpen}
            setMobileOpen={setIsMobileOpen}
            showFull={showFull}
            collapsedView={collapsedView}
        />
    );
}

type SidebarProps = {
    lang: string,
    setIsCollapsed: (collapsed: boolean) => void,
    isMobileOpen: boolean,
    setMobileOpen: (mobileOpen: boolean) => void,
    showFull: boolean,
    collapsedView: boolean,
}

export function Sidebar({ lang, setIsCollapsed, isMobileOpen, setMobileOpen, showFull, collapsedView }: SidebarProps) {
    return (
        <>
            <SidebarOverlay isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />

            <aside className={`
                fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 
                bg-zinc-950/60 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-300 flex flex-col
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                ${collapsedView ? "w-20" : "w-64"}
            `}>

                {/* Logo & Toggle Section */}
                <div className={`
                    flex p-4 min-h-[80px] transition-all duration-300
                    ${collapsedView ? "flex-col items-center gap-4" : "flex-row items-center justify-between"}
                `}>
                    <SidebarLogo showFull={showFull} />

                    <SidebarToggle
                        collapsedView={collapsedView}
                        isMobileOpen={isMobileOpen}
                        setMobileOpen={setMobileOpen}
                        setIsCollapsed={setIsCollapsed} />
                </div>

                {/* Nav Links */}
                <SidebarNav collapsedView={collapsedView} lang={lang} />

                {/* Footer Logic: Also Centered when collapsed */}
                <SidebarFooter collapsedView={collapsedView} showFull={showFull} />
            </aside>
        </>
    );
}