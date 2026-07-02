import { Metadata, ResolvingMetadata } from "next";

import { getCanonicalPathname } from "@/i18n/routing";

type MetadataProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type AsyncGenerateMetadata = (props: MetadataProps, parent: ResolvingMetadata) => Promise<Metadata>;

export function generateMetadataWithI18n(generateMetadata?: AsyncGenerateMetadata) {
  return async ({ params, searchParams }: MetadataProps, parent: ResolvingMetadata): Promise<Metadata> => {
    const resolvedParentMetadata = await parent;
    const resolvedCanonical = resolvedParentMetadata.alternates?.canonical?.url;
    const canonical = resolvedCanonical ? getCanonicalPathname(new URL(resolvedCanonical).pathname) : undefined;
    const result = generateMetadata ? await generateMetadata({ params, searchParams }, parent) : {};
    if (!result.alternates) {
      result.alternates = {};
    }
    result.alternates.canonical = canonical;
    return result;
  };
}
