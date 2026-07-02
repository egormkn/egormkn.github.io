import type { MDXComponents } from "mdx/types";

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <article className="mx-auto prose py-10 md:prose-lg lg:prose-xl dark:prose-invert">{children}</article>;
}

export function ContainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="container! mx-auto prose py-10 md:prose-lg lg:prose-xl dark:prose-invert">{children}</article>
  );
}

export function FullWidthLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="mx-auto prose max-w-none py-10 md:prose-lg lg:prose-xl dark:prose-invert">{children}</article>
  );
}

export function DummyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const components = {
  wrapper: DefaultLayout,
} satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
