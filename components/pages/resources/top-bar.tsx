"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
// ============================================================================
// TOP BAR COMPONENT
// ============================================================================

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  History,
  LayoutGrid,
  List,
  Search,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface ResourcesTopBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export function ResourcesTopBar({
  searchQuery,
  onSearchChange,
  isSearchOpen,
  setIsSearchOpen,
}: ResourcesTopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { open: sidebarOpen } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mobileBreadCrumbsOpen, setMobileBreadCrumbsOpen] = useState(false);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle search submission
  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set("q", searchQuery);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // Clear search
  const clearSearch = () => {
    onSearchChange("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    inputRef.current?.focus();
  };

  const closeBreadcrumbs = useCallback(() => {
    setMobileBreadCrumbsOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileBreadCrumbsOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      const clickedOutsideMenu =
        breadcrumbRef.current && !breadcrumbRef.current.contains(target);
      const clickedOutsideButton =
        buttonRef.current && !buttonRef.current.contains(target);

      if (clickedOutsideMenu && clickedOutsideButton) {
        setMobileBreadCrumbsOpen(false);
      }
    };

    // Handle scrolling outside
    const handleScroll = () => {
      closeBreadcrumbs();
    };

    // Add listeners for click/tap
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Add listener for scroll (use capture: true to catch scrolls in sub-elements)
    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [mobileBreadCrumbsOpen, closeBreadcrumbs]);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4">
      {mobileBreadCrumbsOpen && (
        <div
          ref={breadcrumbRef}
          className="absolute z-1 shadow-sm h-12 -bottom-10 border-y inset-x-0 bg-card flex items-center px-2 py-1"
        >
          <ResourcesBreadcrumbs className="md:hidden!" />
        </div>
      )}
      <div className="flex flex-1 items-center gap-4">
        {/* Mobile Menu Trigger */}
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger
              size={"icon-lg"}
              className={cn(sidebarOpen ? "rotate-0" : "rotate-180")}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {sidebarOpen ? "Lukk sidemenyen" : "Åpne sidemenyen"}
          </TooltipContent>
        </Tooltip>

        <div className="relative md:hidden">
          <Button
            ref={buttonRef}
            onClick={() => setMobileBreadCrumbsOpen(!mobileBreadCrumbsOpen)}
            variant="ghost"
            size="icon"
            className={cn(
              "relative z-2",
              mobileBreadCrumbsOpen && "text-primary",
            )}
          >
            <History className="pointer-events-none" />
          </Button>
          {mobileBreadCrumbsOpen && (
            <div className="absolute z-1 border-x border-t rounded-t-md w-12 h-10.5 bg-card left-1/2 -translate-x-1/2 top-0" />
          )}
        </div>

        {/* Breadcrumbs */}
        <ResourcesBreadcrumbs className="hidden! md:block" />
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar - Expands on focus */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={false}
            animate={{ width: isSearchOpen ? 320 : 40 }}
            className="relative flex items-center"
          >
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                ref={inputRef}
                placeholder="Søk i ressurser..."
                className={cn(
                  "h-9 pl-3 pr-8 transition-all",
                  isSearchOpen
                    ? "w-full opacity-100"
                    : "w-10 opacity-0 cursor-pointer",
                )}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false);
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
            {!isSearchOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 h-9 w-9 bg-background"
                onClick={handleSearchOpen}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>

        <Separator orientation="vertical" className="h-6" />

        {/* View Toggle (List/Grid) - Only relevant for list views */}
        <ViewToggle />

        {/* Help/Info Button */}
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

// ============================================================================
// BREADCRUMBS COMPONENT
// ============================================================================

function ResourcesBreadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const items = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    const isLast = index === paths.length - 1;

    // Map paths to readable names
    const labelMap: Record<string, string> = {
      ressurser: "Ressurser",
      artikler: "Artikler",
      videoer: "Videoer",
      verktoy: "Verktøy",
    };

    return { href, label: labelMap[path] || path, isLast };
  });

  if (paths.length === 0) return null;

  return <Breadcrumbs className={className} breadcrumbs={items} />;
}

// ============================================================================
// VIEW TOGGLE COMPONENT
// ============================================================================

function ViewToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentView = searchParams.get("view") || "grid";

  const setView = (view: "grid" | "list") => {
    const params = new URLSearchParams(searchParams);
    params.set("view", view);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Only show on list pages
  const isListPage = pathname.match(/\/ressurser\/(artikler|videoer)$/);
  if (!isListPage) return null;

  return (
    <div className="flex items-center rounded-md border bg-muted p-1">
      <Button
        variant={currentView === "grid" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => setView("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={currentView === "list" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => setView("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
