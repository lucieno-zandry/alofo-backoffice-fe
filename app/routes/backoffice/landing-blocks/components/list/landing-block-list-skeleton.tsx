import { Skeleton } from '~/components/ui/skeleton';

export function LandingBlockListSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-stretch gap-0 rounded-xl border bg-card h-[76px] overflow-hidden"
                >
                    <Skeleton className="w-10 rounded-l-xl rounded-r-none" />
                    <Skeleton className="w-16 rounded-none" />
                    <div className="flex-1 flex flex-col justify-center px-4 py-3 gap-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                    <div className="flex items-center gap-2 px-3">
                        <Skeleton className="h-5 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
}