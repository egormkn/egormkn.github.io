"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import clsx from "clsx";

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
        <Link href="/" className={clsx(pathname === "/" && "daisy-menu-active")}>{t("home")}</Link>
      </li>
      <li>
        <Link href="/blog" className={clsx(pathname.startsWith("/blog") && "daisy-menu-active")}>{t("blog")}</Link>
      </li>
      <li>
        <Link href="/projects" className={clsx(pathname.startsWith("/projects") && "daisy-menu-active")}>{t("projects")}</Link>
      </li>
      <li>
        <Link href="/resume" className={clsx(pathname.startsWith("/resume") && "daisy-menu-active")}>{t("resume")}</Link>
      </li>
      <li>
        <Link href="/about" className={clsx(pathname.startsWith("/about") && "daisy-menu-active")}>{t("about")}</Link>
      </li>
    </ul>
  );
}
