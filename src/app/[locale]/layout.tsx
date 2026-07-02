import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

import RootLayout from "@/components/root-layout";
import { BASE_URL } from "@/config";
import I18nRedirect from "@/i18n/redirect";
import { getLocaleFromParams } from "@/i18n/request";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
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
  const locale = getLocaleFromParams(await params);

  return (
    <RootLayout lang={locale}>
      <I18nRedirect />
      {children}
    </RootLayout>
  );
}
