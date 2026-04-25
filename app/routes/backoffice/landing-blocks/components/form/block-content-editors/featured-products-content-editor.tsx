import { ProductPicker } from "~/components/product-picker";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface Props {
    value: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
}

export function FeaturedProductsContentEditor({ value, onChange }: Props) {
    const eyebrow = value.eyebrow ?? "";
    const productIds: number[] = value.product_ids ?? [];

    return (
        <div className="space-y-4 border rounded-md p-4 bg-muted/10">
            <div>
                <Label className="text-xs font-medium">
                    Eyebrow (optional)
                </Label>

                <Input
                    value={eyebrow}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            eyebrow: e.target.value,
                            product_ids: productIds,
                        })
                    }
                    placeholder="e.g., Hand-picked for you"
                />
            </div>

            <ProductPicker
                value={productIds}
                onChange={(ids) =>
                    onChange({
                        ...value,
                        eyebrow,
                        product_ids: ids,
                    })
                }
            />
        </div>
    );
}