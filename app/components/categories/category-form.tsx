import { useCategoryStore } from "~/hooks/use-category-store";

export function CategoryForm({ initialData, onSubmit, onCancel }: any) {
    const categories = useCategoryStore(state => state.categories);

    return (
        <form onSubmit={onSubmit} className="flex flex-col h-full">
            <div className="flex-1 space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Category Title</label>
                    <input
                        name="title"
                        defaultValue={initialData?.title}
                        placeholder="e.g. Mechanical Keyboards"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        required
                    />
                </div>

                {/* Parent Selection */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Parent Category (Optional)</label>
                    <select
                        name="parent_id"
                        defaultValue={initialData?.parent_id ?? ""}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
                    >
                        <option value="">None (Top Level)</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                    <p className="text-[10px] text-zinc-500 italic">Leave empty to create a root category.</p>
                </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-white/5 flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-zinc-400 hover:bg-white/5 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all"
                >
                    {initialData ? 'Update Category' : 'Create Category'}
                </button>
            </div>
        </form>
    );
}