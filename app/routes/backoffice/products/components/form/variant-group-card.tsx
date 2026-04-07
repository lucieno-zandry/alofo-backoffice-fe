import { Plus, Trash2, X, GripVertical } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";

import { cn } from "~/lib/utils";
import type { FieldErrors, FormVariantGroup } from "../../types/product-form-types";
import { FieldError } from "./form-error-banner";

type Props = {
    group: FormVariantGroup;
    groupIndex: number;
    fieldErrors: FieldErrors;
    onRemoveGroup: () => void;
    onNameChange: (name: string) => void;
    onAddOption: () => void;
    onRemoveOption: (optionKey: string) => void;
    onOptionValueChange: (optionKey: string, value: string) => void;
};

export function VariantGroupCard({
    group,
    groupIndex,
    fieldErrors,
    onRemoveGroup,
    onNameChange,
    onAddOption,
    onRemoveOption,
    onOptionValueChange,
}: Props) {
    const nameError = fieldErrors[`variant_groups.${groupIndex}.name`];
    const hasOptions = group.options.length > 0;

    return (
        <div className="border border-border rounded-xl p-4 space-y-4 bg-card shadow-sm">
            {/* Group header */}
            <div className="flex items-start gap-3">
                <GripVertical className="h-4 w-4 text-muted-foreground mt-2.5 flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                    <Label htmlFor={`group-${group._key}`} className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">
                        Group {groupIndex + 1} Name
                    </Label>
                    <Input
                        id={`group-${group._key}`}
                        value={group.name}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="e.g. Color, Size, Material…"
                        className={cn("h-9", nameError ? "border-destructive" : "")}
                    />
                    <FieldError errors={nameError ? nameError : undefined} />
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 mt-5"
                    onClick={onRemoveGroup}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>

            {/* Options */}
            <div className="pl-7 space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground">
                        Options{" "}
                        {hasOptions && (
                            <span className="text-foreground">({group.options.length})</span>
                        )}
                    </p>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs gap-1"
                        onClick={onAddOption}
                    >
                        <Plus className="h-3 w-3" />
                        Add option
                    </Button>
                </div>

                {!hasOptions && (
                    <p className="text-xs text-muted-foreground/70 italic">
                        No options yet. Add values like "Red", "L", "Cotton"…
                    </p>
                )}

                {/* Option chips */}
                <div className="flex flex-wrap gap-2">
                    {group.options.map((opt, oi) => {
                        const optError = fieldErrors[`variant_groups.${groupIndex}.options.${oi}.value`];
                        return (
                            <div key={opt._key} className="flex items-center gap-1">
                                <div className={cn("flex items-center border rounded-lg overflow-hidden h-8", optError ? "border-destructive" : "border-border")}>
                                    <input
                                        value={opt.value}
                                        onChange={(e) => onOptionValueChange(opt._key, e.target.value)}
                                        placeholder={`Option ${oi + 1}`}
                                        className="px-2.5 text-sm bg-transparent outline-none w-24 h-full placeholder:text-muted-foreground/50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onRemoveOption(opt._key)}
                                        className="px-1.5 h-full flex items-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Option count badge */}
                {hasOptions && (
                    <div className="flex flex-wrap gap-1 pt-1">
                        {group.options.filter(o => o.value.trim()).map((opt) => (
                            <Badge key={opt._key} variant="secondary" className="text-[10px] py-0">
                                {opt.value}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}