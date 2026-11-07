import { AboutPhotos } from "@/components/about-photos";
import { Intro } from "@/components/intro/intro";
import { TextLink } from "@/components/text-link";

export default function Home() {
  return (
    <div className="max-w-xl">
      <AboutPhotos />
      <h1
        data-intro-target="headline"
        className="text-[clamp(2.75rem,8vw,4.75rem)] leading-none font-light tracking-[-0.045em]"
      >
        Hi, I’m Jordan.
      </h1>
      <div
        data-intro-target="paragraph"
        className="mt-8 space-y-4 text-[17px] leading-relaxed text-muted-foreground"
      >
        <p>
          I’m a software engineer focused on backend systems and game development. I’m studying
          Computer Science at the University of Florida (graduating May 2028), and I’ve interned two
          times at <TextLink href="https://www.metrea.aero/">Metrea</TextLink>. Multiplayer servers,
          real-time systems, and the infrastructure that keeps games running smoothly are my
          specialty.
        </p>
        <p>
          I care about writing code that’s fast, reliable, and easy for the next person to work
          with.
        </p>
        <p>
          Outside of coding, I’m usually solving my daily puzzle, playing a Pokémon game, or reading
          about the latest space discoveries. This site is where I share what I build and what I’m
          learning.
        </p>
        <p>
          I’m currently looking for backend or game development internships. Feel free to reach out
          or check out my projects below.
        </p>
      </div>
      <p data-intro-target="projects-link" className="mt-6 text-[17px]">
        <TextLink href="/projects">See my projects →</TextLink>
      </p>
      <Intro />
    </div>
  );
}
