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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const stored = (localStorage.getItem("theme") as Theme) || "light";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(stored);
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
        <button
            onClick={cycleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle theme"
        >
            {getIcon()}
        </button>
    );
}
