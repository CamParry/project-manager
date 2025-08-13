import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAppState } from "@/contexts/app-state";
import { Link } from "@inertiajs/react";
import { HomeIcon, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";

export function Header({
    mode = "projects",
}: {
    mode?: "profile" | "projects";
}) {
    const { showSidebar, toggleShowSidebar } = useAppState();

    return (
        <div className="flex h-16 shrink-0 items-center gap-4 border-b border-border-muted px-4 py-2">
            {mode === "profile" ? (
                <Link className="icon-button" href={route("dashboard")}>
                    <HomeIcon className="size-5" />
                </Link>
            ) : (
                <button onClick={toggleShowSidebar} className="icon-button">
                    {showSidebar ? (
                        <SidebarCloseIcon className="size-5" />
                    ) : (
                        <SidebarOpenIcon className="size-5" />
                    )}
                </button>
            )}
            <div className="ml-auto flex gap-2">
                <ThemeToggle />
                <UserMenu />
            </div>
        </div>
    );
}
