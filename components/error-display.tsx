"use client";

import {
  ContentError,
  NotFoundError,
  ValidationError,
} from "@/lib/content-service.client";
import { Scale, BookOpen, HelpingHand } from "lucide-react";

interface ErrorDisplayProps {
  error?: unknown;
  context?: "veiledning" | "juridisk";
  slug?: string;
}

export function ErrorDisplay({
  error,
  context = "veiledning",
  slug = "",
}: ErrorDisplayProps) {
  const getContextInfo = () => {
    switch (context) {
      case "veiledning":
        return {
          title: "Veiledning",
          icon: <HelpingHand />,
          path: "/veiledning",
        };
      case "juridisk":
        return {
          title: "Juridisk",
          icon: <Scale />,
          path: "/juridisk",
        };
      default:
        return {
          title: "Innhold",
          icon: <BookOpen />,
          path: "/",
        };
    }
  };

  const contextInfo = getContextInfo();

  // Handle specific error types
  if (error instanceof NotFoundError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">{contextInfo.icon}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {contextInfo.title} ikke funnet
          </h1>
          <p className="text-gray-600 mb-6">
            {contextInfo.title.toLowerCase()} med navnet &quot;{slug}&quot;
            finnes ikke.
          </p>
          <a
            href={`/${context}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
          >
            Se alle {contextInfo.title.toLowerCase()}er
          </a>
        </div>
      </div>
    );
  }

  if (error instanceof ValidationError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">
                Valideringsfeil
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>{error.message}</p>
                <p className="mt-2">
                  Vennligst sjekk at URL-en er riktig og prøv på nytt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error instanceof ContentError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">
                Feil {error.status}: {error.code}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
                <p className="mt-2">
                  Teknisk informasjon er logget. Vennligst prøv igjen senere.
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Prøv på nytt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generic error
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded">
        <div className="flex items-start">
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-800">
              En feil oppsto
            </h3>
            <div className="mt-2 text-sm text-gray-700">
              <p>
                Kunne ikke laste {contextInfo.title.toLowerCase()}. Vennligst
                prøv igjen senere.
              </p>
            </div>
            <div className="mt-4 space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                Prøv på nytt
              </button>
              <a
                href={`/${context}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Tilbake til oversikt
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
