import { Skeleton } from "~/components/ui/skeleton"

export default function TransactionSkeleton() {
    // Define some width variations for text lines
    const lineWidths = ["w-full", "w-3/4", "w-2/3", "w-1/2"]

    return (
        <div className="p-6 bg-background/80 backdrop-blur-md rounded-2xl">
            {/* Header skeleton */}
            <div className="mb-6">
                <Skeleton className="h-8 w-48" />
            </div>

            {/* Grid of cards */}
            <div
                className="grid gap-6 
                   grid-cols-1 
                   sm:grid-cols-2 
                   lg:grid-cols-3 
                   xl:grid-cols-4"
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-lg border p-4 space-y-4"
                    >
                        {/* Title */}
                        <Skeleton className="h-6 w-32" />

                        {/* Varying line lengths */}
                        {lineWidths.map((w, j) => (
                            <Skeleton
                                key={j}
                                className={`h-4 ${w}`}
                            />
                        ))}

                        {/* Content block with varied height */}
                        <Skeleton
                            className={`w-full ${i % 2 === 0 ? "h-24" : "h-32"
                                }`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
