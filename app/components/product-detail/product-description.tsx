export function ProductDescription({ description }: { description?: string }) {
    if (!description) return null;

    return (
        <div>
            <h3 className="text-sm font-semibold mb-1">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}