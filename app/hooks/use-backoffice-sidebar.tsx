import { create } from "zustand";

type BackOfficeSidebarStore = {
    isMobileOpen: boolean;
    setIsMobileOpen: (v: boolean) => void;
}

export default create<BackOfficeSidebarStore>()((set) => ({
    isMobileOpen: false,
    setIsMobileOpen: (v) => set({ isMobileOpen: v }),
}));