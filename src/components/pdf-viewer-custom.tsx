"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export default function PdfViewerCustom({ url, initialPage = 1 }: { url: string; initialPage?: number }) {
  const containerRef = useRef(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Track the actual pixel width of the parent container
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPageWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div ref={containerRef} className="w-full">
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page className="mx-auto aspect-a4 w-min border border-slate-300 shadow-md" pageNumber={pageNumber} width={pageWidth} />
      </Document>

      {numPages && (
        <div className="daisy-join">
          {pageNumber > 1 && (
            <button className="daisy-btn daisy-join-item" onClick={() => setPageNumber((x) => x - 1)}>
              «
            </button>
          )}
          <button className="daisy-btn daisy-btn-disabled daisy-join-item">
            Page {pageNumber}/{numPages}
          </button>
          {pageNumber + 1 < numPages && (
            <button className="daisy-btn daisy-join-item" onClick={() => setPageNumber((x) => x + 1)}>
              »
            </button>
          )}
        </div>
      )}
    </div>
  );
}
