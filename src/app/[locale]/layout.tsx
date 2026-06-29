import type { Metadata } from "next";
import { Locale, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import RootLayout from "@/components/root-layout";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  let locale = routing.defaultLocale;
  const resolvedParams = await params;
  const withLocale = "locale" in resolvedParams;
  if (withLocale) {
    if (!hasLocale(routing.locales, resolvedParams.locale)) {
      notFound();
    }
    locale = resolvedParams.locale;
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      template: t("title.template"),
      default: t("title.default"),
    },
    description: t("description"),
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL! + (withLocale ? "" : "/en")),
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
  let locale = routing.defaultLocale;
  const resolvedParams = await params;
  if ("locale" in resolvedParams) {
    if (!hasLocale(routing.locales, resolvedParams.locale)) {
      notFound();
    }
    locale = resolvedParams.locale;
  }

  return <RootLayout lang={locale}>{children}</RootLayout>;
}
