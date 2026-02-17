import type { CategoryWithChildren } from "~/hooks/use-category-store";

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

export default filterTree;