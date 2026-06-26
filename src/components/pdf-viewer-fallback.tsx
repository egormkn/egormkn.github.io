"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import semver from "semver";
import { UAParser } from "ua-parser-js";
import { EngineName } from "ua-parser-js/enums";

function getPdfFallbackUrls(
  url: string,
  htmlUrl?: string,
  options?: { parseUserAgent?: boolean; pdfJsViewerUrl?: string; googleViewerUrl?: string },
) {
  options = {
    parseUserAgent: false,
    pdfJsViewerUrl: "https://mozilla.github.io/pdf.js/legacy/web/viewer.html?file=",
    googleViewerUrl: "https://drive.google.com/viewerng/viewer?embedded=true&url=",
    ...(options ?? {}),
  };
  const fallbackUrls = [];

  if (options.parseUserAgent) {
    const { browser, engine } = UAParser();
    const browserVersion = semver.coerce(browser.version) ?? "0";
    const engineVersion = semver.coerce(engine.version) ?? "0";

    if (
      (engine.is(EngineName.BLINK) && semver.satisfies(engineVersion, ">=125")) ||
      (engine.is(EngineName.GECKO) && semver.satisfies(engineVersion, ">=140"))
      // (browser.is(BrowserName.FIREFOX) && semver.satisfies(browserVersion, ">=140")) ||
      // browser.is(BrowserName.EDGE) ||
      // browser.is(BrowserName.SAFARI) ||
      // browser.is(BrowserName.CHROMIUM) ||
      // browser.is(BrowserName.CHROME) ||
      // browser.is(BrowserName.OPERA)
    ) {
      fallbackUrls.push(`${options.pdfJsViewerUrl}${encodeURIComponent(url)}`);
    }
  }

  if (htmlUrl) fallbackUrls.push(htmlUrl);

  fallbackUrls.push(`${options.googleViewerUrl}${encodeURIComponent(url)}`);

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
  const [fallbackUrls, setFallbackUrls] = useState(() => getPdfFallbackUrls(url, htmlUrl));
  const [fallbackUrlIndex, setFallbackUrlIndex] = useState(0);

  useEffect(() => {
    if (window.navigator.pdfViewerEnabled) return;

    const fallbackUrlsOnClient = getPdfFallbackUrls(url, htmlUrl, { parseUserAgent: true });
    setFallbackUrls(fallbackUrlsOnClient);
  }, [url, htmlUrl]);

  const fallbackUrl = fallbackUrls[fallbackUrlIndex];

  // const [hasLoaded, setHasLoaded] = useState(false);
  // const timeoutRef = useRef<NodeJS.Timeout>(null);

  // useEffect(() => {
  //   if (navigator.pdfViewerEnabled || hasLoaded) return;

  //   timeoutRef.current = setTimeout(() => {
  //     if (!hasLoaded) {
  //       setFallbackUrlIndex((fallbackUrlIndex) => (fallbackUrlIndex + 1) % fallbackUrls.length);
  //     }
  //   }, fallbackTimeoutMs);

  //   return () => {
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //   };
  // }, [hasLoaded, fallbackUrlIndex, fallbackTimeoutMs, fallbackUrls.length]);

  // const handleOnLoad = () => {
  //   // If it fires successfully, clear the switch-over timer
  //   setHasLoaded(true);
  //   if (timeoutRef.current) clearTimeout(timeoutRef.current);
  // };

  // if (fallbackUrl === "custom") return <PdfViewerCustom url={url} />;

  return (
    <iframe
      key={fallbackUrl}
      src={fallbackUrl}
      title={title}
      // onLoad={handleOnLoad}
      className="w-full grow border-0"
      allowFullScreen
    ></iframe>
  );
}
