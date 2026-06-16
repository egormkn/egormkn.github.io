import * as rootParams from 'next/root-params';
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      locale = routing.defaultLocale;
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
