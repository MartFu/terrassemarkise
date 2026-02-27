import { AnalyticsProps } from "@/lib/types";

export const analyticsConfig: AnalyticsProps = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  plausibleScriptUrl: process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL,
  matomoUrl: process.env.NEXT_PUBLIC_MATOMO_URL,
  matomoSiteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
};
