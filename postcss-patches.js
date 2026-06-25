function removeDaisyDropdownHover(rule) {
  const selectors = rule.selectors
    .map((selector) => selector.replace(/:not\(\.daisy-dropdown-hover:hover\)/g, "").trim())
    .filter((s) => s.length > 0);

  if (selectors.length === 0) {
    rule.remove();
  } else {
    rule.selectors = selectors;
  }
}

/** @type {import('postcss').PluginCreator<object>} */
const creator = (opts) => {
  const options = Object.assign(
    {}, // Default options
    opts, // Provided options
  );

  return {
    postcssPlugin: "postcss-patches",
    Rule(rule) {
      removeDaisyDropdownHover(rule);
    },
  };
};

creator.postcss = true;

export default creator;
export { creator as "module.exports" };
