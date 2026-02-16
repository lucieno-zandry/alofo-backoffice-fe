import { ChevronLeft } from "lucide-react";

function SidebarToggle({ collapsedView, isMobileOpen, setMobileOpen, setIsCollapsed }: {
    collapsedView: boolean,
    isMobileOpen: boolean,
    setMobileOpen: (open: boolean) => void,
    setIsCollapsed: (collapsed: boolean) => void
}) {
    return (
        <button
            onClick={() => isMobileOpen ? setMobileOpen(false) : setIsCollapsed(!collapsedView)}
            className={`
                p-1.5 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground transition-all
                ${collapsedView ? "mt-2" : ""} hidden lg:block
            `}
        >
            <ChevronLeft className={`transition-transform duration-300 ${collapsedView ? "-rotate-90" : ""}`} size={18} />
        </button>
    );
}

export default SidebarToggle;