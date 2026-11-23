import Link from "next/link";

const CLASS_NAME = "underline underline-offset-4 hover:text-foreground";

export function TextLink({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  const isFile = href.endsWith(".pdf");

  if (href.startsWith("/") && !isFile) {
    return (
      <Link href={href} className={CLASS_NAME}>
        {children}
      </Link>
    );
  }

  const newTab = isFile || href.startsWith("http");
  return (
    <a
      href={href}
      className={CLASS_NAME}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
