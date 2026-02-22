"use client";

import * as React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ResourcesTopBar } from "./top-bar";
import { ResourcesSidebar, ResourcesSidebarSkeleton } from "./sidebar";
import { usePathname } from "next/navigation";
import { ScrollContainerProvider } from "@/context/scroll-container-provider";

// ============================================================================
// LAYOUT SHELL COMPONENT
// ============================================================================

export default function ResourcesLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Determine current section
  const currentSection = React.useMemo(() => {
    if (pathname === "/ressurser") return "overview";
    if (pathname.startsWith("/ressurser/artikler")) return "artikler";
    if (pathname.startsWith("/ressurser/videoer")) return "videoer";
    if (pathname.startsWith("/ressurser/verktoy")) return "verktoy";
    return "overview";
  }, [pathname]);

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <SidebarProvider
        defaultOpen={currentSection !== "overview"}
        className="flex-1 flex min-h-0 h-full"
      >
        <React.Suspense fallback={<ResourcesSidebarSkeleton />}>
          <ResourcesSidebar currentSection={currentSection} />
        </React.Suspense>
        <SidebarInset
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-y-auto"
        >
          <React.Suspense
            fallback={<div className="h-16 border-b bg-background" />}
          >
            <ResourcesTopBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
          </React.Suspense>
          <ScrollContainerProvider containerRef={scrollContainerRef}>
            {children}
          </ScrollContainerProvider>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
