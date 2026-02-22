import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { ClientPage } from "./client.page";

export default function VideoerPage() {
  return (
    <div className="p-6">
      <ErrorBoundary context="ressurser" slug="videoer">
        <Suspense fallback={<div>Laster...</div>}>
          <ClientPage />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
