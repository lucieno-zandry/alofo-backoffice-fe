import { Tag } from "lucide-react";
import formatPrice from "~/lib/format-price";

export function PriceRange({ priceRange }: { priceRange: { min: number; max: number; isSingle: boolean } | null }) {
    if (!priceRange) return null;

    return (
        <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold">
                {priceRange.isSingle
                    ? formatPrice(priceRange.min)
                    : `${formatPrice(priceRange.min)} – ${formatPrice(priceRange.max)}`}
            </span>
        </div>
    );
}
