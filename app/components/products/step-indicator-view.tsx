import { cn } from "~/lib/utils";
import { Check } from "lucide-react";
import type { Step } from "./create-product-page.controller";

type StepIndicatorProps = {
  current: Step;
  step1Valid: boolean;
  step2Valid: boolean;
  onGoTo: (s: Step) => void;
};

const STEPS = [
  { id: 1 as Step, label: "Basics", sub: "Title, slug, images" },
  { id: 2 as Step, label: "Variant Groups", sub: "Sizes, colors…" },
  { id: 3 as Step, label: "Variants", sub: "SKU, price, stock" },
];

export function StepIndicator({ current, step1Valid, step2Valid, onGoTo }: StepIndicatorProps) {
  const isReachable = (s: Step) => {
    if (s === 1) return true;
    if (s === 2) return step1Valid;
    if (s === 3) return step1Valid && step2Valid;
    return false;
  };

  const isDone = (s: Step) => {
    if (s === 1) return step1Valid && current > 1;
    if (s === 2) return step2Valid && current > 2;
    return false;
  };

  return (
    <nav aria-label="Form steps" className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const active = current === step.id;
        const done = isDone(step.id);
        const reachable = isReachable(step.id);

        return (
          <div key={step.id} className="flex items-center">
            <button
              disabled={!reachable}
              onClick={() => reachable && onGoTo(step.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                reachable ? "cursor-pointer hover:bg-muted" : "cursor-not-allowed opacity-40"
              )}
            >
              {/* Circle */}
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors shrink-0",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : done
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-border bg-background text-muted-foreground"
                )}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : step.id}
              </div>

              {/* Labels */}
              <div className="hidden sm:block text-left">
                <p
                  className={cn(
                    "text-xs font-semibold leading-none",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.sub}</p>
              </div>
            </button>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div className="w-8 h-px bg-border mx-1 shrink-0" />
            )}
          </div>
        );
      })}
    </nav>
  );
}