import {
    CheckIcon,
    CircleIcon,
    ClockIcon,
    PauseIcon,
    PlayIcon,
    TrendingUpIcon,
    XIcon,
} from "lucide-react";
import type { ProjectStatusValue } from "@/utils/project-labels";

export function StatusIcon({
    value,
    className = "shrink-0",
}: {
    value?: ProjectStatusValue | string;
    className?: string;
}) {
    switch (value) {
        case "not-started":
            return (
                <CircleIcon
                    className={`text-n-500 dark:text-n-400 ${className}`}
                />
            );
        case "waiting":
            return (
                <ClockIcon
                    className={`text-n-500 dark:text-n-400 ${className}`}
                />
            );
        case "in-progress":
            return (
                <PlayIcon
                    className={`text-n-500 dark:text-n-400 ${className}`}
                />
            );
        case "on-hold":
            return (
                <PauseIcon
                    strokeWidth={1.75}
                    className={`text-n-500 dark:text-n-400 ${className}`}
                />
            );
        case "cancelled":
            return (
                <XIcon
                    className={`text-n-500 dark:text-n-400 ${className}`}
                />
            );
        case "completed":
            return (
                <CheckIcon 
                    className={`text-n-500 dark:text-n-400 ${className}`} 
                />
            );
        default:
            return (
                <CircleIcon
                    className={`text-n-500 dark:text-n-400 ${className}`}
                />
            );
    }
}
