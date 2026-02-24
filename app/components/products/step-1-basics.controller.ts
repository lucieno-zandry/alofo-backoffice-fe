import { useCallback, useEffect, useState } from "react";
import { useCategoryStore } from "~/hooks/use-category-store";

export function useStep1Basics(
    title: string,
    slug: string,
    images: File[],
    onTitleChange: (t: string) => void,
    onSlugChange: (s: string) => void,
    onImagesChange: (files: File[]) => void
) {
    const [slugEdited, setSlugEdited] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const { categories } = useCategoryStore();

    // When title changes and user hasn't manually edited slug, auto-derive it
    const handleTitleChange = useCallback(
        (value: string) => {
            onTitleChange(value);
            if (!slugEdited) {
                const auto = value
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                onSlugChange(auto);
            }
        },
        [slugEdited, onTitleChange, onSlugChange]
    );

    const handleSlugChange = useCallback(
        (value: string) => {
            setSlugEdited(true);
            // Sanitize slug: lowercase, hyphens only
            const clean = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
            onSlugChange(clean);
        },
        [onSlugChange]
    );

    const handleImageFiles = useCallback(
        (files: FileList | null) => {
            if (!files) return;
            const incoming = Array.from(files).slice(0, 4 - images.length);
            onImagesChange([...images, ...incoming].slice(0, 4));
        },
        [images, onImagesChange]
    );

    const removeImage = useCallback(
        (index: number) => {
            onImagesChange(images.filter((_, i) => i !== index));
        },
        [images, onImagesChange]
    );

    // Build object URLs for preview
    useEffect(() => {
        const urls = images.map((f) => URL.createObjectURL(f));
        setImagePreviews(urls);
        return () => urls.forEach(URL.revokeObjectURL);
    }, [images]);

    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    return {
        categories,
        imagePreviews,
        handleTitleChange,
        handleSlugChange,
        handleImageFiles,
        removeImage,
        slugEdited,
        isDragging,
        handleDrop,
        handleDragOver,
        handleDragEnter,
        handleDragLeave
    };
}