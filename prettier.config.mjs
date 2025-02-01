/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss" // MUST come last
  ],
  importOrder: ["^@/(.*)$", "^[./].*(?<!\\.(?:c|sc|sa)ss)$", "^[./].*(?<=\\.(?:c|sc|sa)ss)$"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["clsx"]
};

export default config;
