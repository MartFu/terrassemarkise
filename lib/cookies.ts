"use client";

/**
 * Set cookie
 *
 * Defaults to 1 year expiration and SameSite=Lax for security
 *
 * @param name
 * @param value
 * @param days
 */
export function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// Get cookie value
export function getCookie(name: string): string | null {
  return document.cookie.split("; ").reduce(
    (r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    },
    null as string | null,
  );
}

// Delete cookie
export function deleteCookie(name: string) {
  setCookie(name, "", -1);
}
