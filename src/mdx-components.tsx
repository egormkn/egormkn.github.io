import type { MDXComponents } from "mdx/types";

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <article className="prose md:prose-lg lg:prose-xl dark:prose-invert mx-auto py-10">{children}</article>;
}

export function ContainerLayout({ children }: { children: React.ReactNode }) {
  return <article className="prose md:prose-lg lg:prose-xl dark:prose-invert mx-auto py-10 container!">{children}</article>;
}

export function FullWidthLayout({ children }: { children: React.ReactNode }) {
  return <article className="prose md:prose-lg lg:prose-xl dark:prose-invert mx-auto py-10 max-w-none">{children}</article>;
}

const components = {
  wrapper: DefaultLayout,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
