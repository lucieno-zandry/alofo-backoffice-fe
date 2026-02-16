import { useState } from "react";
import { CategoryPageHeader } from "~/components/categories/category-page-header";
import { CategorySheet } from "~/components/categories/category-sheet";
import { CategoryTree } from "~/components/categories/category-tree";
import { FloatingAddButton } from "~/components/floating-add-button";

type CategoriesPageViewProps = {
    sheetConfig: {
        isOpen: boolean;
        mode: "create" | "edit";
        data?: any;
    };
    setSheetConfig: React.Dispatch<React.SetStateAction<{
        isOpen: boolean;
        mode: "create" | "edit";
        data?: any;
    }>>;
    openCreate: () => void;
    openEdit: (category: Category) => void;
};

export function CategoriesPageView({ openCreate, openEdit, setSheetConfig, sheetConfig }: CategoriesPageViewProps) {
    return (
        <div className="pb-24">
            <CategoryPageHeader />

            <div className="bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                <CategoryTree onEdit={openEdit} />
            </div>

            <FloatingAddButton onClick={openCreate} label="Add Category" />

            <CategorySheet
                isOpen={sheetConfig.isOpen}
                mode={sheetConfig.mode}
                initialData={sheetConfig.data}
                onClose={() => setSheetConfig(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
}

export default function CategoriesPage() {
    const [sheetConfig, setSheetConfig] = useState<{
        isOpen: boolean;
        mode: "create" | "edit";
        data?: any;
    }>({
        isOpen: false,
        mode: "create"
    });

    const openCreate = () => setSheetConfig({ isOpen: true, mode: "create" });

    // We pass this down to the CategoryTree -> CategoryRow
    const openEdit = (category: any) => setSheetConfig({
        isOpen: true,
        mode: "edit",
        data: category
    });

    return <CategoriesPageView
        sheetConfig={sheetConfig}
        setSheetConfig={setSheetConfig}
        openCreate={openCreate}
        openEdit={openEdit}
    />;
}