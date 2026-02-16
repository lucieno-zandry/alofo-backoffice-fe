export function CategoryPageHeader() {
    return (
        <div className="flex flex-col gap-1 mb-8 px-2">
            <h1 className="text-3xl font-black text-white tracking-tight">
                Categories
            </h1>
            <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <p className="text-sm text-zinc-400 font-medium">
                    Manage your product taxonomy and hierarchy
                </p>
            </div>
        </div>
    );
}