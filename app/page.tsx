import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

const works = [
  {
    name: "JOURNEY TO THE EYE",
    href: "https://journey-to-the-eye.vercel.app/",
    description: "SIMULATION OF OPTIMAL PATHS BETWEEN STARS IN THE MILKY WAY",
  },
  {
    name: "SUBSCRIPTOS",
    href: "https://subscriptos-rho.vercel.app/",
    description: "EXTENSION TO SCAN TOS WHEN BROWSING AND PROTECT YOUR CREDIT CARD.",
  },
];

function Section({
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

function TextLink({
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

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <ThemeToggle />
      <main className="mx-auto w-full max-w-2xl px-5 pt-16 pb-16 text-sm sm:px-6 sm:pt-14 sm:pb-24 sm:text-base">
        <Image
          src="/avatar.jpg"
          alt="Jordan Kusuda"
          width={96}
          height={96}
          priority
          className="rounded-full size-20 sm:size-24"
        />

        <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
          <Section title="INTRO">
            <p>
              JORDAN KUSUDA - SOFTWARE ENGINEER BY PROFESSION. CURRENTLY EXPLORING
              HOW TO GIVE MY WORK MEANING TO OTHERS.
            </p>
          </Section>

          <Section title="INTERESTS">
            <p>PROGRAMMING, GAME DEV, POKEMON, OUTER SPACE</p>
          </Section>

          <Section title="WORKS">
            <ul className="space-y-3">
              {works.map((work) => (
                <li key={work.name}>
                  <TextLink href={work.href}>{work.name}</TextLink>
                  {" - "}
                  {work.description}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              SEE MORE ON{" "}
              <TextLink href="https://github.com/jkusuda">GITHUB</TextLink>
            </p>
          </Section>

          <Section title="CONTACT">
            <p>
              <TextLink href="mailto:kusuda.jordan@gmail.com">
                KUSUDA.JORDAN.FL@GMAIL.COM
              </TextLink>{" "}
              OR{" "}
              <TextLink href="https://www.linkedin.com/in/jordankusuda/">LINKEDIN</TextLink>
            </p>
          </Section>
        </div>

        <div className="mt-12 font-bold sm:mt-16">
          {"> "}
          <span className="animate-blink">_</span>
        </div>
      </main>
    </div>
  );
}
