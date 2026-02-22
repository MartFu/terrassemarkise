// components/resources/sidebar-filters.tsx
"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Video,
  Wrench,
  Calculator,
  Tag,
  Clock,
  RotateCcw,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useArticles, useVideos } from "@/context/resources-provider";

// ============================================================================
// STATIC FILTER DATA
// ============================================================================

const ARTICLE_CATEGORIES = [
  { id: "montering", label: "Montering" },
  { id: "vedlikehold", label: "Vedlikehold" },
  { id: "inspirasjon", label: "Inspirasjon" },
  { id: "produkter", label: "Produkter" },
  { id: "vind-og-vaer", label: "Vind og vær" },
] as const;

const VIDEO_CATEGORIES = [
  { id: "montering", label: "Montering" },
  { id: "vedlikehold", label: "Vedlikehold" },
  { id: "produktomtaler", label: "Produktomtaler" },
] as const;

const DIFFICULTY_LEVELS = [
  { id: "nybegynner", label: "Nybegynner", className: "bg-green-500" },
  { id: "middels", label: "Middels", className: "bg-yellow-500" },
  { id: "avansert", label: "Avansert", className: "bg-red-500" },
] as const;

// ============================================================================
// SHARED HOOK
// ============================================================================

function useFilterParam(key: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const values = searchParams.getAll(key);

  const toggle = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (values.includes(value)) {
      params.delete(key);
      values.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const set = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  return { values, toggle, set, current: searchParams.get(key) ?? "" };
}

// ============================================================================
// SHARED PRIMITIVES
// ============================================================================

interface FilterRowProps {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
  indicator?: React.ReactNode;
}

function FilterRow({
  id,
  label,
  count,
  checked,
  onToggle,
  indicator,
}: FilterRowProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between py-0.5 pl-2 cursor-pointer group"
    >
      <div className="flex items-center gap-2.5">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onToggle}
          className="h-3.5 w-3.5"
        />
        {indicator}
        <span className="text-sm text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors">
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-[11px] text-sidebar-foreground/40 tabular-nums">
          {count}
        </span>
      )}
    </label>
  );
}

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-0.5">
      <p className="text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40 mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

// ============================================================================
// ARTICLE FILTERS
// ============================================================================

export function ArticleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const artikler = useArticles();

  const { values: kategorier, toggle: toggleKategori } =
    useFilterParam("kategori");
  const { values: vanskelighet, toggle: toggleVanskelighet } =
    useFilterParam("vanskelighet");
  const { set: setLestetid, current: lestetid } = useFilterParam("lestetid");
  const hasActive = searchParams.toString().length > 0;

  // Derive counts from live context data
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of artikler.items) {
      for (const kw of item.frontmatter.keywords ?? []) {
        counts[kw] = (counts[kw] ?? 0) + 1;
      }
    }
    return counts;
  }, [artikler.items]);

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between">
        <SidebarGroupLabel>Filter</SidebarGroupLabel>
        {hasActive && (
          <Button
            variant="secondary"
            size="sm"
            className="h-6 px-2 text-[11px] text-muted-foreground hover:text-foreground"
            onClick={() => router.push(pathname)}
          >
            <RotateCcw className="w-3.5! h-3.5!" />
            Nullstill
          </Button>
        )}
      </div>

      <SidebarGroupContent className="space-y-5 p-2 pt-1">
        <FilterSection label="Kategori">
          {ARTICLE_CATEGORIES.map((cat) => (
            <FilterRow
              key={cat.id}
              id={`kat-${cat.id}`}
              label={cat.label}
              count={categoryCounts[cat.id]}
              checked={kategorier.includes(cat.id)}
              onToggle={() => toggleKategori(cat.id)}
            />
          ))}
        </FilterSection>

        <FilterSection label="Vanskelighetsgrad">
          {DIFFICULTY_LEVELS.map((level) => (
            <FilterRow
              key={level.id}
              id={`vans-${level.id}`}
              label={level.label}
              checked={vanskelighet.includes(level.id)}
              onToggle={() => toggleVanskelighet(level.id)}
              indicator={
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full inline-block",
                    level.className,
                  )}
                />
              }
            />
          ))}
        </FilterSection>

        <FilterSection label="Lestetid">
          <Select value={lestetid} onValueChange={setLestetid}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="Alle lengder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-1">Alle lengder</SelectItem>
              <SelectItem value="5">Under 5 min</SelectItem>
              <SelectItem value="10">5-10 min</SelectItem>
              <SelectItem value="20">10-20 min</SelectItem>
              <SelectItem value="30">Over 20 min</SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

