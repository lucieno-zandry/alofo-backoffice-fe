// ~/stores/use-category-store.ts
import { create } from 'zustand';

export type CategoryWithChildren = Category & {
    children: CategoryWithChildren[];
};

interface CategoryState {
    categories: Category[];
    setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories }),
}));

/**
 * SELECTOR: This is the magic part. 
 * We use a separate selector function so we can memoize the tree structure.
 */
export const selectCategoryTree = (state: CategoryState): CategoryWithChildren[] => {
    const { categories } = state;
    if (categories.length === 0) return [];

    const categoryMap: Record<number, CategoryWithChildren> = {};
    const tree: CategoryWithChildren[] = [];

    categories.forEach((cat) => {
        categoryMap[cat.id] = { ...cat, children: [] };
    });

    categories.forEach((cat) => {
        if (cat.parent_id !== null && categoryMap[cat.parent_id]) {
            categoryMap[cat.parent_id].children.push(categoryMap[cat.id]);
        } else if (cat.parent_id === null) {
            tree.push(categoryMap[cat.id]);
        }
    });

    return tree;
};