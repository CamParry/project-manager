import {
    CheckIcon,
    CircleDashedIcon,
    MessageSquareIcon,
    PauseIcon,
    TrendingUpIcon,
} from "lucide-react";

export function StatusIcon({
    value,
    className = "shrink-0",
}: {
    value?: string;
    className?: string;
}) {
    const name = value?.toLowerCase();
    if (name === "planning")
        return (
            <CircleDashedIcon
                className={`text-n-500 dark:text-n-400 ${className}`}
            />
        );
    if (name === "in progress")
        return (
            <TrendingUpIcon
                className={`text-n-500 dark:text-n-400 ${className}`}
            />
        );
    if (name === "review")
        return (
            <MessageSquareIcon
                className={`text-n-500 dark:text-n-400 ${className}`}
            />
        );
    if (name === "completed")
        return (
            <CheckIcon className={`text-n-500 dark:text-n-400 ${className}`} />
        );
    if (name === "on hold")
        return (
            <PauseIcon
                strokeWidth={1.75}
                className={`text-n-500 dark:text-n-400 ${className}`}
            />
        );
    return null;
}
