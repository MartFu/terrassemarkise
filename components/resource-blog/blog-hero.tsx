"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { Kbd, KbdGroup } from "../ui/kbd";

interface Props {
  initialQuery?: string;
  onSetQuery: (query: string) => void;
  query: string;
}

export function BlogHero({ onSetQuery, query }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Shortcut keys logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "s" && e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        onSetQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl">
            Alt du trenger å vite om å velge og ta vare <br /> på din nye
            terrassemarkise
          </h1>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => onSetQuery(e.target.value)}
              placeholder="Søk i artikler..."
              className="w-full pl-12 pr-4 py-3 border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />

            <KbdGroup className="hidden md:block space-x-1 absolute top-1/2 -translate-y-1/2 right-4">
              <Kbd>Alt</Kbd>
              <Kbd>+</Kbd>
              <Kbd>s</Kbd>
            </KbdGroup>
          </div>
        </div>
      </div>
    </>
  );
}
