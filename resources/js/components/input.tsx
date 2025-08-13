import { InputHTMLAttributes } from "react";

export function Input({
    type = "text",
    className = "",
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type={type}
            className={`rounded-lg border-border bg-bg px-3 py-2 font-medium text-text focus:border-sky-600 focus:ring-sky-600 ${className}`}
        />
    );
}
