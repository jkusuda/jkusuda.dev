import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { TextLink } from "@/components/text-link";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "blog - jordan's website",
  description: "Writing from Jordan Kusuda about the projects he builds.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <PageShell>
      <div className="space-y-8 sm:space-y-10">
        <Section title="BLOG">
          <ul className="space-y-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <TextLink href={`/blog/${post.slug}`}>
                  {post.title.toUpperCase()}
                </TextLink>
                {" - "}
                {formatDate(post.date)}
                <p className="mt-1 uppercase">{post.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <p>
          <TextLink href="/">&lt; BACK HOME</TextLink>
        </p>
      </div>
    </PageShell>
  );
}
