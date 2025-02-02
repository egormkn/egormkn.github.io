const tailwindAtRules = [
  "apply",
  "config",
  "custom-variant",
  "import",
  "plugin",
  "reference",
  "source",
  "theme",
  "utility",
  "variant",
];

/** @type {import('stylelint').Config} */
const stylelintConfig = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      { ignoreAtRules: [ ...tailwindAtRules ] },
    ],
    "import-notation": "string"
  },
};

export default stylelintConfig;
