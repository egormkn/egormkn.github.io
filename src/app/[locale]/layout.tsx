import type { Metadata, ResolvingMetadata } from "next";
import { Locale, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import RootLayout from "@/components/root-layout";
import { BASE_URL } from "@/config";
import I18nRedirect from "@/i18n/redirect";
import { routing } from "@/i18n/routing";

function getLocale(resolvedParams: { locale?: string }): Locale {
  if ("locale" in resolvedParams) {
    if (!hasLocale(routing.locales, resolvedParams.locale)) {
      notFound();
    }
    return resolvedParams.locale;
  }

  return routing.defaultLocale;
}

export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocale(resolvedParams);

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
  const locale = getLocale(resolvedParams);

  return (
    <RootLayout lang={locale}>
      <I18nRedirect />
      {children}
    </RootLayout>
  );
}
