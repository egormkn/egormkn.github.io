import deepmerge from "deepmerge";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import * as rootParams from "next/root-params";

import { routing } from "./routing";

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
