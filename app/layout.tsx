import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import Layout from "@/components/layout";
import StagingLock from "@/components/soft-staging-lock";
import CookieBanner from "@/components/cookie-banner";
import { cookieConfig } from "@/innhold/cookie-config";
import { Analytics } from "@/components/analytics";
import { analyticsConfig } from "@/innhold/analytics";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Terrassemarkise - Del av Solskjerming AS",
  description: "Meta beskrivelse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <StagingLock>
          <Layout>{children}</Layout>
        </StagingLock>
        <Suspense fallback={null}>
          <CookieBanner config={cookieConfig} />
          <Analytics config={analyticsConfig} />
        </Suspense>
      </body>
    </html>
  );
}
