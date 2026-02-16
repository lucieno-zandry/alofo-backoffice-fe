function SidebarOverlay({ isMobileOpen, setMobileOpen }: {
    isMobileOpen: boolean,
    setMobileOpen: (open: boolean) => void
}) {
    if (!isMobileOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
        />
    );
}

export default SidebarOverlay;