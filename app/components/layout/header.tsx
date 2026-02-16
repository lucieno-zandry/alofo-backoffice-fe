import { Bell, Menu, User } from "lucide-react";
import useBackofficeSidebar from "~/hooks/use-backoffice-sidebar";

export default function () {
    const { setIsMobileOpen } = useBackofficeSidebar();

    return <Header onMenuClick={() => setIsMobileOpen(true)} />
}

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="flex items-center justify-between px-6 h-16 bg-zinc-950/60 backdrop-blur-md border border-white/5 rounded-2xl mb-2 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="p-2 lg:hidden text-zinc-400 hover:bg-zinc-900 rounded-lg transition-colors">
                    <Menu size={20} />
                </button>

                <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">Admin</span>
                    <span className="text-zinc-800">/</span>
                    <span className="text-zinc-200 font-semibold">Dashboard</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all relative group">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-zinc-950 group-hover:scale-110 transition-transform" />
                </button>

                <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

                <button className="flex items-center gap-2 p-1 pr-2 hover:bg-zinc-900 rounded-lg transition-colors">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10" />
                    <span className="text-sm font-medium text-zinc-300 hidden sm:block">JD</span>
                </button>
            </div>
        </header>
    );
}