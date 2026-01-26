import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SECRET_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        return NextResponse.json(
            { error: "Missing Supabase credentials in .env.local" },
            { status: 500 }
        );
    }

    // Create a Supabase client with the Service Role Key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

    // Mock Data
    const mockPosts = [
        {
            title: "The Art of Minimalism",
            slug: "the-art-of-minimalism",
            excerpt: "Exploring why less is often more in design and life.",
            content:
                '<p>Minimalism is not just about having fewer things; it is about making room for more: more time, more peace, and more creativity.</p><blockquote>"Simplicity is the ultimate sophistication." - Leonardo da Vinci</blockquote><p>In a world of noise, silence is a luxury. We strive to create spaces that breathe.</p>',
            is_published: true,
            published_at: new Date().toISOString(),
        },
        {
            title: "Morning Coffee Routines",
            slug: "morning-coffee-routines",
            excerpt: "How a simple brew can set the tone for the entire day.",
            content:
                "<p>The aroma of freshly ground beans. The slow pour of hot water. It is a ritual that grounds us before the chaos begins.</p><ul><li>Grind beans</li><li>Heat water to 93°C</li><li>Pour slowly</li><li>Enjoy</li></ul>",
            is_published: true,
            published_at: new Date().toISOString(),
        },
        {
            title: "A Letter to My Future Self",
            slug: "a-letter-to-my-future-self",
            excerpt: "Reflections on growth, change, and staying true to oneself.",
            content:
                "<p>Dear Me,</p><p>I hope you are still curious. I hope you still find joy in small rainy days. Remember that growth is not linear.</p>",
            is_published: true,
            published_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        },
    ];

    try {
        // 1. Check connection and if table exists by selecting 1 row
        const { error: checkError } = await supabase.from("posts").select("id").limit(1);

        if (checkError) {
            if (checkError.code === "42P01") {
                // Undefined table
                return NextResponse.json(
                    {
                        error: "Table 'posts' does not exist.",
                        details: "You strictly must run the SQL in 'supabase/schema.sql' via the Supabase Dashboard SQL Editor first. I cannot create tables via the API key.",
                        checkError
                    },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { error: "Database connection failed or other error", details: checkError },
                { status: 500 }
            );
        }

        // 2. Perform Upsert
        const { data, error } = await supabase
            .from("posts")
            .upsert(mockPosts, { onConflict: "slug" })
            .select();

        if (error) {
            return NextResponse.json(
                { error: "Failed to insert mock data", details: error },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Mock data seeded successfully!",
            inserted: data?.length,
            data,
        });
    } catch (err) {
        const error = err as Error;
        return NextResponse.json(
            { error: "Unexpected error", details: error.message },
            { status: 500 }
        );
    }
}
