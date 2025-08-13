import { LucideIcon } from "lucide-react";
import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: LucideIcon;
    iconPosition?: "left" | "right";
    loading?: boolean;
    children: React.ReactNode;
};

export function Button({
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "left",
    loading = false,
    className = "",
    disabled,
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles: Record<ButtonVariant, string> = {
        primary: "bg-primary text-white border border-primary",
        secondary: "bg-transparent text-text border border-border",
        danger: "bg-danger text-white border border-danger",
    };

    const sizeStyles: Record<ButtonSize, string> = {
        sm: "px-3 py-2 text-sm rounded-lg gap-1.5",
        md: "px-4 py-2.5 text-base rounded-xl gap-2",
        lg: "px-6 py-3 text-base rounded-xl gap-2.5",
    };

    const iconSize: Record<ButtonSize, string> = {
        sm: "h-4 w-4",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    };

    const combinedClassName = `
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
    `.trim();

    return (
        <button
            className={combinedClassName}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg
                        className={`animate-spin ${iconSize[size]}`}
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    {children}
                </>
            ) : (
                <>
                    {Icon && iconPosition === "left" && (
                        <Icon
                            className={`${iconSize[size]} ${
                                loading ? "animate-spin" : ""
                            }`}
                        />
                    )}
                    {children}
                    {Icon && iconPosition === "right" && (
                        <Icon
                            className={`${iconSize[size]} ${
                                loading ? "animate-spin" : ""
                            }`}
                        />
                    )}
                </>
            )}
        </button>
    );
}
