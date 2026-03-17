import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Intan's Journal";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
                    backgroundColor: "#FDFBF7",
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
                        fontSize: "32px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "sans-serif",
                    }}
                >
                    Welcome to
                </div>

                <div
                    style={{
                        fontSize: "100px",
                        fontWeight: "bold",
                        lineHeight: 1.1,
                        marginBottom: "40px",
                        background: "linear-gradient(to bottom, #1A1A1A, #4A4A4A)",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    Intan&apos;s Journal
                </div>

                <div
                    style={{
                        fontSize: "32px",
                        opacity: 0.6,
                        fontStyle: "italic",
                    }}
                >
                    A space for thoughts, poetry, and reflections
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
