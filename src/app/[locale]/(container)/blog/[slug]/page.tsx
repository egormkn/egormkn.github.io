import { getPosts } from "../posts";

export function generateStaticParams() {
  const posts = getPosts();
  return [...posts];
}

export default async function Page({ params }: PageProps<"/blog/[slug]"> | PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const { default: Post, frontmatter } = await import(`@/../content/${slug}.mdx`);

  return <Post slug={slug} frontmatter={frontmatter} />;
}
