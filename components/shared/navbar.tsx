import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
    return (
        <nav className="border-b border-muted bg-(--background)/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-serif font-semibold hover:opacity-70 transition-opacity">
                    Intan&apos;s Journal
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/about" className="text-sm hover:text-accent transition-colors">
                        About
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
