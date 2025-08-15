import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query-provider";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/LoadingFallback";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travo",
  description:
    "Travo is a travel admin dashboard for tracking users and managing travel plans with ease.",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback = {<LoadingFallback/>}>
          <TanstackQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </TanstackQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
