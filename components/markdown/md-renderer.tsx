"use client";

import { useCallback, useMemo, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";

import type { PluggableList } from "unified";
import {
  ExternalLink,
  Link as LinkIcon,
  Info,
  AlertTriangle,
  Lightbulb,
  AlertCircle,
  BookOpen,
} from "lucide-react";

import { MarkdownRendererProps } from "./types";
import { extractTextFromChildren, generateHeadingId } from "./utils";
import { cn } from "@/lib/utils";

import { MarkdownImage } from "./md-image";
import { MarkdownTable } from "./md-table";
import { preprocessDirectives } from "./remark-directives";
import { Lightbox } from "../lightbox";

// ============================================================================
// Callout configuration
// ============================================================================

type CalloutKind = "info" | "warning" | "tip" | "danger" | "note";

const CALLOUT_CONFIG: Record<
  CalloutKind,
  {
    icon: React.ElementType;
    label: string;
    containerCls: string;
    iconCls: string;
    labelCls: string;
    borderCls: string;
  }
> = {
  info: {
    icon: Info,
    label: "Info",
    containerCls: "bg-blue-50/60 dark:bg-blue-950/30",
    borderCls: "border-blue-400/60 dark:border-blue-500/50",
    iconCls: "text-blue-500 dark:text-blue-400",
    labelCls: "text-blue-700 dark:text-blue-300",
  },
  warning: {
    icon: AlertTriangle,
    label: "Advarsel",
    containerCls: "bg-amber-50/60 dark:bg-amber-950/30",
    borderCls: "border-amber-400/60 dark:border-amber-500/50",
    iconCls: "text-amber-500 dark:text-amber-400",
    labelCls: "text-amber-700 dark:text-amber-300",
  },
  tip: {
    icon: Lightbulb,
    label: "Tips",
    containerCls: "bg-emerald-50/60 dark:bg-emerald-950/30",
    borderCls: "border-emerald-400/60 dark:border-emerald-500/50",
    iconCls: "text-emerald-500 dark:text-emerald-400",
    labelCls: "text-emerald-700 dark:text-emerald-300",
  },
  danger: {
    icon: AlertCircle,
    label: "Viktig",
    containerCls: "bg-red-50/60 dark:bg-red-950/30",
    borderCls: "border-red-400/60 dark:border-red-500/50",
    iconCls: "text-red-500 dark:text-red-400",
    labelCls: "text-red-700 dark:text-red-300",
  },
  note: {
    icon: BookOpen,
    label: "Merk",
    containerCls: "bg-violet-50/60 dark:bg-violet-950/30",
    borderCls: "border-violet-400/60 dark:border-violet-500/50",
    iconCls: "text-violet-500 dark:text-violet-400",
    labelCls: "text-violet-700 dark:text-violet-300",
  },
};

// ============================================================================
// Grid cols map
// ============================================================================

const GRID_COLS: Record<string, string> = {
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-2 lg:grid-cols-4",
};

// ============================================================================
// Sanitize schema — allow our data-* attributes through rehype-sanitize
// ============================================================================

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [
      ...(defaultSchema.attributes?.div ?? []),
      "dataDirective",
      "dataCols",
      "dataKind",
    ],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "dataGridImage",
      "src",
      "alt",
      "title",
      "loading",
    ],
  },
};

// ============================================================================
// Main Component: MarkdownRenderer
// ============================================================================

