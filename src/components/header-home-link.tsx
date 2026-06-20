"use client";

import { useTranslations } from "next-intl";
import { ViewTransition } from "react";

import { Link, usePathname } from "@/i18n/navigation";

export default function HeaderHomeLink() {
  const t = useTranslations("Main");
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Link href="/" className="daisy-btn text-xl daisy-btn-ghost">
      <ViewTransition name="name" share="morph">
        <span>{t("name")}</span>
      </ViewTransition>
    </Link>
  );
}
