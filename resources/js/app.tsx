import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import { ErrorBoundary } from "./components/error-boundary";
import { AppStateProvider } from "./contexts/app-state";
import { ConfirmProvider } from "./contexts/confirm";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob("./pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ErrorBoundary>
                <QueryClientProvider client={queryClient}>
                    <AppStateProvider>
                        <ConfirmProvider>
                            <App {...props} />
                        </ConfirmProvider>
                    </AppStateProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
