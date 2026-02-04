import { cn } from "@/lib/utils";
import NextLink from "next/link";
import React from "react";

export function Link({
  className,
  href,
  target = "",
  rel = "",
  defaultStyles = true,
  ...props
}: React.ComponentProps<"a"> & {
  href: string;
  className?: string;
  defaultStyles?: boolean;
}) {
  const defaultClassName = defaultStyles
    ? "text-muted-foreground hover:text-foreground hover:underline"
    : "";

  return (
    <NextLink
      href={href}
      target={target}
      rel={rel}
      className={cn(className, defaultClassName, "flex items-center gap-2")}
      {...props}
    />
  );
}
