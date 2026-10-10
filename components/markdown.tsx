import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import { TextLink } from "@/components/text-link";

// Post bodies are readable prose, so they use the full foreground colour
// (Section's muted colour is too low-contrast for long text).
const components: Components = {
  p: ({ node, children }) => {
    // a lone image becomes a <figure>, which can't live inside a <p>
    const first = node?.children[0];
    if (first?.type === "element" && first.tagName === "img") return <>{children}</>;
    return <p>{children}</p>;
  },
  a: ({ href = "", children }) => <TextLink href={href}>{children}</TextLink>,
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      <figure className="my-6 space-y-2">
        <Image
          src={src}
          alt={alt ?? ""}
          width={0}
          height={0}
          sizes="(min-width: 672px) 640px, 100vw"
          className="h-auto w-full border border-border"
        />
        {alt && (
          <figcaption className="text-xs text-muted-foreground">
            {"> "}
            {alt.toUpperCase()}
          </figcaption>
        )}
      </figure>
    ) : null,
  h2: ({ children }) => (
    <h2 className="mt-8 font-bold">
      {"> "}
      {children}
    </h2>
  ),
  ul: ({ children }) => <ul className="list-disc space-y-3 pl-[3ch]">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-3 pl-[3ch]">{children}</ol>,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-[2ch] text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children }) => <code className="bg-border px-1">{children}</code>,
};

export function Markdown({ children }: Readonly<{ children: string }>) {
  return (
    <div className="space-y-5 text-foreground">
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
