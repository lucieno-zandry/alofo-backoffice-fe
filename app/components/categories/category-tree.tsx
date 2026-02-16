// ~/routes/backoffice/categories/components/category-tree.tsx
import { useMemo, useState, useCallback } from "react";
import { CategoryRow } from "./category-row";
import { useCategoryStore, type CategoryWithChildren } from "~/hooks/use-category-store";
import {
    CategoryTreeToolbar,
    type TreeToolbarState,
    type SortField,
    type SortDirection,
    type FilterType,
} from "~/components/categories/category-tree-toolbar";

type CategoryTreeProps = {
    onEdit: (category: Category) => void;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Recursively sort a tree's children by a given field + direction. */
function sortNodes(
    nodes: CategoryWithChildren[],
    field: SortField,
    direction: SortDirection,
): CategoryWithChildren[] {
    const sorted = [...nodes].sort((a, b) => {
        let aVal = a[field] as string;
        let bVal = b[field] as string;
        // title → case-insensitive
        if (field === "title") {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return direction === "asc" ? cmp : -cmp;
    });
    return sorted.map((n) => ({
        ...n,
        children: sortNodes(n.children, field, direction),
    }));
}

/**
 * Returns true if the node's title matches the query, OR any descendant does.
 * Also populates `matchingIds` so we can highlight / auto-expand.
 */
function nodeMatchesSearch(
    node: CategoryWithChildren,
    query: string,
    matchingIds: Set<number>,
): boolean {
    const selfMatch = node.title.toLowerCase().includes(query.toLowerCase());
    const childMatch = node.children.some((c) => nodeMatchesSearch(c, query, matchingIds));
    if (selfMatch || childMatch) {
        matchingIds.add(node.id);
        return true;
    }
    return false;
}

/**
 * Filter a tree to only nodes (and their ancestors) that match the search query.
 * If a parent matches, its children are preserved; if only a child matches, the
 * parent is kept as a "path" node.
 */
function filterTree(
    nodes: CategoryWithChildren[],
    query: string,
    matchingIds: Set<number>,
): CategoryWithChildren[] {
    return nodes.reduce<CategoryWithChildren[]>((acc, node) => {
        if (!matchingIds.has(node.id)) return acc;
        const filteredChildren = filterTree(node.children, query, matchingIds);
        acc.push({ ...node, children: filteredChildren });
        return acc;
    }, []);
}

// ─── Component ───────────────────────────────────────────────────────────────

const DEFAULT_TOOLBAR: TreeToolbarState = {
    search: "",
    sortField: "title",
    sortDirection: "asc",
    filterType: "all",
};

export function CategoryTree({ onEdit }: CategoryTreeProps) {
    const categories = useCategoryStore((state) => state.categories);
    const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
    const [toolbar, setToolbar] = useState<TreeToolbarState>(DEFAULT_TOOLBAR);

    const handleToolbarChange = useCallback((patch: Partial<TreeToolbarState>) => {
        setToolbar((prev) => ({ ...prev, ...patch }));
    }, []);

    // ── 1. Build the raw tree ───────────────────────────────────────────────
    const rawTree = useMemo<CategoryWithChildren[]>(() => {
        const map: Record<number, CategoryWithChildren> = {};
        const roots: CategoryWithChildren[] = [];
        categories.forEach((c) => (map[c.id] = { ...c, children: [] }));
        categories.forEach((c) => {
            if (c.parent_id && map[c.parent_id]) map[c.parent_id].children.push(map[c.id]);
            else roots.push(map[c.id]);
        });
        return roots;
    }, [categories]);

    // ── 2. Apply type filter (root / children) ─────────────────────────────
    const typeFilteredTree = useMemo<CategoryWithChildren[]>(() => {
        if (toolbar.filterType === "root") {
            // Keep only root nodes, strip children display (but keep them for search)
            return rawTree.map((n) => ({ ...n, children: [] }));
        }
        if (toolbar.filterType === "children") {
            // Flatten: collect every non-root node as a pseudo-root
            const subs: CategoryWithChildren[] = [];
            const collect = (nodes: CategoryWithChildren[]) => {
                nodes.forEach((n) => {
                    if (n.parent_id !== null) subs.push({ ...n, children: [] });
                    collect(n.children);
                });
            };
            collect(rawTree);
            return subs;
        }
        return rawTree;
    }, [rawTree, toolbar.filterType]);

    // ── 3. Sort ────────────────────────────────────────────────────────────
    const sortedTree = useMemo(
        () => sortNodes(typeFilteredTree, toolbar.sortField, toolbar.sortDirection),
        [typeFilteredTree, toolbar.sortField, toolbar.sortDirection],
    );

    // ── 4. Search (filter + collect matching ids for auto-expand) ──────────
    const { visibleTree, autoExpandIds } = useMemo(() => {
        if (!toolbar.search.trim()) return { visibleTree: sortedTree, autoExpandIds: new Set<number>() };

        const matchingIds = new Set<number>();
        sortedTree.forEach((n) => nodeMatchesSearch(n, toolbar.search, matchingIds));
        const filtered = filterTree(sortedTree, toolbar.search, matchingIds);

        // Collect parent ids that need to expand to reveal matches
        const autoExpand = new Set<number>();
        const markParents = (nodes: CategoryWithChildren[]) => {
            nodes.forEach((n) => {
                if (n.children.length > 0) {
                    autoExpand.add(n.id);
                    markParents(n.children);
                }
            });
        };
        markParents(filtered);

        return { visibleTree: filtered, autoExpandIds: autoExpand };
    }, [sortedTree, toolbar.search]);

    // ── 5. Merge manual expand state with auto-expand from search ──────────
    const effectiveExpanded = useMemo<Record<number, boolean>>(() => {
        if (!toolbar.search.trim()) return expandedIds;
        const merged: Record<number, boolean> = { ...expandedIds };
        autoExpandIds.forEach((id) => {
            merged[id] = true;
        });
        return merged;
    }, [expandedIds, autoExpandIds, toolbar.search]);

    // ── Counts for the toolbar badge ───────────────────────────────────────
    const visibleCount = useMemo(() => {
        const count = (nodes: CategoryWithChildren[]): number =>
            nodes.reduce((acc, n) => acc + 1 + count(n.children), 0);
        return count(visibleTree);
    }, [visibleTree]);

    // ── Render ─────────────────────────────────────────────────────────────
    const renderNodes = (nodes: CategoryWithChildren[], level = 0): React.ReactNode =>
        nodes.map((node) => (
            <div key={node.id}>
                <CategoryRow
                    category={node}
                    level={level}
                    hasChildren={node.children.length > 0}
                    isExpanded={!!effectiveExpanded[node.id]}
                    onToggle={() =>
                        setExpandedIds((p) => ({ ...p, [node.id]: !p[node.id] }))
                    }
                    onAction={() => onEdit(node)}
                    searchQuery={toolbar.search}
                />
                {node.children.length > 0 && effectiveExpanded[node.id] && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                        {renderNodes(node.children, level + 1)}
                    </div>
                )}
            </div>
        ));

    return (
        <div>
            <CategoryTreeToolbar
                state={toolbar}
                onChange={handleToolbarChange}
                totalCount={categories.length}
                visibleCount={visibleCount}
            />

            {visibleTree.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-border rounded-[2rem]">
                    <p className="text-muted-foreground font-medium">
                        {toolbar.search
                            ? `No categories match "${toolbar.search}"`
                            : "No categories found."}
                    </p>
                    {toolbar.search && (
                        <button
                            onClick={() => handleToolbarChange({ search: "" })}
                            className="mt-2 text-xs text-primary hover:underline"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-1">{renderNodes(visibleTree)}</div>
            )}
        </div>
    );
}