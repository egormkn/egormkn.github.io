import { config as fontawesomeConfig } from "@fortawesome/fontawesome-svg-core";
import { Geist, Geist_Mono, Inter } from "next/font/google";

fontawesomeConfig.autoAddCss = false;

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin", "cyrillic"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin", "cyrillic"],
// });

// const inter = Inter({ subsets: ["latin", "cyrillic"] });

// const fontsClassName = `${geistSans.variable} ${geistMono.variable}`;
const fontsClassName = ``;

export {
  // geistSans, geistMono, inter,
  fontsClassName,
};
