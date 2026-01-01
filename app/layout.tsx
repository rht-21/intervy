import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthToast } from "@/components/molecules/auth-toast";
import Navbar from "@/components/organisms/navbar/navbar";
import { Suspense } from "react";

const fontSans = Schibsted_Grotesk({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const fontMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intervy | Real-Time AI Mock Interviews",
  description:
    "Lag-free, real-time AI mock interviews. Practice speaking naturally, get instant feedback, and build interview confidence fast — no peers, no waiting, no scripts.",
  applicationName: "Intervy",
  keywords: [
    "AI mock interviews",
    "real-time interview practice",
    "voice interview prep",
    "software engineer interview prep",
    "product manager interview prep",
    "LiveKit interviews",
    "AI interviewer",
    "interview feedback",
  ],
  authors: [{ name: "Intervy" }],
  creator: "Intervy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Toaster richColors position="top-center" />
          <Suspense fallback={null}>
            <AuthToast />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
