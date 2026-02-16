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
        p-1.5 hover:bg-zinc-900 rounded-md text-zinc-500 hover:text-zinc-200 transition-all
        ${collapsedView ? "mt-2" : ""} hidden lg:block
      `}
        >
            <ChevronLeft className={`transition-transform duration-300 ${collapsedView ? "-rotate-90" : ""}`} size={18} />
        </button>
    );
}

export default SidebarToggle;