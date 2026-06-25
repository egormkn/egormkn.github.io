/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require.resolve("@tailwindcss/postcss"),
    require.resolve("postcss-preset-env"),
    require.resolve("postcss-focus-within"),
    require.resolve("./postcss-patches"),
  ],
};
