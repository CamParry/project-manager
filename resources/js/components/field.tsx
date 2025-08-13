export function Field({
    className = "",
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return <div className={"space-y-1" + className}>{children}</div>;
}
