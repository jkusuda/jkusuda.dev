import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { TextLink } from "@/components/text-link";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} - jordan's website`,
    description: post.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <PageShell>
      <div className="space-y-8 sm:space-y-10">
        <p>
          <TextLink href="/blog">&lt; ALL POSTS</TextLink>
        </p>

        <Section title={post.title.toUpperCase()}>
          <p className="mb-6">{formatDate(post.date)}</p>
          <Markdown>{post.content}</Markdown>
        </Section>
      </div>
    </PageShell>
  );
}
