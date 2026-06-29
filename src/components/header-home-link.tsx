"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";

export default function HeaderHomeLink() {
  const t = useTranslations('Home');
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Link href="/" className="daisy-btn text-xl daisy-btn-ghost">
      <ViewTransition name="name" share="morph"><span>{t("content.name")}</span></ViewTransition>
    </Link>
  );
}
