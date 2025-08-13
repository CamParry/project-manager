import { useAppState } from "@/contexts/app-state";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { colorMode, toggleColorMode } = useAppState();

    return (
        <button
            onClick={toggleColorMode}
            className="icon-button"
            aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
        >
            {colorMode === "light" ? (
                <Moon className="size-5" />
            ) : (
                <Sun className="size-5" />
            )}
        </button>
    );
}
