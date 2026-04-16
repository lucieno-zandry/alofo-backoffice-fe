import { Skeleton } from "../ui/skeleton";

export default function () {
    return (
        <div className="p-6 space-y-6 bg-background/80 rounded-2xl">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-8 w-24" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
            </div>
            <Skeleton className="h-40 rounded-xl" />
        </div>
    );
}