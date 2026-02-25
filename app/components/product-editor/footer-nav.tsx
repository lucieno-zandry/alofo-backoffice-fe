import { Button } from "~/components/ui/button";
import { AlertCircle, ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";
import type { EditorMode } from "./product-editor.controller";
import { useMemo } from "react";

type FooterNavViewProps = {
    step: number;
    canGoNext: boolean;
    canSubmit: boolean;
    goPrev: () => void;
    goNext: () => void;
    submit: () => void;
    isSubmitting: boolean;
    submitError?: string;
    mode: EditorMode;
    buttonText: string;
}

type FooterNavProps = Omit<FooterNavViewProps, 'buttonText'>

export function FooterNavView({ step, canGoNext, canSubmit, goPrev, goNext, submit, isSubmitting, submitError, mode, buttonText }: FooterNavViewProps) {
    return (
        <footer className="shrink-0 border-t border-border px-6 py-3 flex items-center justify-between gap-4 bg-background">
            {submitError ? (
                <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {submitError}
                </div>
            ) : (
                <div />
            )}

            <div className="flex items-center gap-2 ml-auto">
                {step > 1 && (
                    <Button variant="outline" onClick={goPrev} className="gap-1.5">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                )}

                {step < 3 && (
                    <Button onClick={goNext} disabled={!canGoNext} className="gap-1.5">
                        Continue
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                )}

                {step === 3 && (
                    <Button onClick={submit} disabled={!canSubmit || isSubmitting} className="gap-2">
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {buttonText}
                    </Button>
                )}
            </div>
        </footer>
    );
}

export default function (props: FooterNavProps) {

    const buttonText = useMemo(() => {
        if (props.isSubmitting) {
            if (props.mode === 'edit') {
                return "Updating...";
            }

            return "Creating...";
        }

        if (props.mode === 'edit')
            return 'Update Product';

        return 'Create product';
    }, [props.mode, props.isSubmitting]);

    return <FooterNavView {...props} buttonText={buttonText} />
}
