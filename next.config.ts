import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const allLightningCssFeatures = [
  "nesting",
  "not-selector-list",
  "dir-selector",
  "lang-selector-list",
  "is-selector",
  "text-decoration-thickness-percent",
  "media-interval-syntax",
  "media-range-syntax",
  "custom-media-queries",
  "clamp-function",
  "color-function",
  "oklab-colors",
  "lab-colors",
  "p3-colors",
  "hex-alpha-colors",
  "space-separated-color-notation",
  "font-family-system-ui",
  "double-position-gradients",
  "vendor-prefixes",
  "logical-properties",
  "light-dark",
] as const;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  experimental: {
    rootParams: true,
    globalNotFound: true,
    viewTransition: true,
    // lightningCssFeatures: {
    //   include: [...allLightningCssFeatures],
    // },
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
  },
};

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(withNextIntl(nextConfig));
