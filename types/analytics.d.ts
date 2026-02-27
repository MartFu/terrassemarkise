// GA4
interface GtagArgs {
  (command: "config", targetId: string, config?: Record<string, any>): void;
  (
    command: "event",
    eventName: string,
    eventParams?: Record<string, any>,
  ): void;
  (command: "js", date: Date): void;
}

// Plausible
interface PlausibleArgs {
  (
    eventName: string,
    options?: { props?: Record<string, any>; u?: string },
  ): void;
}

// Matomo
type MatomoArgs = any[];

declare global {
  interface Window {
    gtag: GtagArgs;
    dataLayer: Record<string, any>[];
    plausible: PlausibleArgs;
    _paq: MatomoArgs;
  }
}

export {};
