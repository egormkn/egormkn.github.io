import { Metadata } from "next";

import RootLayout, { metadata as rootLayoutMetadata } from "@/app/(i18n)/[locale]/layout";

export const metadata: Metadata = rootLayoutMetadata;

export default async function DefaultRootLayout({ children }: { children: React.ReactNode }) {
  return <RootLayout params={Promise.resolve({ locale: "en" })}>{children}</RootLayout>;
}
