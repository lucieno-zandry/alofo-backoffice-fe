import { Edit, Plus, Trash } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useProductFormStore } from "../../stores/use-product-form-store";
import { useCallback } from "react";
import useProductStore from "../../stores/use-product-store";
import useProductDeleteDialogStore from "../../stores/use-product-delete-dialog-store";

export type ProductDetailHeaderViewProps = {
    openForCreate: () => void;
    openForEdit?: () => void;
    onDelete?: () => void;
}

export function ProductDetailHeaderView({ openForCreate, openForEdit, onDelete }: ProductDetailHeaderViewProps) {
    return <div className="border-b px-6 py-4 flex justify-between items-center" >
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className='flex gap-2 flex-wrap'>
            <Button onClick={openForCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Create Product
            </Button>
            {
                openForEdit &&
                <Button onClick={openForEdit} variant={'ghost'}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Product
                </Button>
            }
            {
                onDelete &&
                <Button onClick={onDelete} variant={'destructive'}>
                    <Trash className="mr-2 h-4 w-4" />
                    Edit Product
                </Button>
            }
        </div>
    </div >
}

export default function () {
    const { openForCreate, openForEdit } = useProductFormStore();
    const { setProductDeleteDialogOpen, setProductToDelete } = useProductDeleteDialogStore();
    const { product } = useProductStore();

    const handleOpenForEdit = useCallback(() => product && openForEdit(product), [product, openForEdit]);

    const handleDelete = useCallback(() => {
        if (!product) return;
        setProductDeleteDialogOpen(true);
        setProductToDelete(product);
    }, [product, setProductDeleteDialogOpen, setProductToDelete])

    return <ProductDetailHeaderView
        openForCreate={openForCreate}
        openForEdit={handleOpenForEdit}
        onDelete={product && handleDelete}
        />
}