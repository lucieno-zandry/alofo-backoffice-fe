import { MousePointerClick } from "lucide-react";

export default function () {
    return null;
    return <div className="hidden md:flex flex-1 items-center justify-center flex-col gap-3 text-muted-foreground">
        <MousePointerClick className="w-10 h-10" />
        <p className="text-sm">Select a product to see its details</p>
    </div>
}