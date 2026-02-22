// components/error-display.tsx
"use client";

import { useState } from "react";
import {
  ContentServiceError,
  ValidationError,
  isNotFoundError,
} from "@/lib/content-loader.error";
import {
  Scale,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { SITE_URLS } from "@/lib/constants";

interface ErrorDisplayProps {
  error?: unknown;
  context?: "ressurser" | "juridisk" | string;
  slug?: string;
}

export function ErrorDisplay({
  error,
  context = "ressurser",
  slug = "",
}: ErrorDisplayProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    window.location.reload();
  };

  const getContextConfig = () => {
    switch (context) {
      case "juridisk":
        return {
          title: "Juridisk dokument",
          plural: "juridiske dokumenter",
          icon: Scale,
          path: SITE_URLS.LEGAL,
        };
      case "ressurser":
        return {
          title: "Ressurs",
          plural: "ressurser",
          icon: HelpCircle,
          path: SITE_URLS.RESOURCES,
        };
      default:
        return {
          title: "Innhold",
          plural: "artikler",
          icon: BookOpen,
          path: "/",
        };
    }
  };

  const cfg = getContextConfig();
  const Icon = cfg.icon;

  // Determine error type
  const notFound = isNotFoundError(error);
  const validation = error instanceof ValidationError;

  // Not Found State - Using only Shadcn semantic tokens
  if (notFound) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
        <div className="max-w-lg w-full text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-muted rounded-full blur-2xl opacity-50" />
            <div className="relative bg-card p-6 rounded-3xl shadow-lg border border-border">
              <Icon
                className="w-16 h-16 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            Ikke funnet
          </h1>

          <p className="text-lg text-muted-foreground mb-2">
            {cfg.title}{" "}
            <span className="font-mono text-sm bg-muted px-2 py-1 rounded text-foreground">
              {slug}
            </span>{" "}
            finnes ikke.
          </p>

          <p className="text-muted-foreground mb-8">
            Den kan ha blitt flyttet, slettet eller URL-en kan være feil.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={cfg.path}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Se alle {cfg.plural}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card text-card-foreground font-medium rounded-xl hover:bg-accent transition-all border border-border shadow-sm"
            >
              Til forsiden
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Validation Error
  if (validation) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 bg-background">
        <div className="max-w-md w-full">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-destructive/10 p-2 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Valideringsfeil
              </h2>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {error instanceof Error ? error.message : "Ugyldig dataformat"}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => window.history.back()}
                className="flex-1 px-4 py-2.5 bg-muted text-foreground font-medium rounded-lg hover:bg-accent transition-colors border border-border"
              >
                Gå tilbake
              </button>
              <Link
                href={cfg.path}
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors text-center"
              >
                Til oversikt
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generic/Server Error
  const errorCode =
    error instanceof ContentServiceError ? error.code : "UNKNOWN_ERROR";
  const errorMessage = error instanceof Error ? error.message : "Ukjent feil";

  return (
    <div className="absolute inset-0 mt-16 flex-1 flex items-center justify-center px-4 bg-background">
      <div className="max-w-lg w-full">
        <div className="bg-card shadow-xl border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-destructive dark:bg-destructive/50 p-6 text-destructive-foreground">
            <div className="flex items-center gap-6">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <div>
                <h2 className="text-lg font-semibold">Noe gikk galt</h2>
                <p className="text-destructive-foreground/80 text-sm">
                  Feilkode: {errorCode}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vi beklager, men vi kunne ikke laste {cfg.title.toLowerCase()}.
              Dette kan skyldes en midlertidig feil.
            </p>

            {process.env.NODE_ENV === "development" && (
              <div className="mb-6 p-4 bg-muted overflow-auto border border-border">
                <code className="text-xs text-foreground font-mono break-all">
                  {errorMessage}
                </code>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`}
                />
                {isRetrying ? "Laster..." : "Prøv på nytt"}
              </button>

              <div className="flex gap-3">
                <Link
                  href={cfg.path}
                  className="flex-1 px-4 py-2 bg-muted text-foreground font-medium hover:bg-accent transition-colors border border-border text-center"
                >
                  Til oversikt
                </Link>
                <Link
                  href="/"
                  className="flex-1 px-4 py-2 bg-muted text-foreground font-medium hover:bg-accent transition-colors border border-border text-center"
                >
                  Forsiden
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted px-6 py-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Hvis problemet vedvarer,{" "}
              <a
                className="underline hover:text-primary"
                href={SITE_URLS.CONTACT}
              >
                kontakt{" "}
              </a>
              support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
