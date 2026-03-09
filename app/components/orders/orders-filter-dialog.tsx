import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Input } from "~/components/ui/input";
import type { OrdersQueryParams } from "~/types/orders";

export const DEFAULT_MAX_TOTAL = 1000;

export type OrdersFilterDialogViewProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    range: [number, number];
    maxLimit?: number;
    // Explicitly defining the individual change events
    onMinInputChange: (value: string) => void;
    onMaxInputChange: (value: string) => void;
    onSliderChange: (range: [number, number]) => void;
    onApply: () => void;
    onReset: () => void;
};

export function OrdersFilterDialogView({
    open,
    onOpenChange,
    range,
    maxLimit = DEFAULT_MAX_TOTAL,
    onMinInputChange,
    onMaxInputChange,
    onSliderChange,
    onApply,
    onReset,
}: OrdersFilterDialogViewProps) {
    const [min, max] = range;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter Orders</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="space-y-4">
                        <Label>Order Total Range</Label>

                        <div className="flex items-center gap-4">
                            <div className="grid gap-1.5 flex-1">
                                <Label htmlFor="min-price" className="text-xs text-muted-foreground">Min</Label>
                                <Input
                                    id="min-price"
                                    type="number"
                                    min={0}
                                    max={max}
                                    value={min.toString()}
                                    onChange={(e) => onMinInputChange(e.target.value)}
                                    placeholder="Min"
                                />
                            </div>
                            <span className="text-muted-foreground mt-5">—</span>
                            <div className="grid gap-1.5 flex-1">
                                <Label htmlFor="max-price" className="text-xs text-muted-foreground">Max</Label>
                                <Input
                                    id="max-price"
                                    type="number"
                                    min={min}
                                    value={max.toString()}
                                    onChange={(e) => onMaxInputChange(e.target.value)}
                                    placeholder="Max"
                                />
                            </div>
                        </div>

                        <Slider
                            min={0}
                            max={maxLimit}
                            step={10}
                            value={range}
                            onValueChange={(newRange) => onSliderChange(newRange as [number, number])}
                            className="pt-4"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <div className="space-x-2 sm:space-0">
                        <Button variant="outline" onClick={onReset}>
                            Reset
                        </Button>
                        <Button onClick={onApply}>Apply Filters</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export type OrdersFilterDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    searchParams: URLSearchParams;
    updateParams: (updates: Partial<OrdersQueryParams>) => void;
};

export default function OrdersFilterDialog({
    open,
    onOpenChange,
    searchParams,
    updateParams,
}: OrdersFilterDialogProps) {
    const [range, setRange] = useState<[number, number]>([0, DEFAULT_MAX_TOTAL]);

    useEffect(() => {
        if (open) {
            const minParam = searchParams.get("total_min");
            const maxParam = searchParams.get("total_max");

            setRange([
                minParam ? Number(minParam) : 0,
                maxParam ? Number(maxParam) : DEFAULT_MAX_TOTAL,
            ]);
        }
    }, [open, searchParams]);

    // Handlers now live in the container where state is managed
    const handleMinInputChange = (value: string) => {
        const numValue = value === "" ? 0 : Number(value);
        setRange([numValue, range[1]]);
    };

    const handleMaxInputChange = (value: string) => {
        const numValue = value === "" ? 0 : Number(value);
        setRange([range[0], numValue]);
    };

    const handleApply = () => {
        updateParams({
            total_min: range[0] || undefined,
            total_max: range[1] < DEFAULT_MAX_TOTAL ? range[1] : undefined,
        });
        onOpenChange(false);
    };

    const handleReset = () => {
        setRange([0, DEFAULT_MAX_TOTAL]);
        updateParams({
            total_min: undefined,
            total_max: undefined,
        });
        onOpenChange(false);
    };

    return (
        <OrdersFilterDialogView
            open={open}
            onOpenChange={onOpenChange}
            range={range}
            maxLimit={DEFAULT_MAX_TOTAL}
            onMinInputChange={handleMinInputChange}
            onMaxInputChange={handleMaxInputChange}
            onSliderChange={setRange}
            onApply={handleApply}
            onReset={handleReset}
        />
    );
}