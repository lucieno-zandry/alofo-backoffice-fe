import { Separator } from "~/components/ui/separator";
import { StepIndicator } from "~/components/product-editor/step-indicator-view";
import type { Step } from "./product-editor.controller";

export function TopBar({ step, step1Valid, step2Valid, onGoTo }: {
    step: Step;
    step1Valid: boolean;
    step2Valid: boolean;
    onGoTo: (step: Step) => void;
}) {
    return (
        <header className="flex items-center gap-4 px-6 py-3 border-b border-border shrink-0">
            <Separator orientation="vertical" className="h-5" />
            <StepIndicator
                current={step}
                step1Valid={step1Valid}
                step2Valid={step2Valid}
                onGoTo={onGoTo}
            />
        </header>
    );
}
