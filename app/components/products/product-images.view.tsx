import { cn } from "~/lib/utils";
import { ImageOff } from "lucide-react";
import { useProductImages } from "./product-images.controller";

type ProductImagesProps = {
    images: AppImage[];
};

export function ProductImages({ images }: ProductImagesProps) {
    const { activeImage, activeIndex, goTo } = useProductImages(images);

    if (!images.length) {
        return (
            <div className="flex items-center justify-center w-full h-52 rounded-lg bg-muted border border-dashed border-border text-muted-foreground gap-2 flex-col">
                <ImageOff className="w-7 h-7" />
                <span className="text-xs">No images</span>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {/* Main image */}
            <div className="w-full h-56 rounded-lg overflow-hidden bg-muted border border-border">
                <img
                    src={activeImage?.url}
                    alt="Product"
                    className="w-full h-full object-cover transition-opacity duration-200"
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                    {images.map((img, i) => (
                        <button
                            key={img.id}
                            onClick={() => goTo(i)}
                            className={cn(
                                "w-12 h-12 rounded-md overflow-hidden border-2 transition-colors",
                                i === activeIndex
                                    ? "border-primary"
                                    : "border-transparent hover:border-muted-foreground/30"
                            )}
                        >
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}