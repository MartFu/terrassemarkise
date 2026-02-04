import { cn } from "@/lib/utils";
import React from "react";

export type SectionProps = React.PropsWithChildren<
  React.ComponentProps<"section">
> & {
  id?: string;
  ariaLabel?: string;
};

export function Section({
  className,
  children,
  id = "",
  ariaLabel = "",
}: SectionProps) {
  return (
    <section
      className={cn(className, "py-8 sm:py-12 md:py-16")}
      id={id}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}
