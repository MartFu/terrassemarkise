import { cn } from "@/lib/utils";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  className?: string;
}

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
  centered?: boolean;
  className?: string;
}

/**
 *  * @example
 * ```tsx
 * <Breadcrumbs
 *   centered
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'About' }
 *   ]}
 * />
 * @param breadcrumbs
 * @param centered
 * @returns
 */
export default function Breadcrumbs({
  breadcrumbs,
  centered = false,
  className,
}: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        className,
        "flex items-center gap-2 text-sm overflow-x-auto scrollbar-hide",
        centered && "justify-center",
      )}
      aria-label="Brødsmulesti"
    >
      <ol className="flex items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className={cn(
                  crumb.className,
                  index < breadcrumbs.length &&
                    "opacity-60 text-nowrap hover:opacity-100",
                  "transition-[colors,opacity] duration-200",
                )}
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                className={cn(crumb.className, "font-medium text-nowrap")}
                aria-current="page"
              >
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
