import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';
import { LANDING_ABLE_TYPE_OPTIONS } from '../../types/landing-block-form-types';
import { useLandingBlockFormStore } from '../../stores/use-landing-block-form-store';
import type { LandingBlockFormData } from '../../types/landing-block-form-types';
import { Layers } from 'lucide-react';

// ── Dumb View ─────────────────────────────────────────────────────────────────

type RelationFieldsViewProps = {
    formData: LandingBlockFormData;
    errors: Record<string, string>;
    onChange: (field: keyof LandingBlockFormData, value: any) => void;
};

export function RelationFieldsView({ formData, errors, onChange }: RelationFieldsViewProps) {
    const showIdField = formData.landing_able_type !== '';

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-semibold mb-0.5">Linked entity</h3>
                <p className="text-xs text-muted-foreground">
                    Optionally link this block to a product, category, variant, or image.
                </p>
            </div>

            {/* Entity type */}
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Entity type</Label>
                <Select
                    value={formData.landing_able_type}
                    onValueChange={(val) => {
                        onChange('landing_able_type', val);
                        if (!val) onChange('landing_able_id', '');
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select an entity type…" />
                    </SelectTrigger>
                    <SelectContent>
                        {LANDING_ABLE_TYPE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.landing_able_type && (
                    <p className="text-xs text-destructive">{errors.landing_able_type}</p>
                )}
            </div>

            {/* Entity ID – only shown when a type is selected */}
            {showIdField && (
                <div className="space-y-1.5">
                    <Label htmlFor="block-able-id" className="text-xs font-medium">
                        Entity ID
                    </Label>
                    <Input
                        id="block-able-id"
                        type="number"
                        value={formData.landing_able_id === '' ? '' : formData.landing_able_id}
                        onChange={(e) =>
                            onChange('landing_able_id', e.target.value === '' ? '' : Number(e.target.value))
                        }
                        placeholder="e.g., 12"
                        min={1}
                        className={errors.landing_able_id ? 'border-destructive' : ''}
                    />
                    {errors.landing_able_id && (
                        <p className="text-xs text-destructive">{errors.landing_able_id}</p>
                    )}
                </div>
            )}

            {/* Hint */}
            {!formData.landing_able_type && (
                <div className="flex items-start gap-2.5 rounded-xl bg-muted/30 border border-dashed border-border/60 p-3">
                    <Layers className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Linking is optional. When linked, the block will render contextual data
                        from the selected entity (images, prices, descriptions, etc.).
                    </p>
                </div>
            )}
        </div>
    );
}

// ── Smart Component ───────────────────────────────────────────────────────────

type RelationFieldsProps = {
    errors?: Record<string, string>;
};

export function RelationFields({ errors = {} }: RelationFieldsProps) {
    const { formData, setFormData } = useLandingBlockFormStore();

    return (
        <RelationFieldsView
            formData={formData}
            errors={errors}
            onChange={(field, value) => setFormData({ [field]: value })}
        />
    );
}