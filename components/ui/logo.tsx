"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="transition-transform active:scale-95">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/solskjerming-as-logo.png"
        alt="Solkjerming AS"
        className={cn("transition-all duration-300 w-auto h-18")}
      />
    </Link>
  );
}
