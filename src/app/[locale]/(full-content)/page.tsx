import Content, { frontmatter } from "@content/index.mdx";
import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";

import { getLocaleFromParams } from "@/i18n/request";

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const locale = getLocaleFromParams(await params);
  const frontmatterMetadata = frontmatter[locale].metadata;

  return {
    title: {
      absolute: frontmatterMetadata.title,
    },
    description: frontmatterMetadata.description,
  };
}

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("Home");

  return <Content locale={locale} t={t} />;
}
