interface FooterProps {
    siteName: string;
}

export function Footer({ siteName }: FooterProps) {
    return (
        <footer className="border-t border-muted mt-20">
            <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-foreground/80 space-y-1">
                <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
                <p className="text-foreground/50 text-xs">
                    Dirangkai dengan logika dan rasa oleh{" "}
                    <a
                        href="https://rizkiye.anartha.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-foreground/80 transition-colors"
                    >
                        rixzkiye
                    </a>
                </p>
            </div>
        </footer>
    );
}
