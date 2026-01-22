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

    return <>{children}</>;
}
