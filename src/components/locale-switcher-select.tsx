"use client";

import clsx from "clsx";
import { Locale } from "next-intl";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
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
      <label className={clsx("daisy-dropdown daisy-dropdown-end", isPending && "transition-opacity [&:disabled]:opacity-30")}>
        <p className="sr-only">{label}</p>
        <div tabIndex={0} role="button" className={clsx("daisy-btn m-1", isPending && "btn-disabled")}>
          <FontAwesomeIcon className="daisy-swap-on" icon={faLanguage} size="lg" />
        </div>
        <ul tabIndex={-1} className="daisy-dropdown-content daisy-menu z-1 rounded-box bg-base-100 p-2 shadow-sm">
          {children}
        </ul>
      </label>
    </>
  );
}
