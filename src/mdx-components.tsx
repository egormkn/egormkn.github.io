import type { MDXComponents } from "mdx/types";

export function ContainerLayout({ children }: { children: React.ReactNode }) {
  return <article className="container mx-auto">{children}</article>;
}

export function FullWidthLayout({ children }: { children: React.ReactNode }) {
  return <article>{children}</article>;
}

const components = {
  wrapper: ContainerLayout,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
