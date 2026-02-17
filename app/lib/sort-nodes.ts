import type { SortDirection, SortField } from "~/components/categories/category-tree-toolbar";
import type { CategoryWithChildren } from "~/hooks/use-category-store";

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

export default sortNodes;