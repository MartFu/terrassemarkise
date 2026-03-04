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
  gtmId?: string;
  matomoUrl?: string;
  matomoSiteId?: string;
}

export interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurData?: string;
  title?: string;
  description?: string;
  priority?: boolean;
}

export type GridVariant =
  | "masonry" // Variable height, fixed width columns
  | "bento" // Structured grid with varying spans
  | "balanced" // Balanced heights across rows
  | "panorama" // Feature large images with panoramas
  | "compact"; // Tight, uniform grid
