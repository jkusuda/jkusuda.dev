import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/page-title";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "blog",
  description: "Writing from Jordan Kusuda about the projects he builds.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl">
      <PageTitle>Blog</PageTitle>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="text-xl underline-offset-4 group-hover:underline">{post.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{formatDate(post.date)}</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
