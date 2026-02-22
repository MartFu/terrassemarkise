"use client";

import { useCallback, useMemo } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";

import type { PluggableList } from "unified";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

import { MarkdownRendererProps } from "./types";
import { extractTextFromChildren, generateHeadingId } from "./utils";
import { cn } from "@/lib/utils";

// Import sub-components
import { MarkdownImage } from "./md-image";
import { MarkdownTable } from "./md-table";

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
  // Configure remark plugins
  const remarkPlugins = useMemo((): PluggableList => {
    const plugins: PluggableList = [remarkGfm];

    if (enableMath) plugins.push(remarkMath);
    if (enableEmoji) plugins.push(remarkEmoji);

    return plugins;
  }, [enableMath, enableEmoji]);

  // Configure rehype plugins
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
            properties: {
              className: ["anchor-item"],
            },
            children: [],
          },
        },
      ],
    ];

    if (enableMath) plugins.push(rehypeKatex);
    plugins.push(rehypeSanitize);

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

  // Define custom components
  const components: Components = useMemo(() => {
    return {
      // Code blocks
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

      // Images
      img({ src, alt, title }) {
        return (
          <MarkdownImage
            src={src}
            alt={alt}
            title={title}
            onClick={onImageClick}
            baseUrl={baseUrl}
          />
        );
      },

      // Links
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

      // Headings with auto-generated IDs
      h1({ children, ...props }) {
        const textContent = extractTextFromChildren(children);
        const id = generateHeadingId(textContent);

        return (
          <h1
            {...props}
            id={id}
            onClick={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
              handleHeadingClick(id, e)
            }
            className="group scroll-m-(--header-height) mt-8 mb-4 text-2xl font-extrabold tracking-tight lg:text-3xl cursor-pointer hover:text-primary/90 transition-colors first:mt-0"
          >
            {children}
          </h1>
        );
      },
      h2({ children, ...props }) {
        const textContent = extractTextFromChildren(children);
        const id = generateHeadingId(textContent);

        return (
          <h2
            {...props}
            id={id}
            onClick={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
              handleHeadingClick(id, e)
            }
            className="group mt-12 mb-4 scroll-m-(--header-height) border-b border-border pb-2 text-xl font-semibold tracking-tight first:mt-0 cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h2>
        );
      },
      h3({ children, ...props }) {
        const textContent = extractTextFromChildren(children);
        const id = generateHeadingId(textContent);

        return (
          <h3
            {...props}
            id={id}
            onClick={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
              handleHeadingClick(id, e)
            }
            className="group mt-10 mb-3 scroll-m-(--header-height) text-lg font-semibold tracking-tight cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h3>
        );
      },
      h4({ children, ...props }) {
        const textContent = extractTextFromChildren(children);
        const id = generateHeadingId(textContent);

        return (
          <h4
            {...props}
            id={id}
            onClick={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
              handleHeadingClick(id, e)
            }
            className="group mt-8 mb-3 scroll-m-(--header-height) text-lg font-semibold tracking-tight cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h4>
        );
      },
      h5({ children, ...props }) {
        const textContent = extractTextFromChildren(children);
        const id = generateHeadingId(textContent);

        return (
          <h5
            {...props}
            id={id}
            onClick={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
              handleHeadingClick(id, e)
            }
            className="group mt-6 mb-2 scroll-m-(--header-height) text-lg font-semibold tracking-tight cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h5>
        );
      },
      h6({ children, ...props }) {
        const textContent = extractTextFromChildren(children);
        const id = generateHeadingId(textContent);

        return (
          <h6
            {...props}
            id={id}
            onClick={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
              handleHeadingClick(id, e)
            }
            className="group mt-6 mb-2 scroll-m-(--header-height) text-base font-semibold tracking-tight cursor-pointer hover:text-primary/90 transition-colors"
          >
            {children}
          </h6>
        );
      },

      // Tables
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

      // Lists
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

      // Blockquotes
      blockquote({ children }) {
        return (
          <blockquote className="my-6 border-l-4 border-primary pl-6 italic text-muted-foreground bg-muted/20 py-4 rounded-r-lg">
            {children}
          </blockquote>
        );
      },

      // Horizontal rule
      hr() {
        return <hr className="my-8 border-border" />;
      },

      // Paragraphs
      p({ children }) {
        return (
          <p className="leading-7 not-first:mt-6 text-foreground/90">
            {children}
          </p>
        );
      },

      // Strong
      strong({ children }) {
        return (
          <strong className="font-semibold text-foreground">{children}</strong>
        );
      },

      // Emphasis
      em({ children }) {
        return <em className="italic">{children}</em>;
      },

      // Delete
      del({ children }) {
        return (
          <del className="line-through text-muted-foreground">{children}</del>
        );
      },

      // Merge custom components
      ...customComponents,
    };
  }, [
    onImageClick,
    onLinkClick,
    handleHeadingClick,
    baseUrl,
    customComponents,
  ]);

  // Variant-specific styles
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

  // Handle empty content
  if (!content || content.trim().length === 0) {
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground border border-dashed border-border rounded-lg">
        <p>No content to display</p>
      </div>
    );
  }

  return (
    <div className={cn(variantStyles, className)}>
      {/* Main content */}
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
        allowedElements={allowedElements}
        disallowedElements={disallowedElements}
        unwrapDisallowed
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
