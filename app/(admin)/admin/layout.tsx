import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";

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
            <AdminHeader />
            <main>{children}</main>
        </div>
    );
}
