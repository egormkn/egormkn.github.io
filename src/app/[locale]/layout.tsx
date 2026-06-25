import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import RootLayout from "@/components/root-layout";
import { routing } from "@/i18n/routing";

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
