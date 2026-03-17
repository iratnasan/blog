"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./logout-button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AdminHeader() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/admin/dashboard", label: "Dashboard" },
        { href: "/admin/settings", label: "Settings" },
    ];

    return (
        <header className="border-b border-muted bg-card sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                    <span className="font-serif font-bold text-lg md:text-xl whitespace-nowrap">Admin Panel</span>
                    
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors relative",
                                    pathname === link.href 
                                        ? "text-accent" 
                                        : "text-foreground/60 hover:text-accent hover:bg-accent/5"
                                )}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="admin-nav-active"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    <Link 
                        href="/" 
                        className="hidden sm:block text-sm text-foreground/60 hover:text-accent transition-colors"
                    >
                        View Site
                    </Link>
                    <div className="hidden md:block h-4 w-px bg-muted" />
                    <div className="hidden md:block">
                        <LogoutButton />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 hover:bg-accent/5 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-muted bg-card overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                        "px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                                        pathname === link.href
                                            ? "bg-accent/10 text-accent"
                                            : "text-foreground/60 hover:bg-accent/5 hover:text-accent"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-muted my-2" />
                            <Link
                                href="/"
                                className="px-4 py-3 text-sm text-foreground/60"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                View Site
                            </Link>
                            <div className="px-4 py-3">
                                <LogoutButton />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
