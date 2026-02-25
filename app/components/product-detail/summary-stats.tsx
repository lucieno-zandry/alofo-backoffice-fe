function StatCard({ value, label }: { value: number; label: string }) {
    return (
        <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        </div>
    );
}

export function SummaryStats({ variants, totalStock, skusOnSale }:
    { variants: number; totalStock: number; skusOnSale: number }) {
    return (
        <div className="grid grid-cols-3 gap-3">
            <StatCard value={variants} label="Variants" />
            <StatCard value={totalStock} label="Units" />
            <StatCard value={skusOnSale} label="On Sale" />
        </div>
    );
}
