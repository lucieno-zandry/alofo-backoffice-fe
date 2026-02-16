// src/routes/backoffice/categories/components/CategoryRow.tsx
import { ChevronDown, ChevronRight, MoreVertical, Plus, Pencil, Trash2, Tag } from "lucide-react";

type CategoryRowProps = {
    category: Category,
    level: number,
    hasChildren: boolean,
    isExpanded: boolean,
    onToggle: () => void,
    onAction: (action: 'edit' | 'add-sub' | 'add-product' | 'delete') => void,
}

export function CategoryRow({ category, level, hasChildren, isExpanded, onToggle }: CategoryRowProps) {
    // We reduce opacity as the level increases to make nested items look "deeper"
    const opacity = Math.max(0.1, 0.4 - level * 0.1);
    const blur = Math.max(4, 12 - level * 2);
    const borderOpacity = Math.max(0.02, 0.1 - level * 0.02);

    return (
        <div className="relative group">
            {/* Visual Thread Guide - Matches the border color of the parent */}
            {level > 0 && (
                <div
                    className="absolute border-l border-white/10"
                    style={{
                        left: `${(level * 32) - 20}px`,
                        top: '-12px',
                        bottom: '22px',
                        borderBottomLeftRadius: '8px',
                        borderBottomWidth: '1px',
                        width: '12px'
                    }}
                />
            )}

            <div
                className={`
          group flex items-center justify-between p-3 rounded-xl border transition-all mb-2
          ${isExpanded ? 'ring-1 ring-indigo-500/30' : ''}
        `}
                style={{
                    marginLeft: `${level * 32}px`,
                    backgroundColor: `rgba(24, 24, 27, ${opacity})`, // zinc-900 with dynamic opacity
                    backdropFilter: `blur(${blur}px)`,
                    borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
                }}
            >
                <div className="flex items-center gap-3">
                    {hasChildren ? (
                        <button
                            onClick={onToggle}
                            className={`p-1 rounded transition-colors ${isExpanded ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/5 text-zinc-500'}`}
                        >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                    ) : (
                        <div className="w-6 flex justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <span className={`text-sm font-semibold tracking-tight ${level === 0 ? 'text-zinc-100' : 'text-zinc-300'}`}>
                            {category.title}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-wider">
                            {/* This is where you'd show stats based on your Product model */}
                            ID: {category.id} • 0 Products
                        </span>
                    </div>
                </div>

                {/* Action Dropdown Placeholder */}
                <div className="flex items-center gap-1">
                    <button className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}