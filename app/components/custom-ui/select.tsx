import React from "react";
import { Field as FieldWrapper, FieldLabel, FieldError } from "../ui/field";

type SelectProps = {
    label?: string;
    validationErrors?: string[] | null;
    children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ label, validationErrors, children, ...props }: SelectProps) {
    const hasError = !!validationErrors && validationErrors.length > 0;

    return (
        <FieldWrapper data-invalid={hasError}>
            {label && <FieldLabel className="text-foreground/80">{label}</FieldLabel>}
            <div className="relative group">
                <select
                    {...props}
                    className={`
                        w-full border rounded-xl px-4 py-3 text-foreground
                        bg-input/50 backdrop-blur-sm
                        appearance-none outline-none transition-all cursor-pointer
                        focus:ring-2 
                        ${hasError
                            ? "border-destructive/50 focus:ring-destructive/20"
                            : "border-border/50 focus:ring-ring/50 hover:bg-accent/50"
                        }
                    `}
                >
                    {children}
                </select>

                {/* 3. Dropdown Arrow using theme-aware colors */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-foreground transition-colors">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {hasError && <FieldError className="text-destructive">{validationErrors.join('. ')}</FieldError>}
        </FieldWrapper>
    );
}