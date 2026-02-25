import { useState } from "react";

export function useProductImages(images: AppImage[]) {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeImage = images[activeIndex] ?? null;

    const goTo = (index: number) => setActiveIndex(index);

    return { activeImage, activeIndex, goTo };
}