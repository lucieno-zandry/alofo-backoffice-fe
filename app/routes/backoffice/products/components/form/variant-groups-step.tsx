import { Plus, Layers } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useProductFormStore } from "../../stores/use-product-form-store";
import { VariantGroupCard } from "./variant-group-card";


export function VariantGroupsStep() {
    const {
        variant_groups,
        fieldErrors,
        addVariantGroup,
        removeVariantGroup,
        setGroupName,
        addOption,
        removeOption,
        setOptionValue,
    } = useProductFormStore();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold">Variant Groups</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Define attribute groups like "Color" or "Size", then list their values.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={addVariantGroup}
                >
                    <Plus className="h-3.5 w-3.5" />
                    Add group
                </Button>
            </div>

            {variant_groups.length === 0 ? (
                <button
                    type="button"
                    onClick={addVariantGroup}
                    className="w-full border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-muted/20 transition-all group"
                >
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Layers className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            No variant groups yet
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                            Click to add your first group (e.g., Color, Size)
                        </p>
                    </div>
                </button>
            ) : (
                <div className="space-y-3">
                    {variant_groups.map((group, gi) => (
                        <VariantGroupCard
                            key={group._key}
                            group={group}
                            groupIndex={gi}
                            fieldErrors={fieldErrors}
                            onRemoveGroup={() => removeVariantGroup(group._key)}
                            onNameChange={(name) => setGroupName(group._key, name)}
                            onAddOption={() => addOption(group._key)}
                            onRemoveOption={(optKey) => removeOption(group._key, optKey)}
                            onOptionValueChange={(optKey, value) => setOptionValue(group._key, optKey, value)}
                        />
                    ))}
                </div>
            )}

            {/* Summary */}
            {variant_groups.length > 0 && (
                <div className="rounded-lg bg-muted/40 border border-border px-4 py-3 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                        {variant_groups.reduce((acc, g) => acc * Math.max(g.options.filter((o) => o.value.trim()).length, 1), 1)}
                    </span>{" "}
                    possible variant combinations from your current groups.
                </div>
            )}
        </div>
    );
}