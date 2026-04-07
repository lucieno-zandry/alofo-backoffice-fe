import { Skeleton } from "~/components/ui/skeleton";

export const ProductListSkeleton = () => (
    <div className="space-y-6">
        <div className="rounded-xl border bg-card overflow-hidden divide-y divide-border shadow-sm flex flex-col">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <Skeleton className="h-12 w-12 rounded-md shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20 rounded-sm" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);