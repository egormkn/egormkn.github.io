import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  localePrefix: 'as-needed',
});

export function getCanonicalPathname(pathname: string) {
  const localePrefix = "/" + routing.defaultLocale;
  if (pathname === localePrefix || pathname.startsWith(localePrefix + "/")) {
    return pathname.slice(localePrefix.length) || "/";
  }
  return pathname;
}
