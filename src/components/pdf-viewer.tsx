import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import PdfViewerFallback from "./pdf-viewer-fallback";

const defaultPdfViewerOptions = {
  zoom: "auto",
  pagemode: "none",
  toolbar: "0",
  statusbar: "0",
  navpanes: "0",
  view: "Fit",
} as Record<string, string>;

export default function PdfViewer({
  title = "",
  url,
  htmlUrl,
  htmlMobileUrl,
  className,
  fallbackTimeoutMs = 15000,
  pdfViewerOptions = defaultPdfViewerOptions,
  ...props
}: {
  title?: string;
  url: string;
  htmlUrl?: string;
  htmlMobileUrl?: string;
  className?: string;
  fallbackTimeoutMs?: number;
  pdfViewerOptions?: Record<string, string>;
} & React.HTMLAttributes<HTMLObjectElement>) {
  return (
    <div className={clsx("relative flex flex-col", className)}>
      <div className="absolute top-1/2 left-1/2 -translate-1/2">
        <FontAwesomeIcon icon={faSpinner} size="3x" spin />
      </div>
      <object
        title={title}
        data={url + "#" + new URLSearchParams(pdfViewerOptions).toString()}
        type="application/pdf"
        className="z-10 flex grow flex-col"
        {...props}
      >
        <PdfViewerFallback
          title={title}
          url={url}
          htmlUrl={htmlUrl}
          htmlMobileUrl={htmlMobileUrl}
          fallbackTimeoutMs={fallbackTimeoutMs}
        />
      </object>
    </div>
  );
}
