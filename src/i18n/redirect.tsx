"use client";

import { usePathname as useRawPathname } from "next/navigation";
import { useLayoutEffect } from "react";

import { useRouter } from "@/i18n/navigation";
import { getCanonicalPathname } from "@/i18n/routing";

export default function I18nRedirect() {
  const rawPathname = useRawPathname();
  const router = useRouter();

  useLayoutEffect(() => {
    const canonicalPathname = getCanonicalPathname(rawPathname);
    if (canonicalPathname !== rawPathname) {
      const query = Object.fromEntries(new URLSearchParams(window.location.search));
      console.log(`Redirecting ${rawPathname} to ${canonicalPathname}`);
      router.replace({ pathname: canonicalPathname, query });
    }
  }, [rawPathname, router]);

  return null;
}
