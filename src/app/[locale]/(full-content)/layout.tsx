import Content from "@/components/content";
import Header from "@/components/header";
import { generateMetadataWithI18n } from "@/i18n/metadata";

export const generateMetadata = generateMetadataWithI18n;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Content fullWidth>{children}</Content>
    </>
  );
}
