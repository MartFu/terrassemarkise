"use client";

import { getConsentCookie } from "@/lib/consent";
import { useState, useEffect } from "react";

export function useConsent() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const check = () => setHasConsent(!!getConsentCookie()?.analytics);
    check();
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  return hasConsent;
}
