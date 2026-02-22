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
    <Link href="/" className={cn(className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo.png"
        alt="Solkjerming AS"
        className={cn("block dark:hidden", imageClassName)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-white.png"
        alt="Solkjerming AS"
        className={cn("hidden dark:block", imageClassName)}
      />
    </Link>
  );
}
