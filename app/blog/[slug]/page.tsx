import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { PageTitle } from "@/components/page-title";
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
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="max-w-2xl">
      <p className="text-muted-foreground">
        <TextLink href="/blog">← All posts</TextLink>
      </p>
      <div className="mt-8">
        <PageTitle>{post.title}</PageTitle>
      </div>
      <p className="mt-3 mb-8 text-sm text-muted-foreground">{formatDate(post.date)}</p>
      <Markdown>{post.content}</Markdown>
    </article>
  );
}
