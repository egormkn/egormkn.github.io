/** @type {import("prettier").Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^@/(.*)$",
    "^[./].*(?<!\\.(?:c|sc|sa)ss)$",
    "^[./].*(?<=\\.(?:c|sc|sa)ss)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindStylesheet: "./src/styles/globals.css",
  tailwindFunctions: ["clsx"],
  overrides: [
    {
      files: "*.json",
      options: {
        trailingComma: "none",
      },
    },
  ],
};

export default config;
