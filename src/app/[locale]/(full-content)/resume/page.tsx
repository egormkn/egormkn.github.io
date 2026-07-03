import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Link from "next/link";

import PdfViewer from "@/components/pdf-viewer";

export default function Page() {
  const t = useTranslations("Resume");

  const title = t("title");
  const url = t("url");
  const htmlUrl = t("htmlUrl");

  return (
    <>
      <PdfViewer title={title} url={url} htmlUrl={htmlUrl} className="w-full grow" />
      <div className="absolute bottom-8 right-8 z-50">
        <Link href={url} target="_blank" className="daisy-btn bg-red-800 text-white border-red-900 hover:bg-red-700 shadow-md shadow-red-700/50">
          <FontAwesomeIcon icon={faFileArrowDown} /> Download PDF
        </Link>
      </div>
    </>
  );
}
