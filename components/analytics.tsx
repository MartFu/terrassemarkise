"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getConsentCookie } from "@/lib/consent";
import { AnalyticsProps } from "@/lib/types";

const isBrowser = typeof window !== "undefined";

export function Analytics({ config }: { config: AnalyticsProps }) {
  const {
    ga4Id,
    plausibleDomain,
    plausibleScriptUrl,
    matomoUrl,
    matomoSiteId,
    gtmId,
  } = config;
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

  // Track page views when route changes
  useEffect(() => {
    if (!consent?.analytics) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // GA4
    if (isBrowser && window.gtag && ga4Id) {
      window.gtag("config", ga4Id, { page_path: url });
    }

    // Plausible
    if (isBrowser && window.plausible && plausibleDomain) {
      window.plausible("pageview", { u: url });
    }

    // Matomo
    if (isBrowser && window._paq && matomoUrl) {
      window._paq.push(["setCustomUrl", url]);
      window._paq.push(["trackPageView"]);
    }
  }, [pathname, searchParams, consent, ga4Id, plausibleDomain, matomoUrl]);

  const hasAnalyticsConsent = consent?.analytics === true;

  return (
    <>
      {/* GA4 */}
      {ga4Id && hasAnalyticsConsent && (
        <>
          {console.log("Loading GA4 with ID:", ga4Id)}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* GTM */}
      {gtmId && hasAnalyticsConsent && (
        <>
          {console.log("Loading GTM with ID:", gtmId)}
          <Script id="gtm" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
          </Script>
        </>
      )}

      {/* Plausible */}
      {plausibleDomain && hasAnalyticsConsent && (
        <>
          {console.log("Loading Plausible for domain:", plausibleDomain)}
          <Script
            src={plausibleScriptUrl}
            data-domain={plausibleDomain}
            strategy="lazyOnload"
          />
        </>
      )}

      {/* Matomo */}
      {matomoUrl && matomoSiteId && hasAnalyticsConsent && (
        <>
          {console.log(
            "Loading Matomo with URL:",
            matomoUrl,
            "and Site ID:",
            matomoSiteId,
          )}
          <Script id="matomo" strategy="afterInteractive">
            {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                var u='${matomoUrl}';
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '${matomoSiteId}']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                })();
                `}
          </Script>
        </>
      )}

      {/* GTM Noscript */}
      {gtmId && hasAnalyticsConsent && (
        <>
          {console.log("Adding GTM noscript fallback for ID:", gtmId)}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
    </>
  );
}
