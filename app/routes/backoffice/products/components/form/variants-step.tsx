import { Wand2, Plus, PackageSearch } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useProductFormStore } from "../../stores/use-product-form-store";
import { VariantRow } from "./variant-row";

export function VariantsStep() {
    const {
        variants,
        variant_groups,
        fieldErrors,
        generateVariants,
        addVariant,
        removeVariant,
        setVariantField,
        setVariantImage,
    } = useProductFormStore();

    const hasGroups = variant_groups.some(
        (g) => g.options.filter((o) => o.value.trim()).length > 0
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                    <h3 className="text-sm font-semibold">Variants</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Manage SKUs, pricing, stock, images and dimensions.
                    </p>
                </div>
                <div className="flex gap-2">
                    {hasGroups && (
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="gap-1.5 text-xs"
                            onClick={generateVariants}
                        >
                            <Wand2 className="h-3.5 w-3.5" />
                            Generate from groups
                        </Button>
                    )}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={addVariant}
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Add manually
                    </Button>
                </div>
            </div>

            {variants.length === 0 ? (
                <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <PackageSearch className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">No variants yet</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                            {hasGroups
                                ? 'Click "Generate from groups" or add manually'
                                : 'Add a variant manually or define variant groups first'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    {variants.map((variant, vi) => (
                        <VariantRow
                            key={variant._key}
                            variant={variant}
                            variantIndex={vi}
                            variantGroups={variant_groups}
                            fieldErrors={fieldErrors}
                            onRemove={() => removeVariant(variant._key)}
                            onFieldChange={(field, value) => setVariantField(variant._key, field, value)}
                            onImageChange={(file) => setVariantImage(variant._key, file)}
                        />
                    ))}
                </div>
            )}

            {/* Summary footer */}
            {variants.length > 0 && (
                <div className="rounded-lg border border-border px-4 py-2.5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                        <span className="font-semibold text-foreground">{variants.length}</span> variant
                        {variants.length !== 1 ? "s" : ""}
                    </span>
                    <span>
                        Total stock:{" "}
                        <span className="font-semibold text-foreground">
                            {variants.reduce((sum, v) => sum + (parseInt(v.stock) || 0), 0)}
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
}