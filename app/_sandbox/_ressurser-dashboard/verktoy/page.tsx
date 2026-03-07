// app/ressurser/verktoy/page.tsx
import Link from "next/link";
import { ArrowRight, Calculator, Tag, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/error-boundary";
import { Stack } from "@/components/ui/stack";
import { SITE_URLS } from "@/lib/constants";

// ============================================================================
// TYPES
// ============================================================================

type ToolStatus = "available" | "beta" | "coming-soon";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: ToolStatus;
}

// ============================================================================
// DATA
// ============================================================================

const TOOLS: Tool[] = [
  {
    id: "befaringsveileder",
    title: "Befaringsveileder",
    description:
      "Svar på noen enkle spørsmål om utearealet ditt, og få en anbefaling om riktig markisetype, størrelse og feste.",
    icon: Calculator,
    status: "available",
  },
  {
    id: "stoffvelger",
    title: "Stoffvelger",
    description:
      "Utforsk farger og stoffkvaliteter i utvidet virkelighet (AR) direkte på fasaden din.",
    icon: Tag,
    status: "beta",
  },
  {
    id: "monteringskalkulator",
    title: "Monteringskalkulator",
    description:
      "Beregn estimert monteringstid og kostnad basert på type markise og monteringsforhold.",
    icon: Clock,
    status: "coming-soon",
  },
];

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

function StatusBadge({ status }: { status: ToolStatus }) {
  if (status === "beta") {
    return (
      <Badge variant="secondary" className="text-[11px]">
        Beta
      </Badge>
    );
  }
  if (status === "coming-soon") {
    return (
      <Badge variant="outline" className="text-[11px]">
        Kommer snart
      </Badge>
    );
  }
  return null;
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const isDisabled = tool.status === "coming-soon";

  const inner = (
    <div
      className={
        isDisabled
          ? "group flex gap-5 rounded-xl border border-border bg-card p-6 opacity-60"
          : "group flex gap-5 rounded-xl border border-border bg-card p-6 hover:bg-accent/30 transition-colors"
      }
    >
      <div className="shrink-0 rounded-lg border border-border bg-background p-3 h-fit">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1.5">
          <h2 className="text-base font-semibold text-foreground">
            {tool.title}
          </h2>
          <StatusBadge status={tool.status} />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
      </div>

      {!isDisabled && (
        <ArrowRight className="shrink-0 h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors self-center" />
      )}
    </div>
  );

  if (isDisabled) {
    return <div key={tool.id}>{inner}</div>;
  }

  return (
    <Link key={tool.id} href={`${SITE_URLS.TOOLS}${tool.id}`}>
      {inner}
    </Link>
  );
}

// ============================================================================
// PAGE (SERVER COMPONENT)
// ============================================================================

export default function Page() {
  const available = TOOLS.filter((t) => t.status === "available");
  const rest = TOOLS.filter((t) => t.status !== "available");

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Verktøy</h1>
        <p className="text-sm text-muted-foreground">
          Interaktive hjelpemidler for planlegging, valg og montering.
        </p>
      </div>

      <ErrorBoundary context="ressurser" slug="verktoy">
        <Stack space={8}>
          <Stack space={2}>
            {available.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </Stack>

          {rest.length > 0 && (
            <Stack space={4}>
              <div className="pt-2 pb-1">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
                  Under utvikling
                </p>
              </div>
              <Stack space={2}>
                {rest.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </ErrorBoundary>
    </div>
  );
}
