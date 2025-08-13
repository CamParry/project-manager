import { InputHTMLAttributes } from "react";

export function Checkbox({
    className = "",
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={`size-5 rounded-md border-border bg-transparent text-sky-600 checked:border-sky-600 focus:ring-sky-600 ${className}`}
        />
    );
}
