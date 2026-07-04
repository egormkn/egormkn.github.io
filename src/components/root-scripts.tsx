"use client"

import Script from 'next/script';
import { useEffect } from 'react';

export default function RootScripts() {
  useEffect(() => {
    // @ts-expect-error No types
    import('postcss-focus-within/browser').then(({ default: focusWithinInit }) => {
      focusWithinInit();
      console.log("Enabled focus-within polyfill");
    })
  }, []);

  return (
    <Script
      async
      src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      data-domains={process.env.NEXT_PUBLIC_UMAMI_DOMAINS}
      data-performance={process.env.NEXT_PUBLIC_UMAMI_PERFORMANCE}
      data-do-not-track={process.env.NEXT_PUBLIC_UMAMI_DO_NOT_TRACK}
      strategy="afterInteractive"
    />
  );
}
