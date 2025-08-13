import { FlagIcon } from "lucide-react";

export function PriorityIcon({
    value,
    className = "shrink-0",
}: {
    value?: number;
    className?: string;
}) {
    return (
        <FlagIcon
            className={`${
                value === 1
                    ? "text-rose-500 dark:text-rose-400"
                    : value === 2
                      ? "text-amber-500 dark:text-amber-400"
                      : value === 3
                        ? "text-sky-500 dark:text-sky-400"
                        : "text-n-500 dark:text-n-400"
            } ${className}`}
        />
    );
}
