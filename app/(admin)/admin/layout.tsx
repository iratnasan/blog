import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // If not logged in and not on login page, redirect to login
    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-muted/10">
            <header className="border-b border-muted bg-white dark:bg-gray-900 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <span className="font-serif font-bold text-xl">Admin Panel</span>
                        <nav className="flex items-center gap-4">
                            <a href="/admin/dashboard" className="text-sm font-medium hover:text-accent transition-colors">Dashboard</a>
                            <a href="/admin/settings" className="text-sm font-medium hover:text-accent transition-colors">Settings</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-sm text-foreground/60 hover:text-accent transition-colors">View Site</a>
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
}
