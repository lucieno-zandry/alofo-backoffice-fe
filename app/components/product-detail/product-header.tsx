import { Button } from "~/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import useProductEditorSheet from "~/hooks/use-product-editor-sheet";
import { useLoaderData } from "react-router";
import { clientLoader } from "~/routes/backoffice/products";
import { useCallback } from "react";
import useProductDeleteDialogStore from "~/hooks/use-product-delete-dialog-store";

type ProductHeaderViewProps = { title: string; slug: string, onEdit: () => void, onDelete: () => void }

type ProductHeaderProps = Pick<ProductHeaderViewProps, 'slug' | 'title'>

export function ProductHeaderView({ title, slug, onEdit, onDelete }: ProductHeaderViewProps) {
  return (
    <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-border shrink-0">
      <div className="min-w-0">
        <h2 className="text-lg font-semibold leading-tight">{title}</h2>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">/{slug}</p>
      </div>
      <div className="flex shrink-0 gap-2" >
        <Button size="sm" variant="outline" className="gap-1.5" type="button" onClick={onEdit}>
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </Button>
        <Button size="sm" variant="destructive" className="flex items-center gap-1.5" type="button" onClick={onDelete}>
          <Trash className="w-3.5 h-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function (props: ProductHeaderProps) {
  const { setOpen } = useProductEditorSheet();
  const { product } = useLoaderData<typeof clientLoader>();

  const { setProduct } = useProductDeleteDialogStore();

  const handleDelete = useCallback(() => {
    setProduct(product);
  }, [setProduct, product]);


  return <ProductHeaderView {...props} onEdit={() => setOpen(true, product)} onDelete={handleDelete} />
}