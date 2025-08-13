import { LabelHTMLAttributes } from "react";

export function Label({
    value,
    className = "",
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={`block font-medium text-text-muted ${className}`}
        >
            {value ? value : children}
        </label>
    );
}
