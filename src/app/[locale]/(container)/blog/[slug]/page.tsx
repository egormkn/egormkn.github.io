import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { postBySlug, posts } from "../posts";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const { Content, ...props } = postBySlug[slug];

  const resolvedParent = await parent;

  return {
    title: props.title ?? resolvedParent.title,
    description: props.description ?? resolvedParent.description,
  };
}

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: PageProps<"/blog/[slug]"> | PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  if (!(slug in postBySlug)) {
    notFound();
  }
  const { Content, ...props } = postBySlug[slug];

  return <Content {...props} />;
}