// ============================================================================
// VIDEO FILTERS
// ============================================================================

export function VideoFilters() {
  const videoer = useVideos();
  const { values: kategorier, toggle: toggleKategori } =
    useFilterParam("kategori");
  const { set: setVarighet, current: varighet } = useFilterParam("varighet");

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of videoer.items) {
      for (const kw of item.frontmatter.keywords ?? []) {
        counts[kw] = (counts[kw] ?? 0) + 1;
      }
    }
    return counts;
  }, [videoer.items]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filter</SidebarGroupLabel>

      <SidebarGroupContent className="space-y-5 p-2 pt-1">
        <FilterSection label="Kategori">
          {VIDEO_CATEGORIES.map((cat) => (
            <FilterRow
              key={cat.id}
              id={`vkat-${cat.id}`}
              label={cat.label}
              count={categoryCounts[cat.id]}
              checked={kategorier.includes(cat.id)}
              onToggle={() => toggleKategori(cat.id)}
            />
          ))}
        </FilterSection>

        <FilterSection label="Varighet">
          <Select value={varighet} onValueChange={setVarighet}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="Alle lengder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-1">Alle lengder</SelectItem>
              <SelectItem value="5">Under 5 min</SelectItem>
              <SelectItem value="15">5-15 min</SelectItem>
              <SelectItem value="30">Over 15 min</SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

// ============================================================================
// TOOLS INFO
// ============================================================================

type ToolStatus = "available" | "beta" | "coming-soon";

interface Tool {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  status: ToolStatus;
}

const TOOLS: Tool[] = [
  {
    id: "befaringsveileder",
    title: "Befaringsveileder",
    icon: Calculator,
    status: "available",
  },
  { id: "stoffvelger", title: "Stoffvelger", icon: Tag, status: "beta" },
  {
    id: "monteringskalkulator",
    title: "Monteringskalkulator",
    icon: Clock,
    status: "coming-soon",
  },
];

export function ToolsInfo() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Verktøy</SidebarGroupLabel>
      <SidebarGroupContent className="space-y-1 pt-1">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isDisabled = tool.status === "coming-soon";
          const inner = (
            <div
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-2 transition-colors",
                isDisabled
                  ? "opacity-50 cursor-default"
                  : "hover:bg-sidebar-accent cursor-pointer",
              )}
            >
              <Icon className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
              <span className="text-sm text-sidebar-foreground/80 flex-1">
                {tool.title}
              </span>
              {tool.status === "beta" && (
                <Badge
                  variant="secondary"
                  className="text-[10px] h-4 px-1.5 py-0"
                >
                  Beta
                </Badge>
              )}
              {tool.status === "coming-soon" && (
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 px-1.5 py-0"
                >
                  Snart
                </Badge>
              )}
            </div>
          );
          return isDisabled ? (
            <div key={tool.id}>{inner}</div>
          ) : (
            <Link key={tool.id} href={`/ressurser/verktoy/${tool.id}`}>
              {inner}
            </Link>
          );
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

// ============================================================================
// QUICK STATS — live counts from context
// ============================================================================

export function QuickStats() {
  const artikler = useArticles();
  const videoer = useVideos();

  const stats = [
    { label: "Artikler", value: artikler.totalCount, icon: BookOpen },
    { label: "Videoer", value: videoer.totalCount, icon: Video },
    { label: "Verktøy", value: 3, icon: Wrench },
  ] as const;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Innhold</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="space-y-0.5">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center justify-between px-2 py-1.5"
            >
              <div className="flex items-center gap-2.5 text-sidebar-foreground/60">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-sm">{label}</span>
              </div>
              <span className="text-sm font-medium text-sidebar-foreground/60 tabular-nums">
                {value}
              </span>
            </div>
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
