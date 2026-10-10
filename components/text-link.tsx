export function TextLink({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="underline underline-offset-4 hover:text-foreground"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
