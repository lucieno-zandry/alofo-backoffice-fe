import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Loader2, Globe } from 'lucide-react';
import { defaultRateValues } from '~/lib/shipping-methods-helpers';
import { useShippingMethodsStore } from '~/hooks/use-shipping-methods-store';

// ── Types ─────────────────────────────────────────────────────────────────────

type RateFormValues = typeof defaultRateValues;

interface ShippingRateFormProps {
    open: boolean;
    mode: 'create' | 'edit' | null;
    initialValues: RateFormValues | null;
    submitting: boolean;
    onSubmit: (data: RateFormValues) => void;
    onClose: () => void;
}

// ── Dumb component ────────────────────────────────────────────────────────────

export function ShippingRateForm({
    open,
    mode,
    initialValues,
    submitting,
    onSubmit,
    onClose,
}: ShippingRateFormProps) {
    const [values, setValues] = useState<RateFormValues>(defaultRateValues);

    useEffect(() => {
        if (open) {
            setValues(initialValues ?? defaultRateValues);
        }
    }, [open, initialValues]);

    const set = <K extends keyof RateFormValues>(key: K, value: RateFormValues[K]) =>
        setValues((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(values);
    };

    const isWildcard = values.country_code === '*';

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'edit' ? 'Edit Shipping Rate' : 'New Shipping Rate'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* Country code */}
                    <div className="space-y-1.5">
                        <Label htmlFor="sr-country">
                            Country Code <span className="text-destructive">*</span>
                        </Label>
                        <div className="flex gap-2 items-center">
                            <Input
                                id="sr-country"
                                value={values.country_code}
                                onChange={(e) => set('country_code', e.target.value.toUpperCase())}
                                placeholder="e.g. US or *"
                                maxLength={2}
                                className="uppercase w-28"
                                required
                            />
                            <Button
                                type="button"
                                variant={isWildcard ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => set('country_code', isWildcard ? '' : '*')}
                                className="gap-1.5"
                            >
                                <Globe className="h-3.5 w-3.5" />
                                Worldwide (*)
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Use <code className="bg-muted px-1 rounded">*</code> as a catch-all default rate.
                        </p>
                    </div>

                    {/* City pattern */}
                    <div className="space-y-1.5">
                        <Label htmlFor="sr-city">City Pattern <span className="text-xs text-muted-foreground">(optional regex/glob)</span></Label>
                        <Input
                            id="sr-city"
                            value={values.city_pattern ?? ''}
                            onChange={(e) => set('city_pattern', e.target.value || '')}
                            placeholder="e.g. New York or New.*"
                        />
                    </div>

                    {/* Weight bracket */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="sr-min-w">Min Weight (kg)</Label>
                            <Input
                                id="sr-min-w"
                                type="number"
                                min="0"
                                step="0.001"
                                value={values.min_weight_kg ?? ''}
                                onChange={(e) => set('min_weight_kg', e.target.value ? parseFloat(e.target.value) : null)}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sr-max-w">Max Weight (kg)</Label>
                            <Input
                                id="sr-max-w"
                                type="number"
                                min="0"
                                step="0.001"
                                value={values.max_weight_kg ?? ''}
                                onChange={(e) => set('max_weight_kg', e.target.value ? parseFloat(e.target.value) : null)}
                                placeholder="∞"
                            />
                        </div>
                    </div>

                    {/* Rates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="sr-rate">Base Rate ($) <span className="text-destructive">*</span></Label>
                            <Input
                                id="sr-rate"
                                type="number"
                                min="0"
                                step="0.01"
                                value={values.rate}
                                onChange={(e) => set('rate', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sr-rate-kg">Extra per kg ($)</Label>
                            <Input
                                id="sr-rate-kg"
                                type="number"
                                min="0"
                                step="0.01"
                                value={values.rate_per_kg ?? ''}
                                onChange={(e) => set('rate_per_kg', e.target.value ? parseFloat(e.target.value) : null)}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose} disabled={submitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {mode === 'edit' ? 'Save Changes' : 'Add Rate'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// ── Smart component ───────────────────────────────────────────────────────────

export function ShippingRateFormContainer() {
    const {
        rateDialog,
        selectedRate,
        submitting,
        submitRate,
        closeRateDialog,
    } = useShippingMethodsStore();

    const initialValues = selectedRate
        ? {
            country_code: selectedRate.country_code,
            city_pattern: selectedRate.city_pattern ?? '',
            min_weight_kg: selectedRate.min_weight_kg ?? null,
            max_weight_kg: selectedRate.max_weight_kg ?? null,
            rate: selectedRate.rate,
            rate_per_kg: selectedRate.rate_per_kg ?? null,
        }
        : null;

    return (
        <ShippingRateForm
            open={rateDialog === 'create' || rateDialog === 'edit'}
            mode={rateDialog}
            initialValues={initialValues}
            submitting={submitting}
            onSubmit={submitRate}
            onClose={closeRateDialog}
        />
    );
}