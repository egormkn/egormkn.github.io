import fs from "node:fs";
import path from "node:path";

export function getPosts() {
  const contentDirectory = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(contentDirectory);

  // Map files to the required parameter structure
  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx?$/, ""),
  }));
}
