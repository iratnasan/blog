import { ImageResponse } from "next/og";
import { createStaticClient } from "@/lib/supabase/server";

export const runtime = "edge";
export const alt = "Blog Post Cover";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = await createStaticClient();
    const { data: post } = await supabase
        .from("posts")
        .select("title, created_at, cover_image")
        .eq("slug", slug)
        .single();

    const title = post?.title || "Intan's Journal";
    const coverImage = post?.cover_image;
    const date = post?.created_at
        ? new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
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
                    backgroundColor: "#1A1A1A",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Background Image Layer */}
                {coverImage && (
                    <img
                        src={coverImage}
                        alt=""
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.5,
                        }}
                    />
                )}

                {/* Overlay / Pattern */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "80px",
                        textAlign: "center",
                        color: "white",
                        fontFamily: '"Times New Roman", Times, serif',
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            marginBottom: "40px",
                            fontSize: "24px",
                            opacity: 0.8,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            fontFamily: "sans-serif",
                        }}
                    >
                        Intan&apos;s Journal
                    </div>

                    <div
                        style={{
                            fontSize: "85px",
                            fontWeight: "bold",
                            lineHeight: 1.1,
                            marginBottom: "40px",
                            textShadow: "0 4px 12px rgba(0,0,0,0.5)",
                        }}
                    >
                        {title}
                    </div>

                    {date && (
                        <div
                            style={{
                                fontSize: "32px",
                                opacity: 0.7,
                                fontStyle: "italic",
                            }}
                        >
                            {date}
                        </div>
                    )}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
