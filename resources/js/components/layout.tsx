import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

type AppLayoutProps = {
    children: ReactNode;
    title?: string;
};

export function Layout({ children, title }: AppLayoutProps) {
    return (
        <div className="flex h-screen bg-bg text-text">
            <Head title={title} />
            {children}
        </div>
    );
}
