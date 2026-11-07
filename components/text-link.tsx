import Link from "next/link";

const CLASS_NAME = "underline underline-offset-4 hover:text-foreground";

export function TextLink({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={CLASS_NAME}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={CLASS_NAME}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
