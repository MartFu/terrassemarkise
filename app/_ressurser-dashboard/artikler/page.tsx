import { ErrorBoundary } from "@/components/error-boundary";
import { ClientPage } from "./client.page";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="p-6">
      <ErrorBoundary context="ressurser" slug="artikler">
        <Suspense fallback={<div>Laster...</div>}>
          <ClientPage />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
