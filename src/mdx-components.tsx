import type { MDXComponents } from "mdx/types";

const components = {
  wrapper: ({ children }) => (
    <article className="container mx-auto">{children}</article>
  )
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
