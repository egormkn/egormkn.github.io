"use client";

import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("NotFound");

  return (
    <div className="grow flex flex-col items-center justify-center">
      <h2 className="text-8xl font-bold">404</h2>
      <h3 className="text-xl">{t("title")}</h3>
      <p className="py-5">{t("description")}</p>
      <div className="flex gap-2">
        <button type="button" className="daisy-btn daisy-btn-primary" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} /> {t("back")}
        </button>
        <Link className="daisy-btn daisy-btn-secondary" href="/">
          <FontAwesomeIcon icon={faHouse} /> {t("home")}
        </Link>
      </div>
    </div>
  );
}
