import RootLayout, {metadata as rootLayoutMetadata} from "@/app/(i18n)/[locale]/layout";
import { Metadata } from 'next';

export const metadata: Metadata = rootLayoutMetadata;

export default async function DefaultRootLayout({
  children,
}: {children: React.ReactNode}) {
  return <RootLayout params={Promise.resolve({locale: 'en'})}>{children}</RootLayout>;
}
