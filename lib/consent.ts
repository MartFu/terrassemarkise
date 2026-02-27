import { setCookie, getCookie } from "./cookies";

const CONSENT_COOKIE_NAME = "cookie-consent";

export interface ConsentPreferences {
  [key: string]: boolean;
}

export function setConsentCookie(consent: ConsentPreferences) {
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(consent));
}

export function getConsentCookie(): ConsentPreferences | null {
  const cookie = getCookie(CONSENT_COOKIE_NAME);
  if (!cookie) return null;

  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
}
