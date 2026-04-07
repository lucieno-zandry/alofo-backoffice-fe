import { ImagePlus, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import type { FieldErrors, FormVariant, FormVariantGroup } from "../../types/product-form-types";
import { FieldError } from "./form-error-banner";

type Props = {
    variant: FormVariant;
    variantIndex: number;
    variantGroups: FormVariantGroup[];
    fieldErrors: FieldErrors;
    onRemove: () => void;
    onFieldChange: (field: keyof FormVariant, value: any) => void;
    onImageChange: (file: File | null) => void;
};

function getOptionLabel(optKey: string, groups: FormVariantGroup[]): string {
    for (const g of groups) {
        const opt = g.options.find((o) => o._key === optKey);
        if (opt) return `${g.name}: ${opt.value}`;
    }
    return optKey;
}

export function VariantRow({
    variant,
    variantIndex,
    variantGroups,
    fieldErrors,
    onRemove,
    onFieldChange,
    onImageChange,
}: Props) {
    const [expanded, setExpanded] = useState(false);
    const prefix = `variants.${variantIndex}`;

    const imagePreview = variant.image
        ? URL.createObjectURL(variant.image)
        : variant.existing_image_url ?? null;

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        onImageChange(file);
        e.target.value = "";
    }

    function handleRemoveImage() {
        onImageChange(null);
        onFieldChange("existing_image_url", null);
    }

    const optionLabels = variant.option_refs
        .map((k) => getOptionLabel(k, variantGroups))
        .filter(Boolean);

    return (
        <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
            {/* Primary row */}
            <div className="flex items-center gap-3 p-3">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-border overflow-hidden bg-muted flex items-center justify-center relative group">
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Variant" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </>
                    ) : (
                        <label htmlFor={`variant-img-${variant._key}`} className="cursor-pointer flex flex-col items-center">
                            <ImagePlus className="w-4 h-4 text-muted-foreground" />
                            <input
                                id={`variant-img-${variant._key}`}
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}
                </div>

                {/* SKU */}
                <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap gap-1 mb-1">
                        {optionLabels.map((label) => (
                            <Badge key={label} variant="outline" className="text-[10px] py-0 px-1.5 font-normal">
                                {label}
                            </Badge>
                        ))}
                    </div>
                    <Input
                        value={variant.sku}
                        onChange={(e) => onFieldChange("sku", e.target.value)}
                        placeholder="SKU-001"
                        className={cn("h-8 font-mono text-sm", fieldErrors[`${prefix}.sku`] ? "border-destructive" : "")}
                    />
                    <FieldError errors={fieldErrors[`${prefix}.sku`] ? [fieldErrors[`${prefix}.sku`] as unknown as string] : undefined} />
                </div>

                {/* Price */}
                <div className="w-24 space-y-1">
                    <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Price</Label>
                    <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.price}
                            onChange={(e) => onFieldChange("price", e.target.value)}
                            placeholder="0.00"
                            className={cn("h-8 pl-5 text-sm", fieldErrors[`${prefix}.price`] ? "border-destructive" : "")}
                        />
                    </div>
                </div>

                {/* Stock */}
                <div className="w-20 space-y-1">
                    <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Stock</Label>
                    <Input
                        type="number"
                        min="0"
                        value={variant.stock}
                        onChange={(e) => onFieldChange("stock", e.target.value)}
                        placeholder="0"
                        className={cn("h-8 text-sm", fieldErrors[`${prefix}.stock`] ? "border-destructive" : "")}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 self-end mb-0.5">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                        onClick={() => setExpanded((p) => !p)}
                        title={expanded ? "Collapse dimensions" : "Expand dimensions & shipping"}
                    >
                        {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={onRemove}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            {/* Expanded: dimensions & weight */}
            {expanded && (
                <div className="border-t border-border bg-muted/30 p-3">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                        Shipping & Dimensions
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(
                            [
                                { field: "weight_kg", label: "Weight", unit: "kg", placeholder: "0.00" },
                                { field: "length_cm", label: "Length", unit: "cm", placeholder: "0.0" },
                                { field: "width_cm", label: "Width", unit: "cm", placeholder: "0.0" },
                                { field: "height_cm", label: "Height", unit: "cm", placeholder: "0.0" },
                            ] as const
                        ).map(({ field, label, unit, placeholder }) => (
                            <div key={field} className="space-y-1">
                                <Label className="text-[10px] text-muted-foreground">
                                    {label}
                                </Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={(variant as any)[field] ?? ""}
                                        onChange={(e) => onFieldChange(field, e.target.value)}
                                        placeholder={placeholder}
                                        className={cn(
                                            "h-8 pr-8 text-sm",
                                            fieldErrors[`${prefix}.${field}`] ? "border-destructive" : ""
                                        )}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs pointer-events-none">
                                        {unit}
                                    </span>
                                </div>
                                <FieldError errors={fieldErrors[`${prefix}.${field}`] ? [fieldErrors[`${prefix}.${field}`] as unknown as string] : undefined} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}