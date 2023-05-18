/** @type {import('prettier').Config} */
module.exports = {
  editorconfig: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // Must be the last plugin
  ],
  pluginSearchDirs: false,
  importOrder: ["^@/(.*)$", "^[./].*(?<!\\.(?:c|sc|sa)ss)$", "^[./].*(?<=\\.(?:c|sc|sa)ss)$"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
