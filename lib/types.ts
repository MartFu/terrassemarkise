export type Image = {
  src: string;
  alt: string;
};

export interface CookieBannerProps {
  title: string;
  description: string;
  categories: {
    id: string;
    label: string;
    description: string;
    required: boolean;
  }[];
  buttons: {
    acceptAll: string;
    saveSelection: string;
    decline: string;
  };
}

export interface AnalyticsProps {
  ga4Id?: string;
  gtmId?: string;
  plausibleDomain?: string;
  plausibleScriptUrl?: string;
  matomoUrl?: string;
  matomoSiteId?: string;
}
