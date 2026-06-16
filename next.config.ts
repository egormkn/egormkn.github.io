import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  experimental: {
    rootParams: true,
    globalNotFound: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(withNextIntl(nextConfig));
