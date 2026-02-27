"use client";

import { useEffect, useState } from "react";
import { getConsentCookie, ConsentPreferences } from "@/lib/consent";

interface AnalyticsConfig {
  ga4Id?: string;
  gtmId?: string;
  plausibleDomain?: string;
  matomoUrl?: string;
  matomoSiteId?: string;
}

const isBrowser = typeof window !== "undefined";

const gtagConfig = (targetId: string, config?: Record<string, any>) => {
  if (isBrowser && window.gtag) {
    window.gtag("config", targetId, config);
  }
};

const gtagEvent = (eventName: string, params?: Record<string, any>) => {
  if (isBrowser && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

const safePlausible = (
  eventName: string,
  options?: { props?: Record<string, any>; u?: string },
) => {
  if (isBrowser && window.plausible) {
    window.plausible(eventName, options);
  }
};

const safeMatomo = (args: any[]) => {
  if (isBrowser && window._paq) {
    window._paq.push(args);
  }
};

export function useAnalytics(config: AnalyticsConfig) {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);

  useEffect(() => {
    setConsent(getConsentCookie());
  }, []);

  const hasConsent = (category: string) => {
    return consent?.[category] === true;
  };

  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (!hasConsent("analytics")) return;

    gtagEvent(eventName, params);
    safePlausible(eventName, { props: params });
    safeMatomo(["trackEvent", "Custom", eventName, JSON.stringify(params)]);
  };

  const trackPageview = (url?: string) => {
    const pageUrl = url || (isBrowser ? window.location.pathname : "");

    if (!hasConsent("analytics") || !pageUrl || !config.ga4Id) return;

    gtagConfig(config.ga4Id, { page_path: pageUrl });
    safePlausible("pageview", { u: pageUrl });
    safeMatomo(["setCustomUrl", pageUrl]);
    safeMatomo(["trackPageView"]);
  };

  return {
    consent,
    hasConsent,
    trackEvent,
    trackPageview,
    isReady: consent !== null,
  };
}
