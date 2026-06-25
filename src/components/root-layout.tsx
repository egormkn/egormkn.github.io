import clsx from "clsx";

import { fontsClassName } from "@/components/fonts";
import RootProviders from "@/components/root-providers";

import RootScripts from "./root-scripts";

import "@/styles/globals.css";

export type RootLayoutProps = React.PropsWithChildren<React.HTMLAttributes<HTMLHtmlElement>> & {
  bodyProps?: React.HTMLAttributes<HTMLBodyElement>;
};

export default function RootLayout({ bodyProps, children, className, ...props }: RootLayoutProps) {
  return (
    <html className={clsx(fontsClassName, className)} {...props} suppressHydrationWarning>
      <body {...bodyProps}>
        <RootScripts />
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
