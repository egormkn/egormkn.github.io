import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import RootLayout from "@/components/root-layout";
import { BASE_URL } from "@/config";
import I18nRedirect from "@/i18n/redirect";
import { type LocaleParams, getLocaleFromParams } from "@/i18n/request";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<LocaleParams> }): Promise<Metadata> {
  const locale = getLocaleFromParams(await params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      template: t("title.template"),
      default: t("title.default"),
    },
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: "./",
    },
  };
}

export async function generateStaticParams() {
  const path = await import("node:path");
  if (path.basename(__dirname) !== "[locale]") return [];
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Layout({ children, params }: LayoutProps<"/"> | LayoutProps<"/[locale]">) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(await params);

  const isExplicitEnLocale = "locale" in resolvedParams && resolvedParams.locale === "en";

  return (
    <RootLayout lang={locale} data-pagefind-ignore={isExplicitEnLocale ? "all" : undefined}>
      <I18nRedirect />
      {children}
    </RootLayout>
  );
}
