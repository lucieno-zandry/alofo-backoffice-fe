import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useActionData, useNavigation, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { HttpException, ValidationException } from "~/api/app-fetch";
import { createCategory, updateCategory } from "~/api/http-requests";
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
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
};

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
    } catch (error) {
        return error;
    }

    return null;
}

export function CategoriesPageView({ openCreate, openEdit, setSheetConfig, sheetConfig, }: CategoriesPageViewProps) {
    return (
        <div className="pb-24">
            <CategoryPageHeader />

            <div className="bg-card/40 backdrop-blur-xl border border-border rounded-[2rem] p-8 shadow-2xl transition-colors duration-300">
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
        data?: Category;
    }>({
        isOpen: false,
        mode: "create"
    });

    const [searchQuery, setSearchQuery] = useState("");

    const openCreate = () => setSheetConfig({ isOpen: true, mode: "create" });

    // We pass this down to the CategoryTree -> CategoryRow
    const openEdit = (category: Category) => setSheetConfig({
        isOpen: true,
        mode: "edit",
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
        openEdit={openEdit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
    />;
}