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
      <div className="daisy-fab">
        <Link href={url} target="_blank" className="daisy-btn bg-[#A31719] text-white">
          <FontAwesomeIcon icon={faFileArrowDown} /> Download PDF
        </Link>
      </div>
    </>
  );
}
