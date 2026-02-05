// app/components/error-boundary.tsx
"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorDisplay } from "./error-display";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  context?: "veiledning" | "juridisk";
  slug?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
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
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorDisplay
          error={this.state.error}
          context={this.props.context || "veiledning"}
          slug={this.props.slug || ""}
        />
      );
    }

    return this.props.children;
  }
}