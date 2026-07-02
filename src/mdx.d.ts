declare module "*.mdx" {
  import type { Locale } from "next-intl";

  export interface Frontmatter {
    [key: string]: any;
  }

  export const frontmatter: Frontmatter;

  export interface MDXProps {
    locale: Locale;
  }
}
