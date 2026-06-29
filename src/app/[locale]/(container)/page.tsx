import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Locale, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

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

  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: {
      absolute: t("title"),
    },
    description: t("description"),
  };
}

export default function Page() {
  const t = useTranslations("Home");

  return (
    <div className="daisy-hero container mx-auto">
      <div className="daisy-hero-content flex-col p-6 lg:flex-row">
        <Image
          src="/photo.jpg"
          width={150}
          height={150}
          alt="Picture of the author"
          className="aspect-square max-w-sm rounded-full shadow-2xl"
        />
        <div className="p-4 text-center lg:text-start">
          <h1 className="text-5xl font-bold">
            <ViewTransition name="name" share="morph">
              <span>{t("content.name")}</span>
            </ViewTransition>
          </h1>
          <h2 className="text-2xl text-base-content/70">{t("content.professional_title")}</h2>
        </div>
      </div>
    </div>
  );
}
