import { NextIntlClientProvider as I18nProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

export default function RootProviders({ children }: React.PropsWithChildren<object>) {
  return (
    <I18nProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </I18nProvider>
  );
}
