import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface HeroContentEditorProps {
    value: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
}

export function HeroContentEditor({ value, onChange }: HeroContentEditorProps) {
    const setField = (field: string, val: any) => {
        onChange({ ...value, [field]: val });
    };

    return (
        <div className="space-y-4 border rounded-md p-4 bg-muted/10">
            <div>
                <Label className="text-xs font-medium">Eyebrow text</Label>
                <Input
                    value={value.eyebrow}
                    onChange={(e) => setField("eyebrow", e.target.value)}
                    placeholder="e.g., Directly from SAVA, Madagascar"
                />
            </div>
            <div>
                <Label className="text-xs font-medium">Headline suffix (after {"<em>"})</Label>
                <Input
                    value={value.headlineSuffix}
                    onChange={(e) => setField("headlineSuffix", e.target.value)}
                    placeholder="e.g., Uncompromised."
                />
            </div>
            <div>
                <Label className="text-xs font-medium">Trust line</Label>
                <Input
                    value={value.trustLine}
                    onChange={(e) => setField("trustLine", e.target.value)}
                    placeholder="Trust & safety text"
                />
            </div>
        </div>
    );
}