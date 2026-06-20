import type { Metadata } from "next";

import Header from "@/components/header";
import RootLayout from "@/components/root-layout";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  const locale = "en"; // Default to English for the 404 page

  return (
    <RootLayout lang={locale}>
      <Header />
      <h1>404 - Page Not Found</h1>
      <p>This page does not exist.</p>
    </RootLayout>
  );
}
