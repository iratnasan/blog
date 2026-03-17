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

import { getProfile } from "@/lib/supabase/profile";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const siteName = profile?.site_name || "Intan's Journal";
  const description = profile?.tagline || "A space for thoughts and poetry.";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    authors: [{ name: profile?.name || "Intan" }],
    generator: "Built with love and logic by R.",
    openGraph: {
      title: siteName,
      description,
      url: "https://iratnasan.my.id",
      siteName,
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
    },
  };
}

import { ToastProvider } from "@/components/ui/toast";

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
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
