import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import { TextLink } from "@/components/text-link";

const components: Components = {
  p: ({ node, children }) => {
    // A lone image becomes a <figure>, which can't live inside a <p>.
    const first = node?.children[0];
    if (first?.type === "element" && first.tagName === "img") return <>{children}</>;
    return <p>{children}</p>;
  },
  a: ({ href = "", children }) => <TextLink href={href}>{children}</TextLink>,
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      <figure className="my-8 space-y-2">
        <Image
          src={src}
          alt={alt ?? ""}
          width={0}
          height={0}
          sizes="(min-width: 672px) 640px, 100vw"
          className="h-auto w-full rounded-md border border-border"
        />
        {alt && <figcaption className="text-sm text-muted-foreground">{alt}</figcaption>}
      </figure>
    ) : null,
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-light tracking-[-0.02em]">{children}</h2>
  ),
  ul: ({ children }) => <ul className="list-disc space-y-3 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-3 pl-5">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-border/60 px-1 font-mono text-[0.9em]">{children}</code>
  ),
};

export function Markdown({ children }: Readonly<{ children: string }>) {
  return (
    <div className="space-y-5 text-[17px] leading-relaxed">
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
