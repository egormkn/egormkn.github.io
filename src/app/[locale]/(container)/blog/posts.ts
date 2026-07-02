import { Locale } from "next-intl";
import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_DIRECTORY = path.join(process.cwd(), "content");

interface Post {
  file: string;
  slug: string;
  title: string;
  description: string;
  date: Date;
  lang: Locale;
  extension: string;
  Content: (props: any) => React.ReactNode;
}

async function loadPost(filePath: string): Promise<Post | null> {
  const absoluteFilePath = path.join(CONTENT_DIRECTORY, "blog", filePath);
  const match = filePath.match(/^(.+)(\.(?:en|ru))?\.(mdx?)$/i);
  if (!match) return null;
  const [_, slug, lang, _extension] = match;
  const { default: Content, frontmatter } = await import(`@/../content/blog/${slug}.mdx`);
  return {
    ...frontmatter,
    file: filePath,
    slug: frontmatter.slug ?? slug,
    lang: frontmatter.lang ?? lang,
    date: frontmatter.date ?? new Date((await fs.stat(absoluteFilePath)).mtime),
    Content,
  };
}

export async function getPosts() {
  const contentDirectory = path.join(CONTENT_DIRECTORY, "blog");
  const filePaths = await fs.readdir(contentDirectory, { recursive: true });
  const posts = await Promise.all(filePaths.map(loadPost));
  return posts.filter((post) => post !== null).sort((post) => post.date.getTime());
}

export const posts = await getPosts();

export const postBySlug = posts.reduce(
  function (acc, post) {
    acc[post.slug] = post;
    return acc;
  },
  {} as Record<string, Post>,
);
