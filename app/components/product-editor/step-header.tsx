export function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="mb-8">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
    );
}
