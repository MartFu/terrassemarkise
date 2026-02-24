import type { Metadata } from "next";

import "./globals.css";
import Layout from "@/components/layout";
import StagingLock from "@/components/soft-staging-lock";

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
      </body>
    </html>
  );
}
