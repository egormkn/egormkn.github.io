"use client";

import { faChevronDown, faChevronUp, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSetLocale(nextLocale: Locale) {
    console.log(`pathname: ${pathname}, params: ${JSON.stringify(params)}, nextLocale: ${nextLocale}`);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <>
      <label
        className={clsx(
          "group daisy-dropdown daisy-dropdown-end",
          isPending && "transition-opacity [&:disabled]:opacity-30",
        )}
      >
        <p className="sr-only">{t("label")}</p>
        <div
          tabIndex={0}
          role="button"
          className={clsx("daisy-btn daisy-btn-square gap-0", isPending && "btn-disabled")}
        >
          <FontAwesomeIcon className="col-start-2" icon={faLanguage} size="lg" widthAuto />
          <div className="daisy-swap absolute bottom-0.5 daisy-swap-rotate opacity-30 group-focus-within:daisy-swap-active">
            <FontAwesomeIcon className="daisy-swap-off group-focus-within:-rotate-45" icon={faChevronDown} size="2xs" />
            <FontAwesomeIcon className="daisy-swap-on group-focus-within:rotate-none" icon={faChevronUp} size="2xs" />
          </div>
        </div>
        <ul tabIndex={-1} className="daisy-dropdown-content daisy-menu z-1 rounded-box bg-base-100 p-2 shadow-sm">
          {routing.locales.map((cur) => (
            <li key={cur}>
              <a onClick={() => onSetLocale(cur)}>{t("locale", { locale: cur })}</a>
            </li>
          ))}
        </ul>
      </label>
    </>
  );
}
