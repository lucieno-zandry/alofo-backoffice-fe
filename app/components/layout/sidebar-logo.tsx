function SidebarLogo({ showFull }: { showFull: boolean }) {
  return (
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
  );
}

export default SidebarLogo;