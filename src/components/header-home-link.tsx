"use client";

import { Link, usePathname } from "@/i18n/navigation";
import Name from "./name";

export default function HeaderHomeLink() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Link href="/" className="daisy-btn text-xl daisy-btn-ghost">
      <Name />
    </Link>
  );
}
