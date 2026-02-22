"use client";

// ============================================================================
// SIDEBAR SKELETON / SUSPENSE COMPONENT
// ============================================================================

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Stack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";

// ============================================================================
// PRIMITIVE SKELETON
// ============================================================================

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted/60", className)} />
  );
}

// ============================================================================
// NAV ITEM SKELETON — mirrors the nav buttons in ResourcesSidebar
// ============================================================================

function NavItemSkeleton() {
  return (
    <div className="flex items-center justify-between gap-3 h-11 px-3 rounded-md">
      <div className="flex flex-col gap-1.5 flex-1">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-2.5 w-32" />
      </div>
      <Skeleton className="h-4 w-4 shrink-0" />
    </div>
  );
}

// ============================================================================
// FILTER BLOCK SKELETON — mirrors the context-aware filter groups
// ============================================================================

function FilterSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Skeleton className="h-3 w-16" />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <Stack direction="col" space={2} className="px-1">
          {/* Search / input line */}
          <Skeleton className="h-8 w-full rounded-md" />
          {/* Tag chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[44, 56, 36, 60, 48].map((w, i) => (
              <Skeleton key={i} className="h-5 rounded-full" />
            ))}
          </div>
          {/* List items */}
          <div className="space-y-2 pt-1">
            {[70, 55, 80].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-sm shrink-0" />
                <Skeleton className="h-3 rounded" />
              </div>
            ))}
          </div>
        </Stack>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

// ============================================================================
// FOOTER CTA SKELETON
// ============================================================================

function FooterSkeleton() {
  return (
    <div className="rounded-md p-4 bg-linear-to-t from-accent/15 via-card/70 to-card border space-y-3">
      <Skeleton className="h-3 w-36 mx-auto" />
      <Skeleton className="h-7 w-full rounded-md" />
    </div>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export function ResourcesSidebarSkeleton(
  props: React.ComponentProps<typeof Sidebar>,
) {
  return (
    <Sidebar
      className="top-[calc(var(--header-height))] h-[calc(100svh-var(--header-height)-var(--footer-compact-height))]!"
      {...props}
    >
      {/* Header */}
      <SidebarHeader className="border-b flex items-between justify-center w-full h-16 px-4">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-[calc(100svh-var(--header-height)-var(--footer-compact-height)-4rem)] pr-1">
          {/* Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <Skeleton className="h-3 w-20" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Stack direction="col" space={1}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <NavItemSkeleton key={i} />
                ))}
              </Stack>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-3 mx-1" />

          {/* Context filters placeholder */}
          <FilterSkeleton />
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <SidebarContent>
          <FooterSkeleton />
        </SidebarContent>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
//
// In your layout or page:
//
//   import { Suspense } from "react";
//   import { ResourcesSidebar } from "./sidebar";
//   import { ResourcesSidebarSkeleton } from "./sidebar-skeleton";
//
//   <Suspense fallback={<ResourcesSidebarSkeleton />}>
//     <ResourcesSidebar />
//   </Suspense>
//
// ============================================================================
