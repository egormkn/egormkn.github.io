export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "main" }, { slug: "about" }];
}

export default async function Page({ params }: PageProps<"/blog/[slug]"> | PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const { default: Post } = await import(`@/../content/${slug}.mdx`);

  return <Post />;
}
