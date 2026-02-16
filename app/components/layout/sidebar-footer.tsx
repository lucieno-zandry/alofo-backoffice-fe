function SidebarFooter({ collapsedView, showFull }: { collapsedView: boolean, showFull: boolean }) {
    return (
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
    );
}

export default SidebarFooter;