export function MarkdownRenderer({
  content,
  className,
  variant = "default",
  enableMath = true,
  enableEmoji = true,
  baseUrl = "",
  onHeadingClick,
  onLinkClick,
  onImageClick,
  customComponents = {},
  allowedElements,
  disallowedElements,
}: MarkdownRendererProps) {
  // ── Lightbox state ──────────────────────────────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract all image URLs from the content (including grid images) so we can
  // support prev/next navigation in the lightbox.
  const allImageUrls = useMemo(() => {
    const urls: string[] = [];
    // Standard markdown images: ![alt](url)
    const mdImgRe = /!\[[^\]]*\]\(([^)"]+?)(?:\s+"[^"]*")?\)/g;
    let m: RegExpExecArray | null;
    while ((m = mdImgRe.exec(content)) !== null) {
      const src = m[1];
      const resolved =
        src.startsWith("http") || src.startsWith("/") || src.startsWith("data:")
          ? src
          : `${baseUrl}${src}`;
      urls.push(resolved);
    }
    return urls;
  }, [content, baseUrl]);

  const handleImageClick = useCallback(
    (src: string) => {
      // Forward to external handler if provided
      onImageClick?.(src);
      // Also open internal lightbox
      const idx = allImageUrls.indexOf(src);
      setLightboxIndex(idx >= 0 ? idx : 0);
    },
    [onImageClick, allImageUrls],
  );

  const remarkPlugins = useMemo((): PluggableList => {
    const plugins: PluggableList = [remarkGfm];
    if (enableMath) plugins.push(remarkMath);
    if (enableEmoji) plugins.push(remarkEmoji);
    return plugins;
  }, [enableMath, enableEmoji]);

  const rehypePlugins = useMemo((): PluggableList => {
    const plugins: PluggableList = [
      rehypeRaw,
      rehypeSlug,
      [
        rehypeAutoLinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"],
            ariaHidden: "true",
            tabIndex: "-1",
            role: "link",
          },
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["anchor-item"] },
            children: [],
          },
        },
      ],
    ];
    if (enableMath) plugins.push(rehypeKatex);
    plugins.push([rehypeSanitize, sanitizeSchema]);
    return plugins;
  }, [enableMath]);

  const handleHeadingClick = useCallback(
    (id: string, e: React.MouseEvent<HTMLHeadElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      onHeadingClick?.(id);
    },
    [onHeadingClick],
  );

  const components: Components = useMemo(() => {
    return {
      // -----------------------------------------------------------------------
      // Directive containers — rendered via rehype-raw as plain <div>s with
      // data attributes, then styled here.
      // -----------------------------------------------------------------------
      div({
        children,
        node,
        ...props
      }: React.HTMLAttributes<HTMLDivElement> & { node?: unknown }) {
        const el = node as
          | {
              properties?: {
                dataDirective?: string;
                dataCols?: string;
                dataKind?: string;
              };
            }
          | undefined;
        const directive = el?.properties?.dataDirective;

        // ---- Grid directive -----------------------------------------------
        if (directive === "grid") {
          const cols = el?.properties?.dataCols ?? "3";
          const gridCls = GRID_COLS[cols] ?? GRID_COLS["3"];

          // Children are <img> elements (already parsed by rehype)
          // We render them via MarkdownImage for full feature parity
          const imgChildren = Array.isArray(children) ? children : [children];

          return (
            <div className={cn("not-prose my-8 grid gap-3", gridCls)}>
              {imgChildren.map((child, idx) => {
                if (!child || typeof child !== "object") return null;
                // child is a React element rendered by rehype — extract props
                const el = child as React.ReactElement<{
                  src?: string;
                  alt?: string;
                  title?: string;
                }>;
                const { src, alt, title } = el.props ?? {};
                return (
                  <MarkdownImage
                    key={idx}
                    src={src}
                    alt={alt}
                    title={title}
                    onClick={handleImageClick}
                    baseUrl={baseUrl}
                    compact
                    uniformHeight
                  />
                );
              })}
            </div>
          );
        }

        // ---- Callout directive --------------------------------------------
        if (directive === "callout") {
          const kind = (el?.properties?.dataKind ?? "info") as CalloutKind;
          const cfg = CALLOUT_CONFIG[kind] ?? CALLOUT_CONFIG.info;
          const Icon = cfg.icon;

          return (
            <div
              className={cn(
                "not-prose my-6 flex gap-3 rounded-r-xl border-l-4 px-5 py-4",
                cfg.containerCls,
                cfg.borderCls,
              )}
            >
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", cfg.iconCls)} />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wide mb-1",
                    cfg.labelCls,
                  )}
                >
                  {cfg.label}
                </p>
                {/* Use div so remark-parsed children (p > a, strong, etc.) nest validly */}
                <div className="text-sm leading-tight text-foreground/80 [&_p]:m-0 [&_a]:text-current [&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium [&_a:hover]:opacity-75">
                  {children}
                </div>
              </div>
            </div>
          );
        }

        // Default div passthrough
        return <div {...props}>{children}</div>;
      },

      // -----------------------------------------------------------------------
      // Code blocks
      // -----------------------------------------------------------------------
      code({ className, children, ...props }) {
        return (
          <code
            className={cn(
              "rounded-md bg-muted/50 px-1.5 py-0.5 font-mono text-sm border border-border/50",
              className,
            )}
            {...props}
          >
            {children}
          </code>
        );
      },

      // -----------------------------------------------------------------------
      // Images — supports jpg, png, gif, svg, webp, avif natively
      // -----------------------------------------------------------------------
      img({ src, alt, title }) {
        return (
          <MarkdownImage
            src={src}
            alt={alt}
            title={title}
            onClick={handleImageClick}
            baseUrl={baseUrl}
          />
        );
      },

      // -----------------------------------------------------------------------
      // Links
      // -----------------------------------------------------------------------
      a({ href, className, children }) {
        const isExternal = href?.startsWith("http");
        const isHeadingLink = className?.includes("heading-anchor");

        return (
          <a
            href={href}
            onClick={(e) => {
              if (!isExternal && onLinkClick && href) {
                e.preventDefault();
                onLinkClick(href);
              }
            }}
            className={cn(
              "anchor group inline-flex items-center justify-between gap-1",
              "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",
              isExternal && "external-link",
              "in-[:is(h1,h2,h3,h4,h5,h6)]:hover:text-foreground/80",
              "in-[:is(h1,h2,h3,h4,h5,h6)]:no-underline text-foreground",
              isHeadingLink &&
                "text-foreground hover:text-foreground/80 transition-colors",
            )}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {children}
            {!isHeadingLink && (
              <LinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 h-4 w-4 in-[:is(h1,h2,h3,h4,h5,h6)]:inline in-[:is(p,li)]:hidden" />
            )}
            {isExternal && (
              <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 h-4 w-4" />
            )}
          </a>
        );
      },

      // -----------------------------------------------------------------------
      // Headings
      // -----------------------------------------------------------------------
      h1({ children, ...props }) {
        const id = generateHeadingId(extractTextFromChildren(children));
        return (
          <h1
            {...props}
            id={id}
            onClick={(e) => handleHeadingClick(id, e)}
            className="group scroll-m-(--header-height) mt-8 mb-4 text-2xl font-extrabold tracking-tight lg:text-3xl cursor-pointer hover:text-primary/90 transition-colors first:mt-0"
          >
            {children}
          </h1>
        );
      },
      h2({ children, ...props }) {
        const id = generateHeadingId(extractTextFromChildren(children));
        return (
          <h2
            {...props}
            id={id}
            onClick={(e) => handleHeadingClick(id, e)}
            className="group mt-12 mb-4 scroll-m-(--header-height) border-b border-border pb-2 text-xl font-semibold tracking-tight first:mt-0 cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h2>
        );
      },
      h3({ children, ...props }) {
        const id = generateHeadingId(extractTextFromChildren(children));
        return (
          <h3
            {...props}
            id={id}
            onClick={(e) => handleHeadingClick(id, e)}
            className="group mt-10 mb-3 scroll-m-(--header-height) text-lg font-semibold tracking-tight cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h3>
        );
      },
      h4({ children, ...props }) {
        const id = generateHeadingId(extractTextFromChildren(children));
        return (
          <h4
            {...props}
            id={id}
            onClick={(e) => handleHeadingClick(id, e)}
            className="group mt-8 mb-3 scroll-m-(--header-height) text-lg font-semibold tracking-tight cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h4>
        );
      },
      h5({ children, ...props }) {
        const id = generateHeadingId(extractTextFromChildren(children));
        return (
          <h5
            {...props}
            id={id}
            onClick={(e) => handleHeadingClick(id, e)}
            className="group mt-6 mb-2 scroll-m-(--header-height) text-lg font-semibold tracking-tight cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h5>
        );
      },
      h6({ children, ...props }) {
        const id = generateHeadingId(extractTextFromChildren(children));
        return (
          <h6
            {...props}
            id={id}
            onClick={(e) => handleHeadingClick(id, e)}
            className="group mt-6 mb-2 scroll-m-(--header-height) text-base font-semibold tracking-tight cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h6>
        );
      },

      // -----------------------------------------------------------------------
      // Tables
      // -----------------------------------------------------------------------
      table({ children }) {
        return <MarkdownTable>{children}</MarkdownTable>;
      },
      thead({ children }) {
        return <thead className="bg-muted/50">{children}</thead>;
      },
      th({ children }) {
        return (
          <th className="px-4 py-3 text-left font-semibold text-sm border-b-2 border-border">
            {children}
          </th>
        );
      },
      tbody({ children }) {
        return <tbody className="divide-y divide-border">{children}</tbody>;
      },
      tr({ children }) {
        return (
          <tr className="hover:bg-muted/30 transition-colors">{children}</tr>
        );
      },
      td({ children }) {
        return <td className="px-4 py-3 text-sm">{children}</td>;
      },

      // -----------------------------------------------------------------------
      // Lists
      // -----------------------------------------------------------------------
      ul({ children }) {
        return (
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2 space-y-2">
            {children}
          </ul>
        );
      },
      ol({ children }) {
        return (
          <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 space-y-2">
            {children}
          </ol>
        );
      },
      li({ children }) {
        return <li className="leading-7">{children}</li>;
      },

      // -----------------------------------------------------------------------
      // Blockquote
      // -----------------------------------------------------------------------
      blockquote({ children }) {
        return (
          <blockquote className="my-6 border-l-4 border-primary pl-6 italic text-muted-foreground bg-muted/20 py-4 rounded-r-lg">
            {children}
          </blockquote>
        );
      },

      // -----------------------------------------------------------------------
      // Misc inline
      // -----------------------------------------------------------------------
      hr() {
        return <hr className="my-8 border-border" />;
      },
      p({ children }) {
        return (
          <p className="leading-7 not-first:mt-6 text-foreground/90">
            {children}
          </p>
        );
      },
      strong({ children }) {
        return (
          <strong className="font-semibold text-foreground">{children}</strong>
        );
      },
      em({ children }) {
        return <em className="italic">{children}</em>;
      },
      del({ children }) {
        return (
          <del className="line-through text-muted-foreground">{children}</del>
        );
      },

      ...customComponents,
    };
  }, [
    handleImageClick,
    onLinkClick,
    handleHeadingClick,
    baseUrl,
    customComponents,
  ]);

  const variantStyles = useMemo(() => {
    const styles = {
      default: "prose prose-neutral dark:prose-invert max-w-none",
      compact: "prose prose-sm prose-neutral dark:prose-invert max-w-none",
      full: "prose prose-lg prose-neutral dark:prose-invert max-w-none",
      article:
        "prose prose-lg prose-neutral dark:prose-invert mx-auto max-w-3xl",
    };
    return styles[variant];
  }, [variant]);

  if (!content || content.trim().length === 0) {
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground border border-dashed border-border rounded-lg">
        <p>No content to display</p>
      </div>
    );
  }

  return (
    <>
      <div className={cn(variantStyles, className)}>
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          components={components}
          allowedElements={allowedElements}
          disallowedElements={disallowedElements}
          unwrapDisallowed
        >
          {preprocessDirectives(content)}
        </ReactMarkdown>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={allImageUrls}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </>
  );
}

export default MarkdownRenderer;
