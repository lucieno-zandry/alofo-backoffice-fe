// ~/routes/backoffice/categories/components/category-tree.tsx
import { useMemo, useState } from "react";
import { CategoryRow } from "./category-row";
import { useCategoryStore, type CategoryWithChildren } from "~/hooks/use-category-store";

type CategoryTreeProps = {
    onEdit: (category: Category) => void;
};

export function CategoryTree({ onEdit }: CategoryTreeProps) {
    // 1. Get the raw list from Zustand
    const categories = useCategoryStore((state) => state.categories);
    const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});

    // 2. High-performance memoized tree build (O(n))
    const tree = useMemo(() => {
        const map: Record<number, any> = {};
        const roots: CategoryWithChildren[] = [];
        categories.forEach(c => map[c.id] = { ...c, children: [] });
        categories.forEach(c => {
            if (c.parent_id && map[c.parent_id]) map[c.parent_id].children.push(map[c.id]);
            else roots.push(map[c.id]);
        });
        return roots;
    }, [categories]);

    // 3. Simple, fast render logic
    const renderNodes = (nodes: CategoryWithChildren[], level = 0) => (
        nodes.map(node => (
            <div key={node.id}>
                <CategoryRow
                    category={node}
                    level={level}
                    hasChildren={node.children.length > 0}
                    isExpanded={!!expandedIds[node.id]}
                    onToggle={() => setExpandedIds(p => ({ ...p, [node.id]: !p[node.id] }))}
                    onAction={() => { }}
                />
                {node.children.length > 0 && expandedIds[node.id] && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                        {renderNodes(node.children, level + 1)}
                    </div>
                )}
            </div>
        ))
    );

    if (tree.length === 0) {
        return (
            <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[2rem]">
                <p className="text-zinc-500 font-medium">No categories found.</p>
            </div>
        );
    }

    return <div className="space-y-1">{renderNodes(tree)}</div>;
}