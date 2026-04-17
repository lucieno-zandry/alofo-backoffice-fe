type Props = { active: boolean, payload: { value: number }[], label: string, currencySymbol: string }

export default function CustomTooltip({ active, payload, label, currencySymbol }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg text-sm">
            <p className="font-medium text-foreground">{label}</p>
            <p className="text-violet-500 font-mono font-semibold">
                {currencySymbol}{payload[0].value.toLocaleString()}
            </p>
        </div>
    );
}