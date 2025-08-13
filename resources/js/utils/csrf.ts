export const getCsrfToken = (): string => {
    return (
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || ""
    );
};

export const createHeaders = (
    additionalHeaders: Record<string, string> = {}
): Record<string, string> => {
    return {
        "X-CSRF-TOKEN": getCsrfToken(),
        ...additionalHeaders,
    };
};
