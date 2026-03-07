"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  setConsentCookie,
  getConsentCookie,
  ConsentPreferences,
} from "@/lib/consent";
import { CookieBannerProps } from "@/lib/types";
import { Switch } from "./ui/switch";
import Link from "next/link";
import { SITE_URLS } from "@/lib/constants";

export function CookieBanner({ config }: { config: CookieBannerProps }) {
  // Start hidden to prevent flash, then check cookie
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [consent, setConsent] = useState<ConsentPreferences>(() =>
    config.categories.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: curr.id === "necessary" || curr.required,
      }),
      {},
    ),
  );

  // Check for existing consent on mount
  useEffect(() => {
    setMounted(true);
    const existingConsent = getConsentCookie();

    if (!existingConsent) {
      setVisible(true);
    }
  }, []);

  const handleSave = (all = false) => {
    const finalConsent = all
      ? Object.fromEntries(config.categories.map((c) => [c.id, true]))
      : consent;

    setConsentCookie(finalConsent);
    setVisible(false);

    // Dispatch custom event so analytics can reload
    window.dispatchEvent(
      new StorageEvent("storage", { key: "cookie-consent" }),
    );

    // Optional: reload page to load analytics scripts if consent granted
    if (finalConsent.analytics && !getConsentCookie()?.analytics) {
      window.location.reload();
    }
  };

  const handleDecline = () => {
    // Only necessary cookies
    const necessaryOnly = config.categories.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: curr.required || curr.id === "necessary",
      }),
      {},
    );

    setConsentCookie(necessaryOnly);
    setVisible(false);
  };

  // Prevent hydration mismatch
  if (!mounted || !visible) return null;

  return (
    <div className="fixed bottom-6 inset-x-4 md:inset-x-6 z-50 flex justify-center md:justify-end">
      <div className="max-w-xl w-full bg-card text-foreground/80 border shadow-2xl p-6">
        <div className="space-y-2 border-b pb-2 mb-4">
          <h2 className="text-xl font-bold text-foreground">{config.title}</h2>
          <p className="text-sm max-w-prose">
            {config.description}{" "}
            <Link
              href={SITE_URLS.LEGAL + "personvern"}
              className="text-sm underline hover:text-primary"
            >
              Lær mer
            </Link>{" "}
            om hvordan vi behandler data og beskytter personvernet ditt.
          </p>
        </div>

        <div className="space-y-6 mb-6">
          {config.categories.map((cat) => (
            <div key={cat.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor={`check-${cat.id}`}>{cat.label}</Label>

                <Switch
                  id={`check-${cat.id}`}
                  disabled={cat.required}
                  checked={cat.required || consent[cat.id]}
                  onCheckedChange={(checked) =>
                    setConsent({
                      ...consent,
                      [cat.id]: checked === true,
                    })
                  }
                />
              </div>

              <p className="text-xs max-w-sm">{cat.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 justify-end">
          <Button variant="outline" onClick={handleDecline}>
            {config.buttons.decline}
          </Button>
          <Button variant="outline" onClick={() => handleSave(false)}>
            {config.buttons.saveSelection}
          </Button>
          <Button variant="outline" onClick={() => handleSave(true)}>
            {config.buttons.acceptAll}
          </Button>
        </div>
      </div>
    </div>
  );
}
