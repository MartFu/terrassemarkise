import type { Metadata } from "next";

import "./globals.css";
import Layout from "@/components/layout";
import StagingLock from "@/components/soft-staging-lock";
import { CookieBanner } from "@/components/cookie-banner";
import { cookieConfig } from "@/innhold/cookie-config";
import { Analytics } from "@/components/analytics";
import { analyticsConfig } from "@/innhold/analytics";
import { Suspense } from "react";

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
    <html suppressHydrationWarning lang="en">
      <body className={`antialiased min-h-screen flex flex-col`}>
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
