import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getProfile } from "@/lib/supabase/profile";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const profile = await getProfile();
    const siteName = profile?.site_name || "Intan's Journal";

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar siteName={siteName} />
            <main className="flex-1">
                {children}
            </main>
            <Footer siteName={siteName} />
        </div>
    );
}
