export function Footer() {
    return (
        <footer className="border-t border-[var(--muted)] mt-20">
            <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-[var(--foreground)]/60">
                <p>© {new Date().getFullYear()} Intan&apos;s Journal. All rights reserved.</p>
            </div>
        </footer>
    );
}
