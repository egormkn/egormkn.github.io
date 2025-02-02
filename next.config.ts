import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  // Add configuration here
});

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
};

export default withNextra(nextConfig);
