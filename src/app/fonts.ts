import { config as fontawesomeConfig } from "@fortawesome/fontawesome-svg-core";

import { Geist, Geist_Mono, Inter } from "next/font/google";

fontawesomeConfig.autoAddCss = false;

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({ subsets: ["latin", "cyrillic"] });
