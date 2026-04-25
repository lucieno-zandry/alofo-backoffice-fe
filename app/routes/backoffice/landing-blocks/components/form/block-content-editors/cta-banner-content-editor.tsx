import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface Props {
    value: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
}

export function CtaBannerContentEditor({ value, onChange }: Props) {
    const eyebrow = value.eyebrow ?? "";

    return (
        <div className="space-y-4 border rounded-md p-4 bg-muted/10">
            <div>
                <Label className="text-xs font-medium">Eyebrow (optional)</Label>
                <Input
                    value={eyebrow}
                    onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
                    placeholder="e.g., Ready to taste the difference?"
                />
            </div>
        </div>
    );
}