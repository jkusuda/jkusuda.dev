import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  description: string;
};

export type Post = PostMeta & { content: string };

function readPost(file: string): Post | null {
  const { data, content } = matter(
    fs.readFileSync(path.join(POSTS_DIR, file), "utf8"),
  );
  if (data.draft) return null;
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    date: data.date,
    description: data.description ?? "",
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter((post): post is Post => post !== null)
    .map(({ slug, title, date, description }) => ({ slug, title, date, description }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return null;
  return readPost(file);
}

/** "2026-10-10" -> "2026.10.10" (string-only, so no timezone drift). */
export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}
