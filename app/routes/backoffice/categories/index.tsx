import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useActionData, useNavigation, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { HttpException, ValidationException } from "~/api/app-fetch";
import { createCategory, deleteCategory, updateCategory } from "~/api/http-requests";
import { CategoryDeleteDialog } from "~/components/categories/category-delete-dialog";
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
    onEdit: (category: Category) => void;
    onAddSub: (category: Category) => void;
    onDelete: (category: Category) => void;
    deleteConfig: {
        isOpen: boolean;
        data: Category | null;
    };
    setDeleteConfig: Dispatch<SetStateAction<{
        isOpen: boolean;
        data: Category | null;
    }>>
};

export function CategoriesPageView({ openCreate, onEdit, onAddSub, onDelete, setSheetConfig, sheetConfig, deleteConfig, setDeleteConfig }: CategoriesPageViewProps) {
    return (
        <div className="pb-24">
            <CategoryPageHeader />

            <div className="bg-card/40 backdrop-blur-xl border border-border rounded-[2rem] p-8 shadow-2xl transition-colors duration-300">
                <CategoryTree onEdit={onEdit} onAddSub={onAddSub} onDelete={onDelete} />
            </div>

            <FloatingAddButton onClick={openCreate} label="Add Category" />

            <CategorySheet
                isOpen={sheetConfig.isOpen}
                mode={sheetConfig.mode}
                initialData={sheetConfig.data}
                onClose={() => setSheetConfig(prev => ({ ...prev, isOpen: false }))}
            />

            <CategoryDeleteDialog
                category={deleteConfig.data}
                isOpen={deleteConfig.isOpen}
                onClose={() => setDeleteConfig({ ...deleteConfig, isOpen: false })}
            />
        </div>
    );
}

export default function CategoriesPage() {
    const [sheetConfig, setSheetConfig] = useState<{
        isOpen: boolean;
        mode: "create" | "edit";
        data?: Partial<Category>;
    }>({
        isOpen: false,
        mode: "create"
    });

    const [deleteConfig, setDeleteConfig] = useState<{ isOpen: boolean; data: Category | null }>({
        isOpen: false,
        data: null,
    });

    const openCreate = () => setSheetConfig({ isOpen: true, mode: "create" });

    // We pass this down to the CategoryTree -> CategoryRow
    const openEdit = (category: Category) => setSheetConfig({
        isOpen: true,
        mode: "edit",
        data: category
    });

    const openAddSub = (category: Category) => setSheetConfig({
        isOpen: true,
        mode: "create",
        data: { parent_id: category.id }
    });

    const openDelete = (category: Category) => setDeleteConfig({
        isOpen: true,
        data: category
    });

    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        // Only close if we finished submitting AND there's no error in actionData
        const isFinishedSuccessfully =
            !isSubmitting &&
            actionData !== undefined &&
            !(actionData instanceof ValidationException) &&
            !(actionData instanceof HttpException);

        if (isFinishedSuccessfully && sheetConfig.isOpen) {
            sheetConfig.mode === "create" ?
                toast.success("Category created successfully!") :
                toast.success("Category updated successfully!");

            setSheetConfig(prev => ({ ...prev, isOpen: false }));
        }
    }, [isSubmitting, actionData, sheetConfig.mode]);

    return <CategoriesPageView
        sheetConfig={sheetConfig}
        setSheetConfig={setSheetConfig}
        openCreate={openCreate}
        onEdit={openEdit}
        onAddSub={openAddSub}
        onDelete={openDelete}
        deleteConfig={deleteConfig}
        setDeleteConfig={setDeleteConfig}
    />;
}

export async function clientAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const title = formData.get("title");
    const parent_id = formData.get("parent_id") || null;
    const id = formData.get("id");

    try {
        if (intent === "create") {
            await createCategory({ title, parent_id });
        }

        if (intent === "update") {
            await updateCategory(id, { title, parent_id });
        }

        if (intent === "delete") {
            await deleteCategory(id);
        }
    } catch (error) {
        return error;
    }

    return null;
}