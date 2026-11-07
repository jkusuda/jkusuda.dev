export function PageTitle({ children }: Readonly<{ children: React.ReactNode }>) {
  return <h1 className="text-5xl leading-tight font-light tracking-[-0.04em]">{children}</h1>;
}
