import { Button } from "~/components/ui/button";
import { Pencil } from "lucide-react";
import useProductEditorSheet from "~/hooks/use-product-editor-sheet";
import { useLoaderData } from "react-router";
import { clientLoader } from "~/routes/backoffice/products/product-detail";

type ProductHeaderViewProps = { title: string; slug: string, onEdit: () => void }

type ProductHeaderProps = Pick<ProductHeaderViewProps, 'slug' | 'title'>

export function ProductHeaderView({ title, slug, onEdit }: ProductHeaderViewProps) {
  return (
    <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-border shrink-0">
      <div className="min-w-0">
        <h2 className="text-lg font-semibold leading-tight">{title}</h2>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">/{slug}</p>
      </div>
      <Button size="sm" variant="outline" className="shrink-0 gap-1.5" type="button" onClick={onEdit}>
        <Pencil className="w-3.5 h-3.5" />
        Edit
      </Button>
    </div>
  );
}

export default function (props: ProductHeaderProps) {
  const { setOpen } = useProductEditorSheet();
  const { product } = useLoaderData<typeof clientLoader>();

  return <ProductHeaderView {...props} onEdit={() => setOpen(true, product)}/>
}