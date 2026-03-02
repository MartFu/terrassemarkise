"use client";

import { useState, useEffect, useRef } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { Logo } from "./ui/logo";
import { Section } from "./ui/section";
import { Container } from "./ui/container";

const STAGING_PASSWORD = "staging2025";
const STORAGE_KEY = "staging_unlocked";

interface StagingLockProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function StagingLock({
  children,
  disabled = false,
}: StagingLockProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setUnlocked(true);
    } else {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  const attempt = () => {
    if (input === STAGING_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 500);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") attempt();
  };

  if (!mounted || disabled) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 h-[100svh] z-50 flex items-center justify-center bg-background">
      <Logo className="absolute top-12 left-1/2 -translate-x-1/2" />
      <Container className="flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6 p-6">
          <div className="flex items-center justify-center gap-2">
            <div className="flex justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              Staging Environment
            </h1>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className={`w-full rounded-md border bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  error ? "border-destructive" : "border-input"
                }`}
                placeholder="Enter passphrase"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                onClick={attempt}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Unlock"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground/50">
              Press Enter to continue
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
