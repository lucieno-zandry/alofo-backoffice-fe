import { ValidationException } from "~/api/app-fetch";

export default function (actionData: unknown) {
    const getFieldErrors = (name: string) => {
        if (actionData instanceof ValidationException) {
            return actionData.errors[name] || null;
        }
        return null;
    };

    return getFieldErrors;
}