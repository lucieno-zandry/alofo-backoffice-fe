import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

type FormErrorBannerProps = {
    errors: Record<string, string>;
};

export function FormErrorBanner({ errors }: FormErrorBannerProps) {
    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) return null;

    const rootError = errors['_root'];
    const fieldErrors = Object.entries(errors).filter(([key]) => key !== '_root');

    return (
        <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Please fix the following errors</AlertTitle>
            <AlertDescription>
                {rootError && <p>{rootError}</p>}
                {fieldErrors.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 mt-1">
                        {fieldErrors.map(([field, message]) => (
                            <li key={field} className="text-sm capitalize">
                                <span className="font-medium">{field.replace(/_/g, ' ')}</span>: {message}
                            </li>
                        ))}
                    </ul>
                )}
            </AlertDescription>
        </Alert>
    );
}