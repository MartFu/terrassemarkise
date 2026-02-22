// components/error-boundary.tsx
"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorDisplay } from "./error-display";
import { ContentServiceError } from "@/lib/content-loader.error";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  context?: "veiledning" | "juridisk" | string;
  slug?: string;
}

interface State {
  hasError: boolean;
  error?: Error | ContentServiceError;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      context: this.props.context,
      slug: this.props.slug,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorDisplay
          error={this.state.error}
          context={this.props.context}
          slug={this.props.slug}
        />
      );
    }

    return this.props.children;
  }
}
