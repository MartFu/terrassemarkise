/**
 *
 * String-level preprocessor that converts custom fenced-block syntax into
 * raw HTML *before* remark ever touches the markdown. This sidesteps the
 * problem where remark collapses fence lines and their content into a single
 * paragraph node.
 *
 * Syntax
 * ------
 *
 *   :::grid-2
 *   ![Alt 1](url1.webp)
 *   ![Alt 2](url2.jpg)
 *   :::
 *
 *   :::grid-3
 *   ![Alt 1](url1.jpg)
 *   ![Alt 2](url2.webp)
 *   ![Alt 3](url3.png)
 *   :::
 *
 *   :::callout[info]
 *   Some highlighted text here.
 *   :::
 *
 * Supported grid variants : grid-2  grid-3  grid-4
 * Supported callout types : info  warning  tip  danger  note
 *
 * The preprocessor emits <div data-directive="..."> blocks. rehype-raw passes
 * them through as-is, and the React renderer styles them via the `div`
 * component override in md-renderer.tsx.
 */

// Matches an entire directive block.
// Group 1 = directive name e.g. "grid-3" or "callout[tip]"
// Group 2 = inner content between the opening and closing fence
const DIRECTIVE_RE =
  /^:::(grid-[2-4]|callout\[[a-z]+\])\s*\n([\s\S]*?)^:::\s*$/gm;

// Image markdown syntax: ![alt](url "optional title")
const IMG_RE = /!\[([^\]]*)\]\(([^)"]+?)(?:\s+"([^"]*)")?\)/g;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildGridHtml(cols: string, inner: string): string {
  const images: string[] = [];
  let m: RegExpExecArray | null;
  IMG_RE.lastIndex = 0;
  while ((m = IMG_RE.exec(inner)) !== null) {
    const alt = escapeHtml(m[1] ?? "");
    const src = escapeHtml(m[2] ?? "");
    const title = m[3] ? ` title="${escapeHtml(m[3])}"` : "";
    images.push(
      `<img src="${src}" alt="${alt}"${title} data-grid-image="true" />`,
    );
  }
  return `<div data-directive="grid" data-cols="${cols}">\n${images.join("\n")}\n</div>`;
}

function buildCalloutHtml(kind: string, inner: string): string {
  // We emit ONLY the opening/closing div tags and leave the inner content as
  // plain markdown. rehype-raw will handle the div tags while remark parses
  // the content between them — so links, bold, etc. all work normally.
  return `<div data-directive="callout" data-kind="${kind}">\n\n${inner.trim()}\n\n</div>`;
}

/**
 * Call this on the raw markdown string before passing it to ReactMarkdown:
 *
 *   <ReactMarkdown ...>{preprocessDirectives(content)}</ReactMarkdown>
 */
export function preprocessDirectives(markdown: string): string {
  return markdown.replace(
    DIRECTIVE_RE,
    (_match, directive: string, inner: string) => {
      let html: string;
      if (directive.startsWith("grid-")) {
        const cols = directive.split("-")[1];
        html = buildGridHtml(cols, inner);
      } else {
        const kindMatch = directive.match(/callout\[([a-z]+)\]/);
        const kind = kindMatch?.[1] ?? "info";
        html = buildCalloutHtml(kind, inner);
      }
      // Blank lines before and after ensure remark treats the HTML as its own
      // block and correctly parses whatever comes next (headings, paragraphs, etc.)
      return `\n\n${html}\n\n`;
    },
  );
}
