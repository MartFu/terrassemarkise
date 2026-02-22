"use client";

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================
import { BookOpen, Video, Wrench, LayoutGrid, Send } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
  SidebarFooter,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence } from "framer-motion";
import { ArticleFilters, QuickStats, ToolsInfo, VideoFilters } from "./groups";
import { Text } from "@/components/ui/typography";
import { SITE_URLS } from "@/lib/constants";

export { ResourcesSidebarSkeleton } from "./skeleton";

// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================

export type ResourceType = "artikler" | "videoer" | "verktoy" | "overview";

interface ResourceSection {
  id: ResourceType | "overview";
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: "overview",
    label: "Oversikt",
    href: "/ressurser",
    icon: LayoutGrid,
    description: "Alle ressurser",
    color: "text-muted-foreground",
  },
  {
    id: "artikler",
    label: "Artikler",
    href: "/ressurser/artikler",
    icon: BookOpen,
    description: "Guider, tips og inspirasjon",
    color: "text-blue-600",
  },
  {
    id: "videoer",
    label: "Videoer",
    href: "/ressurser/videoer",
    icon: Video,
    description: "Montering og vedlikehold",
    color: "text-red-600",
  },
  {
    id: "verktoy",
    label: "Verktøy",
    href: "/ressurser/verktoy",
    icon: Wrench,
    description: "Befaring og beregning",
    color: "text-amber-600",
  },
];

export function ResourcesSidebar({
  currentSection,
  ...props
}: React.ComponentProps<typeof Sidebar> & { currentSection: ResourceType }) {
  const { setOpenMobile } = useSidebar();

  const closeMobile = () => setOpenMobile(false);

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100vh-var(--header-height)-var(--footer-compact-height))]"
      {...props}
    >
      <SidebarHeader className="border-b flex items-between justify-center w-full h-16 px-4">
        <Link
          href="/ressurser"
          className="flex items-center justify-between gap-3 group"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground/80">
              Ressurser
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              Kunnskap og verktøy
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 min-h-0 flex">
        <ScrollArea className="flex-1 min-h-0 pr-1">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>Navigasjon</SidebarGroupLabel>
            <SidebarGroupContent>
              <Stack direction="col" space={1}>
                {RESOURCE_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = currentSection === section.id;

                  return (
                    <SidebarMenuButton
                      key={section.id}
                      asChild
                      onClick={closeMobile}
                      className="hover:bg-muted/40 hover:text-foreground"
                    >
                      <Link
                        href={section.href}
                        className={cn(
                          "w-full justify-between items-center gap-3 h-11",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <div className="flex flex-col gap-0.5 items-start">
                          <span className="text-sm font-medium">
                            {section.label}
                          </span>
                          <span className="text-[11px] text-muted-foreground leading-none">
                            {section.description}
                          </span>
                        </div>
                        <Icon className={cn("h-4 w-4")} />
                      </Link>
                    </SidebarMenuButton>
                  );
                })}
              </Stack>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-3 mx-1" />

          {/* Context-Aware Filters */}
          <AnimatePresence mode="wait">
            {currentSection === "artikler" && <ArticleFilters key="artikler" />}
            {currentSection === "videoer" && <VideoFilters key="videoer" />}
            {currentSection === "verktoy" && <ToolsInfo key="verktoy" />}
            {currentSection === "overview" && <QuickStats key="overview" />}
          </AnimatePresence>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-0">
        <Stack
          space={2}
          className="bg-background px-4 py-2 border-t text-foreground text-center"
        >
          <Text size={"xs"} weight={"medium"}>
            Finner du ikke det du leter etter?
          </Text>
          <Button
            variant="outline"
            size="sm"
            className="justify-center rounded-none bg-card"
            asChild
          >
            <Link href={SITE_URLS.CONTACT}>
              Kontakt oss
              <Send />
            </Link>
          </Button>
        </Stack>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
