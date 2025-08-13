import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { SortOption } from "@/types";

export type ColorMode = 'light' | 'dark';

type AppState = {
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
    toggleShowSidebar: () => void;
    sortBy: SortOption;
    setSortBy: (sortBy: SortOption) => void;
    colorMode: ColorMode;
    setColorMode: (mode: ColorMode) => void;
    toggleColorMode: () => void;
};

const AppStateContext = createContext<AppState | null>(null);

export const useAppState = () => {
    return useContext(AppStateContext) as AppState;
};

const getStoredSortBy = (): SortOption => {
    try {
        const stored = localStorage.getItem('projectSortBy') as SortOption;
        if (stored && ['priority', 'title', 'created_at', 'deadline'].includes(stored)) {
            return stored;
        }
    } catch (error) {
        console.warn('Failed to read sort preference from localStorage:', error);
    }
    return 'priority';
};

const getStoredColorMode = (): ColorMode => {
    try {
        const stored = localStorage.getItem('colorMode') as ColorMode;
        if (stored && ['light', 'dark'].includes(stored)) {
            return stored;
        }
        // Check system preference if no stored preference
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    } catch (error) {
        console.warn('Failed to read color mode preference from localStorage:', error);
    }
    return 'light';
};

const applyColorMode = (mode: ColorMode) => {
    if (typeof document !== 'undefined') {
        const html = document.documentElement;
        if (mode === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [sortBy, setSortByState] = useState<SortOption>(() => getStoredSortBy());
    const [colorMode, setColorModeState] = useState<ColorMode>(() => getStoredColorMode());

    const toggleShowSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const setSortBy = (newSortBy: SortOption) => {
        setSortByState(newSortBy);
        try {
            localStorage.setItem('projectSortBy', newSortBy);
        } catch (error) {
            console.warn('Failed to save sort preference to localStorage:', error);
        }
    };

    const setColorMode = (newColorMode: ColorMode) => {
        setColorModeState(newColorMode);
        applyColorMode(newColorMode);
        try {
            localStorage.setItem('colorMode', newColorMode);
        } catch (error) {
            console.warn('Failed to save color mode preference to localStorage:', error);
        }
    };

    const toggleColorMode = () => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light');
    };

    // Apply initial color mode on mount
    useEffect(() => {
        applyColorMode(colorMode);
    }, []);

    return (
        <AppStateContext.Provider
            value={{
                showSidebar,
                setShowSidebar,
                toggleShowSidebar,
                sortBy,
                setSortBy,
                colorMode,
                setColorMode,
                toggleColorMode,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
};
