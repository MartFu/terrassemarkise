"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorDisplay } from "./error-display";
import { ContentError } from "@/lib/content-service.client"; // Import from client version

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

export class ClientErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to your error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // Example: Send to error reporting service
    // this.logErrorToService(error, errorInfo);
  }

  private isContentError(error: unknown): error is ContentError {
    return error instanceof Error && 
           (error instanceof ContentError || 
            error.name === 'ContentError' ||
            'code' in error && 'status' in error);
  }

 private convertToContentError(error: unknown): ContentError {
    // 1. Check if it's already the right shape/class
    if (this.isContentError(error)) {
      return error;
    }

    // 2. Cast to unknown/any to bypass the 'never' narrowing
    const errorToCheck = error as any;

    if (errorToCheck instanceof Error) {
      return new ContentError(
        errorToCheck.message || "An unexpected error occurred",
        "RENDER_ERROR",
        500
      );
    }

    // 3. Fallback for non-Error objects
    return new ContentError(
      typeof error === "string" ? error : "An unexpected error occurred during rendering",
      "UNKNOWN_ERROR",
      500
    );
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Convert error to ContentError for consistent handling
      const contentError = this.convertToContentError(this.state.error);
      
      return (
        <ErrorDisplay
          error={contentError}
          context={this.props.context || "veiledning"}
          slug={this.props.slug || ""}
        />
      );
    }

    return this.props.children;
  }
}