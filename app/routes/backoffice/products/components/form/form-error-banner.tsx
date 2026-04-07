import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "~/components/ui/alert";

type Props = {
    message: string | null;
};

export function FormErrorBanner({ message }: Props) {
    if (!message) return null;

    return (
        <Alert variant="destructive" className="mb-4 py-3">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">{message}</AlertDescription>
        </Alert>
    );
}

// Inline field error – used below each input
type FieldProps = {
    errors?: string[];
};

export function FieldError({ errors }: FieldProps) {
    if (!errors?.length) return null;
    return (
        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <span>{errors[0]}</span>
        </p>
    );
}