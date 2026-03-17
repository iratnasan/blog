"use client";

import { Moon, Sun, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "sepia";

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    const applyTheme = (t: Theme) => {
        const root = document.documentElement;
        // Handle Dark Mode Class (Tailwind)
        if (t === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        // Handle Data Theme (Sepia, etc)
        root.setAttribute("data-theme", t);
    };

    useEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect -- Intentional: hydration mount & initial theme from localStorage */
        setMounted(true);
        const stored = (localStorage.getItem("theme") as Theme) || "light";
        setTheme(stored);
        /* eslint-enable react-hooks/set-state-in-effect */
        applyTheme(stored);
    }, []);

    if (!mounted) return null;

    const cycleTheme = () => {
        const themes: Theme[] = ["light", "dark", "sepia"];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];

        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
    };

    const getIcon = () => {
        switch (theme) {
            case "dark":
                return <Moon className="h-5 w-5" />;
            case "sepia":
                return <BookOpen className="h-5 w-5" />;
            default:
                return <Sun className="h-5 w-5" />;
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={cycleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2 group relative"
                aria-label={`Current theme: ${theme}. Click to change.`}
            >
                {getIcon()}
                <span className="text-xs font-medium capitalize text-foreground/50 group-hover:text-accent transition-colors">
                    {theme}
                </span>
            </button>
        </div>
    );
}
