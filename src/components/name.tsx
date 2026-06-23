import { useTranslations } from "next-intl";
import { ViewTransition } from "react";

export default function Name() {
  const t = useTranslations('Main');

  return <ViewTransition name="name" share="morph"><span>{t("name")}</span></ViewTransition>;
}
