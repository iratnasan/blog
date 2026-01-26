import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/client";

export const runtime = "edge";
export const alt = "Blog Post Cover";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
    const supabase = createClient();
    const { data: post } = await supabase
        .from("posts")
        .select("title, created_at")
        .eq("slug", params.slug)
        .single();

    const title = post?.title || "Intan's Journal";
    const date = post?.created_at
        ? new Date(post.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
        : "";

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FDFBF7", // Warm White
                    backgroundImage: "radial-gradient(#E5E5E5 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    color: "#1A1A1A",
                    fontFamily: '"Times New Roman", Times, serif',
                    padding: "80px",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "40px",
                        fontSize: "24px",
                        opacity: 0.6,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontFamily: "sans-serif",
                    }}
                >
                    Intan&apos;s Journal
                </div>

                <div
                    style={{
                        fontSize: "80px",
                        fontWeight: "bold",
                        lineHeight: 1.1,
                        marginBottom: "40px",
                        background: "linear-gradient(to bottom, #1A1A1A, #4A4A4A)",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    {title}
                </div>

                {date && (
                    <div
                        style={{
                            fontSize: "28px",
                            opacity: 0.5,
                            fontStyle: "italic",
                        }}
                    >
                        {date}
                    </div>
                )}
            </div>
        ),
        {
            ...size,
        }
    );
}
