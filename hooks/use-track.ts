"use client";

import { useCallback } from "react";
import { getConsentCookie } from "@/lib/consent";

const isBrowser = typeof window !== "undefined";

export function useTrack() {
  const track = useCallback(
    (eventName: string, params?: Record<string, any>) => {
      const consent = getConsentCookie();

      if (!consent?.analytics) {
        console.log("Analytics not consented, event not tracked:", eventName);
        return;
      }

      // GA4
      if (isBrowser && window.gtag) {
        window.gtag("event", eventName, params);
      }

      // Plausible
      if (isBrowser && window.plausible) {
        window.plausible(eventName, { props: params });
      }

      // Matomo
      if (isBrowser && window._paq) {
        window._paq.push([
          "trackEvent",
          "Custom",
          eventName,
          JSON.stringify(params),
        ]);
      }
    },
    [],
  );

  const trackOutboundLink = useCallback(
    (url: string) => {
      track("outbound_link_click", { url });
    },
    [track],
  );

  const trackDownload = useCallback(
    (filename: string) => {
      track("file_download", { filename });
    },
    [track],
  );

  const trackContact = useCallback(
    (method: string) => {
      track("contact", { method });
    },
    [track],
  );

  return {
    track,
    trackOutboundLink,
    trackDownload,
    trackContact,
  };
}
