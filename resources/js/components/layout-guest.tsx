import { PropsWithChildren } from "react";

export function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-bg-muted px-6 text-text">
            <div className="w-full max-w-md">{children}</div>
        </div>
    );
}
