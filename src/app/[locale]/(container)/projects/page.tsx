import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Projects");
  return (
    <div className="flex grow flex-col items-center justify-center">
      <FontAwesomeIcon icon={faTriangleExclamation} className="text-warning" size="4x" />
      <p className="mt-3">{t("Under construction")}</p>
    </div>
  );
}
