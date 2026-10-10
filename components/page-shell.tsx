import { ThemeToggle } from "@/components/theme-toggle";

export function PageShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <ThemeToggle />
      <main className="mx-auto w-full max-w-2xl px-5 pt-16 pb-16 text-sm sm:px-6 sm:pt-14 sm:pb-24 sm:text-base">
        {children}
        <div className="mt-12 font-bold sm:mt-16">
          {"> "}
          <span className="animate-blink">_</span>
        </div>
      </main>
    </div>
  );
}
