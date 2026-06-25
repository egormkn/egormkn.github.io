import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import LocaleSwitcher from "@/components/locale-switcher";
import ThemeSwitcher from "@/components/theme-switcher";

import HeaderHomeLink from "./header-home-link";
import Menu from "./menu";

export default function Header({ fullWidth }: { fullWidth?: boolean }) {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-30 bg-base-100 shadow-sm backdrop-blur print:static">
      <div className={clsx("daisy-navbar", !fullWidth && "container mx-auto")}>
        <div className="daisy-navbar-start">
          <div className="group daisy-dropdown lg:hidden">
            <div
              title={t("menu")}
              tabIndex={0}
              role="button"
              className="daisy-btn daisy-swap daisy-btn-square daisy-swap-rotate group-focus-within:daisy-swap-active"
            >
              <FontAwesomeIcon className="daisy-swap-off group-focus-within:-rotate-45" icon={faBars} size="lg" />
              <FontAwesomeIcon className="daisy-swap-on group-focus-within:rotate-none" icon={faXmark} size="lg" />
            </div>
            <Menu
              type="vertical"
              tabIndex={-1}
              className="daisy-dropdown-content daisy-menu z-1 rounded-box bg-base-100 p-2 shadow-sm"
            />
          </div>

          <HeaderHomeLink />
        </div>
        <div className="daisy-navbar-center hidden lg:flex">
          <Menu type="horizontal" className="daisy-menu daisy-menu-horizontal px-1" />
        </div>
        <div className="daisy-navbar-end gap-1">
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
