import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  // Add configuration here
});

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // mandatory, otherwise won't export
  },
  distDir: "out",
};

export default withNextra(nextConfig);
