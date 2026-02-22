"use client";

import * as React from "react";
import type { ContentIndex } from "@/lib/content-loader.types";

// ============================================================================
// TYPES
// ============================================================================

export interface ResourcesData {
  artikler: ContentIndex;
  videoer: ContentIndex;
}

interface ResourcesContextValue {
  data: ResourcesData;
}

// ============================================================================
// CONTEXT
// ============================================================================

const ResourcesContext = React.createContext<ResourcesContextValue | null>(
  null,
);

export function useResources(): ResourcesContextValue {
  const ctx = React.useContext(ResourcesContext);
  if (!ctx) {
    throw new Error("useResources must be used within ResourcesProvider");
  }
  return ctx;
}

export function useArticles(): ContentIndex {
  return useResources().data.artikler;
}

export function useVideos(): ContentIndex {
  return useResources().data.videoer;
}

// ============================================================================
// PROVIDER
// ============================================================================

interface ResourcesProviderProps {
  data: ResourcesData;
  children: React.ReactNode;
}

export function ResourcesProvider({ data, children }: ResourcesProviderProps) {
  const value = React.useMemo<ResourcesContextValue>(() => ({ data }), [data]);
  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
}
