"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

export default function Menu({
  type,
  className,
  ...props
}: { type: "horizontal" | "vertical" } & React.HTMLAttributes<HTMLUListElement>) {
  const t = useTranslations("Menu");
  const pathname = usePathname();

  return (
    <ul className={clsx("gap-1", className)} {...props}>
      <li>
        <Link
          href="/"
          className={clsx(pathname === "/" && "daisy-menu-active")}
          onClick={() => {
            (document.activeElement as HTMLElement).blur();
          }}
        >
          {t("home")}
        </Link>
      </li>
      <li>
        <Link
          href="/blog"
          className={clsx(pathname.startsWith("/blog") && "daisy-menu-active")}
          onClick={() => {
            (document.activeElement as HTMLElement).blur();
          }}
        >
          {t("blog")}
        </Link>
      </li>
      <li>
        <Link
          href="/projects"
          className={clsx(pathname.startsWith("/projects") && "daisy-menu-active")}
          onClick={() => {
            (document.activeElement as HTMLElement).blur();
          }}
        >
          {t("projects")}
        </Link>
      </li>
      <li>
        <Link
          href="/resume"
          className={clsx(pathname.startsWith("/resume") && "daisy-menu-active")}
          onClick={() => {
            (document.activeElement as HTMLElement).blur();
          }}
        >
          {t("resume")}
        </Link>
      </li>
    </ul>
  );
}
