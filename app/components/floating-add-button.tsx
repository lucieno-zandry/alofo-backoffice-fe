import { Plus } from "lucide-react";

export function FloatingAddButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            // We use 'w-14' as the base (square) and 'hover:w-auto' for the expansion
            // 'min-w-[56px]' ensures it stays a perfect circle/square when collapsed
            className="fixed bottom-8 right-8 z-50 group flex items-center justify-center h-14 min-w-[56px] px-4 
                       bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl 
                       shadow-2xl shadow-indigo-500/40 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                       hover:scale-105 active:scale-95 border border-white/20"
        >
            <div className="flex items-center justify-center relative">
                <Plus size={24} className="transition-transform duration-500 group-hover:rotate-90 flex-shrink-0" />
                
                <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold transition-all duration-500 
                                 group-hover:max-w-[200px] group-hover:ml-3 opacity-0 group-hover:opacity-100">
                    {label}
                </span>
            </div>
        </button>
    );
}