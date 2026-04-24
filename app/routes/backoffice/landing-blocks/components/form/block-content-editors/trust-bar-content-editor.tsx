import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Plus, Trash2, GripVertical } from "lucide-react";

// List of allowed Lucide icons (you can expand)
const AVAILABLE_ICONS = [
    "Sprout", "Award", "PackageCheck", "ShieldCheck", "Truck", "CreditCard",
    "HeartHandshake", "Leaf", "Recycle", "Star", "Lock", "Clock"
];

interface TrustPillar {
    id: string;
    title: string;
    description: string;
    icon: string;
}

interface TrustBarContentEditorProps {
    value: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
}

export function TrustBarContentEditor({ value, onChange }: TrustBarContentEditorProps) {
    const pillars: TrustPillar[] = value.pillars ?? [
        // Default empty pillar as example
        { id: "1", title: "", description: "", icon: "Sprout" }
    ];

    const updatePillars = (newPillars: TrustPillar[]) => {
        onChange({ ...value, pillars: newPillars });
    };

    const addPillar = () => {
        const newId = String(Date.now());
        updatePillars([...pillars, { id: newId, title: "", description: "", icon: AVAILABLE_ICONS[0] }]);
    };

    const removePillar = (index: number) => {
        const updated = [...pillars];
        updated.splice(index, 1);
        updatePillars(updated);
    };

    const updatePillar = (index: number, field: keyof TrustPillar, newValue: string) => {
        const updated = [...pillars];
        updated[index] = { ...updated[index], [field]: newValue };
        updatePillars(updated);
    };

    return (
        <div className="space-y-4 border rounded-md p-4 bg-muted/10">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Trust pillars (max 4 recommended)</Label>
                <Button type="button" size="sm" variant="outline" onClick={addPillar}>
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add pillar
                </Button>
            </div>

            {pillars.map((pillar, idx) => (
                <div key={pillar.id} className="border rounded-lg p-3 space-y-3 bg-background">
                    <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        <span className="text-xs font-medium text-muted-foreground">Pillar {idx + 1}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="ml-auto h-6 w-6 text-destructive"
                            onClick={() => removePillar(idx)}
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                    <div className="grid gap-3">
                        <div>
                            <Label className="text-xs">Title</Label>
                            <Input
                                value={pillar.title}
                                onChange={(e) => updatePillar(idx, "title", e.target.value)}
                                placeholder="e.g., Organic Ingredients"
                            />
                        </div>
                        <div>
                            <Label className="text-xs">Description</Label>
                            <Input
                                value={pillar.description}
                                onChange={(e) => updatePillar(idx, "description", e.target.value)}
                                placeholder="e.g., 100% certified organic vanilla"
                            />
                        </div>
                        <div>
                            <Label className="text-xs">Icon</Label>
                            <Select
                                value={pillar.icon}
                                onValueChange={(val) => updatePillar(idx, "icon", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select icon" />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_ICONS.map((iconName) => (
                                        <SelectItem key={iconName} value={iconName}>
                                            {iconName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            ))}

            {pillars.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">
                    No pillars yet. Click "Add pillar" to start.
                </p>
            )}
        </div>
    );
}