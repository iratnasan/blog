"use client";

import { Moon, Sun, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "sepia";

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme;
        if (stored) {
            setTheme(stored);
            document.documentElement.setAttribute("data-theme", stored);
        }
    }, []);

    const cycleTheme = () => {
        const themes: Theme[] = ["light", "dark", "sepia"];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];

        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
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
        <button
            onClick={cycleTheme}
            className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
            aria-label="Toggle theme"
        >
            {getIcon()}
        </button>
    );
}
