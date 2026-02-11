import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Vercel Cron Job handler — pings Supabase to prevent free-tier pausing
export async function GET(request: Request) {
    // Optional: verify the request is from Vercel Cron
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // If CRON_SECRET is not set, skip auth check (for local dev)
        if (process.env.CRON_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Simple lightweight query to keep the database active
        const { data, error } = await supabase
            .from("posts")
            .select("id")
            .limit(1);

        if (error) throw error;

        return NextResponse.json({
            ok: true,
            timestamp: new Date().toISOString(),
            message: "Supabase is alive 🟢",
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json(
            { ok: false, error: message },
            { status: 500 }
        );
    }
}
