import { Button } from "@/components/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo,
        });

        // Log error to monitoring service
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    private handleRetry = () => {
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined,
        });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="size-8 text-red-600" />
                    </div>

                    <h2 className="mb-2 text-lg font-semibold text-red-900">
                        Something went wrong
                    </h2>

                    <p className="mb-6 max-w-md text-sm text-red-700">
                        We encountered an unexpected error. Please try
                        refreshing the page or contact support if the problem
                        persists.
                    </p>

                    <div className="flex gap-3">
                        <Button
                            onClick={this.handleRetry}
                            variant="secondary"
                            size="sm"
                        >
                            Try Again
                        </Button>

                        <Button
                            onClick={this.handleReload}
                            variant="primary"
                            size="sm"
                            icon={RefreshCw}
                        >
                            Reload Page
                        </Button>
                    </div>

                    {process.env.NODE_ENV === "development" &&
                        this.state.error && (
                            <details className="mt-6 w-full max-w-2xl">
                                <summary className="cursor-pointer text-xs text-red-600 hover:text-red-800">
                                    Error Details (Development Only)
                                </summary>
                                <div className="mt-2 rounded bg-red-100 p-3 text-left">
                                    <pre className="text-xs text-red-800">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </div>
                            </details>
                        )}
                </div>
            );
        }

        return this.props.children;
    }
}

// Functional component wrapper for easier usage
export function withErrorBoundary<T extends {}>(
    Component: React.ComponentType<T>,
    fallback?: ReactNode
) {
    return function ErrorBoundaryWrapper(props: T) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
}
