import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = (key: string): string => {
    return searchParams.get(key) || "";
  };

  const getNumberParam = (key: string, defaultValue: number): number => {
    const value = searchParams.get(key);
    return value ? Number(value) : defaultValue;
  };

  const getArrayParam = (key: string): string[] => {
    const value = searchParams.get(key);
    return value ? value.split(",") : [];
  };

  const setParams = useCallback(
    (params: Record<string, string | number | string[]>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            newParams.set(key, value.join(","));
          } else {
            newParams.delete(key);
          }
        } else if (value) {
          newParams.set(key, String(value));
        } else {
          newParams.delete(key);
        }
      });

      router.push(`${pathname}?${newParams.toString()}`);
    },
    [pathname, router, searchParams],
  );

  return {
    getParam,
    getNumberParam,
    getArrayParam,
    setParams,
  };
};
