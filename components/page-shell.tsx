import { PageFade } from "@/components/page-fade";
import { PawTrails } from "@/components/paw-trails";
import { SiteNav } from "@/components/site-nav";
import { ThreadBackground } from "@/components/thread-background";

export function PageShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ThreadBackground />
      <PawTrails />
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-16 px-6 py-8 md:flex-row-reverse md:justify-between md:gap-12 md:px-10 md:py-0">
        <div className="md:sticky md:top-0 md:flex md:h-dvh md:items-center">
          <SiteNav />
        </div>
        <main className="min-w-0 flex-1 md:flex md:flex-col md:justify-center md:py-16">
          <PageFade>{children}</PageFade>
        </main>
      </div>
    </>
  );
}
