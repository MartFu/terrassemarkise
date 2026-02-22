import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type FilterParamOptions = {
  /** When toggling, should we allow multiple values? Default: true */
  allowMultiple?: boolean;
  /** Should we preserve other query parameters? Default: true */
  preserveParams?: boolean;
  /** Replace history entry instead of pushing? Default: false */
  replace?: boolean;
  /** Custom scroll behavior after navigation */
  scroll?: boolean;
};

export function useQueryParam(key: string, options: FilterParamOptions = {}) {
  const {
    allowMultiple = true,
    preserveParams = true,
    replace = false,
    scroll = true,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Memoize values to prevent unnecessary recalculations
  const values = useMemo(() => searchParams.getAll(key), [searchParams, key]);

  const current = useMemo(
    () => searchParams.get(key) ?? "",
    [searchParams, key],
  );

  // Helper function to update URL
  const updateUrl = useCallback(
    (params: URLSearchParams) => {
      const url = preserveParams
        ? `${pathname}?${params.toString()}`
        : `${pathname}?${params.toString()}`;

      if (replace) {
        router.replace(url, { scroll });
      } else {
        router.push(url, { scroll });
      }
    },
    [pathname, preserveParams, replace, router, scroll],
  );

  const toggle = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (values.includes(value)) {
        // Remove the value
        if (allowMultiple) {
          params.delete(key);
          values
            .filter((v) => v !== value)
            .forEach((v) => params.append(key, v));
        } else {
          params.delete(key);
        }
      } else {
        // Add the value
        if (allowMultiple) {
          params.append(key, value);
        } else {
          params.set(key, value);
        }
      }

      updateUrl(params);
    },
    [searchParams, values, key, allowMultiple, updateUrl],
  );

  const set = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      updateUrl(params);
    },
    [searchParams, key, updateUrl],
  );

  const clear = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    updateUrl(params);
  }, [searchParams, key, updateUrl]);

  const has = useCallback((value: string) => values.includes(value), [values]);

  const isEmpty = useMemo(() => values.length === 0, [values]);

  return {
    // State
    values,
    current,
    isEmpty,

    // Actions
    toggle,
    set,
    clear,
    has,

    // Metadata
    key,
    isMulti: allowMultiple,
  };
}
