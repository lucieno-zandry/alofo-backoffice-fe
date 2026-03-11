import { Skeleton } from "~/components/ui/skeleton"

export default function BackofficeSkeleton() {
    const lineWidths = ["w-full", "w-3/4", "w-2/3", "w-1/2"]

    return (
        // Added a slightly more "depth-oriented" background color
        <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-4">
            <div className="flex h-[calc(100vh-2rem)] gap-4">

                {/* --- Sidebar Island --- */}
                <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 
                                 bg-white dark:bg-zinc-900 
                                 rounded-2xl border shadow-sm p-6 gap-8">

                    {/* Brand/Profile Island Header */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="space-y-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Skeleton className="h-5 w-5 rounded-md" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t">
                        <Skeleton className="h-10 w-full rounded-xl" />
                    </div>
                </aside>

                {/* --- Main Content Area --- */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">

                    {/* Floating Header Island */}
                    <header className="h-16 shrink-0 bg-white dark:bg-zinc-900 
                                     rounded-2xl border shadow-sm px-6 
                                     flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="md:hidden">
                                <Skeleton className="h-9 w-9 rounded-lg" />
                            </div>
                            <Skeleton className="h-6 w-40" />
                        </div>

                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-24 hidden sm:block rounded-full" />
                            <Skeleton className="h-9 w-9 rounded-full" />
                        </div>
                    </header>

                    {/* Scrollable Content Island */}
                    <main className="flex-1 bg-white dark:bg-zinc-900 
                                   rounded-2xl border shadow-sm 
                                   p-6 overflow-y-auto">

                        <div className="mb-6">
                            <Skeleton className="h-8 w-48 mb-2" />
                            <Skeleton className="h-4 w-64" />
                        </div>

                        {/* Content grid */}
                        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <article
                                    key={i}
                                    className="rounded-xl border bg-slate-50/50 dark:bg-zinc-800/50 p-4 space-y-4 shadow-sm"
                                >
                                    <Skeleton className="h-5 w-24" />

                                    <div className="space-y-2">
                                        {lineWidths.slice(0, 3).map((w, j) => (
                                            <Skeleton key={j} className={`h-3 ${w}`} />
                                        ))}
                                    </div>

                                    <Skeleton className={`w-full rounded-lg ${i % 3 === 0 ? "h-24" : i % 3 === 1 ? "h-16" : "h-28"}`} />
                                </article>
                            ))}
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}