import { useTranslations } from "next-intl";

import BackButton from "@/components/back-button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div>
      <h2>{t("title")}</h2>
      <p>Could not find requested resource</p>
      <BackButton>{t("back")}</BackButton>
      <Link href="/">{t("home")}</Link>
    </div>
  );
}
