import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Intan's Journal",
    template: "%s | Intan's Journal",
  },
  description: "A space for thoughts and poetry.",
  authors: [{ name: "Intan Ratna" }],
  generator: "Built with love and logic by R.",
  openGraph: {
    title: "Intan's Journal",
    description: "A space for thoughts and poetry.",
    url: "https://iratnasan.vercel.app",
    siteName: "Intan's Journal",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intan's Journal",
    description: "A space for thoughts and poetry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
