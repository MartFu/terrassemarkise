"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({
  className,
  imageClassName = "h-18 w-auto",
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("transition-transform active:scale-95", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo.png"
        alt="Solkjerming AS"
        className={cn("transition-all duration-300", imageClassName)}
      />
    </Link>
  );
}
