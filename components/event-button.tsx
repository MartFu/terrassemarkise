"use client";

import React from "react";
import Link from "next/link";

import { useConsent } from "@/hooks/use-consent";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";
import { sendGTMEvent } from "@next/third-parties/google";

export function EventButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    "data-event-name"?: string; // Custom prop for event name
  }) {
  const hasConsent = useConsent();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasConsent) {
      // Dispatch custom event so analytics can track
      sendGTMEvent({
        event: "button_click",
        value: props["data-event-name"] || "unknown",
      });
    }
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
      asChild={asChild}
    />
  );
}
export function EventLink({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  href,
  onClick,
  ...props
}: VariantProps<typeof buttonVariants> &
  React.ComponentPropsWithoutRef<typeof Link> & {
    asChild?: boolean;
    "data-event-name"?: string;
  }) {
  const hasConsent = useConsent();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasConsent) {
      // Dispatch custom event so analytics can track
      sendGTMEvent({
        event: "link_click",
        value: props["data-event-name"] || "unknown",
      });
    }
  };

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link {...props} href={href} onClick={handleClick} />
    </Button>
  );
}
