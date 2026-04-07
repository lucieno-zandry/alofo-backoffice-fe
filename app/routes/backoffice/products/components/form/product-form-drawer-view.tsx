import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight, Save } from "lucide-react";
import type { ProductFormStep } from "../../types/product-form-types";
import { FormErrorBanner } from "./form-error-banner";
import { StepIndicator } from "./step-indicator";


type Props = {
    open: boolean;
    isEditMode: boolean;
    step: ProductFormStep;
    globalError: string | null;
    submitting: boolean;

    children: React.ReactNode; // step content

    onClose: () => void;
    onBack: () => void;
    onNext: () => void;
    onSubmit: () => void;
    onStepNavigate: (step: number) => void;
};

const STEP_LABELS: Record<ProductFormStep, string> = {
    1: "Basic Info",
    2: "Variant Groups",
    3: "Variants",
};

export function ProductFormDrawerView({
    open,
    isEditMode,
    step,
    globalError,
    submitting,
    children,
    onClose,
    onBack,
    onNext,
    onSubmit,
    onStepNavigate,
}: Props) {
    const isFirstStep = step === 1;
    const isLastStep = step === 3;

    return (
        <Sheet open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-2xl flex flex-col p-0 gap-0"
                // prevent close on overlay click while submitting
                onPointerDownOutside={submitting ? (e) => e.preventDefault() : undefined}
            >
                {/* Header */}
                <SheetHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
                    <SheetTitle className="text-lg font-bold">
                        {isEditMode ? "Edit Product" : "New Product"}
                    </SheetTitle>
                    <SheetDescription className="text-sm">
                        Step {step} of 3 — {STEP_LABELS[step]}
                    </SheetDescription>
                </SheetHeader>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 min-h-0">
                    <StepIndicator current={step} onNavigate={onStepNavigate} />
                    <FormErrorBanner message={globalError} />
                    {children}
                </div>

                {/* Footer actions */}
                <div className="border-t border-border px-6 py-4 flex-shrink-0 flex items-center justify-between gap-3 bg-background">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={isFirstStep ? onClose : onBack}
                        disabled={submitting}
                        className="gap-1.5"
                    >
                        {!isFirstStep && <ArrowLeft className="h-3.5 w-3.5" />}
                        {isFirstStep ? "Cancel" : "Back"}
                    </Button>

                    {isLastStep ? (
                        <Button
                            type="button"
                            size="sm"
                            onClick={onSubmit}
                            disabled={submitting}
                            className="gap-1.5 min-w-28"
                        >
                            {submitting ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Save className="h-3.5 w-3.5" />
                            )}
                            {submitting ? "Saving…" : isEditMode ? "Save changes" : "Create product"}
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            size="sm"
                            onClick={onNext}
                            disabled={submitting}
                            className="gap-1.5"
                        >
                            Continue
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}