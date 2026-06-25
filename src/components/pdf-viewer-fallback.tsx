"use client";

import semver from "semver";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { UAParser } from "ua-parser-js";
import { BrowserName, EngineName } from "ua-parser-js/enums";

const PdfViewerCustom = dynamic(() => import("@/components/pdf-viewer-custom"), {
  ssr: false,
  loading: ({ ...props }) => <div>Loading...</div>,
});

function getPdfFallbackUrls(url: string, htmlUrl?: string) {
  const fallbackUrls = [];

  if (typeof window !== "undefined") {
    const { browser, engine } = UAParser();
    const engineVersion = engine.version ?? "0";

    if (
      engine.is(EngineName.BLINK) && semver.satisfies(engineVersion, ">=125") ||
      engine.is(EngineName.GECKO) && semver.satisfies(engineVersion, ">=140") ||
      browser.is(BrowserName.FIREFOX) ||
      browser.is(BrowserName.EDGE) ||
      browser.is(BrowserName.SAFARI) ||
      browser.is(BrowserName.CHROMIUM) ||
      browser.is(BrowserName.CHROME) ||
      browser.is(BrowserName.OPERA)
    ) {
      fallbackUrls.push(`https://mozilla.github.io/pdf.js/legacy/web/viewer.html?file=${encodeURIComponent(url)}`);
    }
  }

  if (htmlUrl) fallbackUrls.push(htmlUrl);

  fallbackUrls.push(`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url)}`);

  return fallbackUrls;
}

export default function PdfViewerFallback({
  title = "",
  url,
  htmlUrl,
  fallbackTimeoutMs = 15000,
}: {
  title?: string;
  url: string;
  htmlUrl?: string;
  fallbackTimeoutMs?: number;
}) {
  const fallbackUrls = getPdfFallbackUrls(url, htmlUrl);

  const [fallbackUrlIndex, setFallbackUrlIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const fallbackUrl = fallbackUrls[fallbackUrlIndex];

  useEffect(() => {
    if (navigator.pdfViewerEnabled || hasLoaded) return;

    timeoutRef.current = setTimeout(() => {
      if (!hasLoaded) {
        setFallbackUrlIndex((fallbackUrlIndex) => (fallbackUrlIndex + 1) % fallbackUrls.length);
      }
    }, fallbackTimeoutMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasLoaded, fallbackUrlIndex, fallbackTimeoutMs, fallbackUrls.length]);

  const handleOnLoad = () => {
    // If it fires successfully, clear the switch-over timer
    setHasLoaded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  if (fallbackUrl === "custom") return <PdfViewerCustom url={url} />;

  return (
    <iframe
      title={title}
      src={fallbackUrl}
      onLoad={handleOnLoad}
      className="w-full grow border-0"
      allowFullScreen
      suppressHydrationWarning
    ></iframe>
  );
}
