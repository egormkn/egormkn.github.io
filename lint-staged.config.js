/** @type {import('lint-staged').Config} */
module.exports = {
  "src/**/*.{js,jsx,ts,tsx}": ["prettier -w -u", "eslint"],
  "src/**/*.{css,scss}": ["prettier -w -u", "stylelint"],
  "src/**/*.json": "prettier -w -u",
  "src/**/*.md": "prettier -w -u",
}
