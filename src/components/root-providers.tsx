import { NextIntlClientProvider as I18nProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import { PagefindComponentsProvider } from "@/components/pagefind";
import { PAGEFIND_SCRIPT_URL } from "@/config";

export default function RootProviders({ children }: React.PropsWithChildren<object>) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <PagefindComponentsProvider src={PAGEFIND_SCRIPT_URL}>{children}</PagefindComponentsProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
