import { cn } from "~/lib/utils";

type Step = { label: string; description: string };

const STEPS: Step[] = [
    { label: "Details", description: "Basic product info" },
    { label: "Groups", description: "Option groups & values" },
    { label: "Variants", description: "SKUs, pricing & stock" },
];

type Props = {
    current: number;
    onNavigate?: (step: number) => void;
};

export function StepIndicator({ current, onNavigate }: Props) {
    return (
        <nav aria-label="Form steps" className="flex items-center gap-0 mb-6">
            {STEPS.map((step, index) => {
                const stepNum = index + 1;
                const isCompleted = stepNum < current;
                const isActive = stepNum === current;
                const isClickable = onNavigate && stepNum < current;

                return (
                    <div key={stepNum} className="flex items-center flex-1 last:flex-none">
                        <button
                            type="button"
                            disabled={!isClickable}
                            onClick={() => isClickable && onNavigate(stepNum)}
                            className={cn(
                                "flex items-center gap-2.5 group transition-all",
                                isClickable ? "cursor-pointer" : "cursor-default"
                            )}
                        >
                            {/* Circle */}
                            <div
                                className={cn(
                                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2",
                                    isActive
                                        ? "bg-foreground text-background border-foreground"
                                        : isCompleted
                                            ? "bg-emerald-500 text-white border-emerald-500"
                                            : "bg-muted text-muted-foreground border-border"
                                )}
                            >
                                {isCompleted ? (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    stepNum
                                )}
                            </div>

                            {/* Label */}
                            <div className="text-left hidden sm:block">
                                <p
                                    className={cn(
                                        "text-xs font-semibold leading-none",
                                        isActive ? "text-foreground" : isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                                    )}
                                >
                                    {step.label}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{step.description}</p>
                            </div>
                        </button>

                        {/* Connector */}
                        {index < STEPS.length - 1 && (
                            <div
                                className={cn(
                                    "flex-1 h-px mx-3 transition-colors",
                                    isCompleted ? "bg-emerald-400" : "bg-border"
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}