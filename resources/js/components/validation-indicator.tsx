import { AlertCircle, CheckCircle } from "lucide-react";

type ValidationIndicatorProps = {
    error?: string;
    isValid?: boolean;
    className?: string;
};

export function ValidationIndicator({ 
    error, 
    isValid = false, 
    className = "" 
}: ValidationIndicatorProps) {
    if (!error && !isValid) {
        return null;
    }

    return (
        <div className={`flex items-center gap-1.5 ${className}`}>
            {error ? (
                <>
                    <AlertCircle className="size-4 text-red-500 dark:text-red-400" />
                    <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
                </>
            ) : isValid ? (
                <CheckCircle className="size-4 text-green-500 dark:text-green-400" />
            ) : null}
        </div>
    );
}

/**
 * Subtle validation border for form inputs
 */
export function getValidationClassName(error?: string, isValid?: boolean): string {
    if (error) {
        return "border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500";
    } else if (isValid) {
        return "border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500";
    }
    return "";
}