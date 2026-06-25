import Content from "@/components/content";
import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}
