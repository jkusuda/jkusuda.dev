export function Section({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section>
      <h2 className="font-bold">
        {"> "}
        {title}
      </h2>
      <div className="mt-4 ml-[2ch] text-muted-foreground leading-relaxed break-words">
        {children}
      </div>
    </section>
  );
}
