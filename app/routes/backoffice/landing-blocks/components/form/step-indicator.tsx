import { Check } from 'lucide-react';
import { cn } from '~/lib/utils';

export type Step = {
    id: string;
    label: string;
};

type StepIndicatorProps = {
    steps: Step[];
    currentStep: string;
    completedSteps: string[];
};

export function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
    return (
        <div className="flex items-center gap-0">
            {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = step.id === currentStep;

                return (
                    <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div
                                className={cn(
                                    'flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold transition-all',
                                    isCompleted && 'bg-primary text-primary-foreground',
                                    isCurrent && !isCompleted && 'bg-primary/20 text-primary border-2 border-primary',
                                    !isCurrent && !isCompleted && 'bg-muted text-muted-foreground'
                                )}
                            >
                                {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
                            </div>
                            <span
                                className={cn(
                                    'text-[10px] mt-1 font-medium whitespace-nowrap',
                                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                {step.label}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    'h-[2px] w-8 sm:w-12 mx-1 mb-4 rounded transition-all',
                                    isCompleted ? 'bg-primary' : 'bg-border'
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}