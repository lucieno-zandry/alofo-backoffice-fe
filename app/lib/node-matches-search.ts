import type { CategoryWithChildren } from "~/hooks/use-category-store";

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

export default nodeMatchesSearch;
