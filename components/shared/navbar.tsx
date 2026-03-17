"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavbarProps {
    siteName: string;
}

export function Navbar({ siteName }: NavbarProps) {
    const pathname = usePathname();

    return (
        <nav className="border-b border-muted bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-serif font-semibold hover:text-accent transition-colors">
                    {siteName}
                </Link>

                <div className="flex items-center gap-6">
                    <Link 
                        href="/about" 
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-accent relative py-1",
                            pathname === "/about" ? "text-accent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent" : "text-foreground/70"
                        )}
                    >
                        About
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
