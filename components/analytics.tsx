"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getConsentCookie } from "@/lib/consent";
import { AnalyticsProps } from "@/lib/types";
import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google";

const isBrowser = typeof window !== "undefined";

export function Analytics({ config }: { config: AnalyticsProps }) {
  const { matomoUrl, matomoSiteId, gtmId } = config;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<Record<string, boolean> | null>(null);

  const checkConsent = useCallback(() => {
    setConsent(getConsentCookie());
  }, []);

  useEffect(() => {
    checkConsent();
    if (isBrowser) {
      window.addEventListener("storage", checkConsent);
      return () => window.removeEventListener("storage", checkConsent);
    }
  }, [checkConsent]);

  // Track page views on route change
  useEffect(() => {
    if (!consent?.analytics || !isBrowser) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // GTM: Trigger a custom event that you can use as a "Trigger" in GTM UI
    sendGTMEvent({ event: "pageview", value: url });

    // Matomo: Manual track
    if (window._paq && matomoUrl) {
      window._paq.push(["setCustomUrl", url]);
      window._paq.push(["trackPageView"]);
    }
  }, [pathname, searchParams, consent, matomoUrl]);

  const hasAnalyticsConsent = consent?.analytics === true;

  if (!hasAnalyticsConsent) return null;

  return (
    <>
      {/* GTM handles GA4 inside the GTM Dashboard */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}

      {/* Matomo Implementation */}
      {matomoUrl && matomoSiteId && (
        <Script id="matomo" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://${matomoUrl}/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '${matomoSiteId}']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='//cdn.matomo.cloud/${matomoUrl}/matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      )}
    </>
  );
}
