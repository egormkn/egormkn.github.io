import deepmerge from "deepmerge";
import { hasLocale, Locale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import * as rootParams from "next/root-params";

import { routing } from "./routing";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      locale = routing.defaultLocale;
    }
  }

  let messages = (await import(`../../messages/${locale}.json`)).default;

  if (locale !== routing.defaultLocale) {
    const defaultMessages = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
    messages = deepmerge(defaultMessages, messages);
  }

  return { locale, messages };
});

export type LocaleParams = { locale?: string };

export function getLocaleFromParams(resolvedParams: LocaleParams): Locale {
  if ("locale" in resolvedParams) {
    if (!hasLocale(routing.locales, resolvedParams.locale)) {
      notFound();
    }
    return resolvedParams.locale;
  }

  return routing.defaultLocale;
}
