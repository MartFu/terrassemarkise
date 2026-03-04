import { AnalyticsProps } from "@/lib/types";

export const analyticsConfig: AnalyticsProps = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,

  matomoUrl: process.env.NEXT_PUBLIC_MATOMO_URL,
  matomoSiteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
};
