"use client"

import { useEffect } from 'react';

export default function RootScripts() {
  useEffect(() => {
    // @ts-expect-error No types
    import('postcss-focus-within/browser').then(({ default: focusWithinInit }) => {
      focusWithinInit();
      console.log("Enabled focus-within polyfill");
    })
  }, []);

  return null;
}
