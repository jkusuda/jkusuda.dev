import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { TextLink } from "@/components/text-link";
import { formatDate, getAllPosts } from "@/lib/posts";

const works = [
  {
    name: "POKEBROWSER",
    href: "https://www.pokebrowser.net/",
    description: "CHROME EXTENSION THAT BRINGS A POKEMON ADVENTURE TO YOUR BROWSER.",
  },
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

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <PageShell>
      <Image
        src="/avatar.jpg"
        alt="Jordan Kusuda"
        width={192}
        height={192}
        priority
        className="rounded-full size-20 object-cover sm:size-24"
      />

      <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
        <Section title="INTRO">
          <p>I love this judge!</p>
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

        <Section title="BLOG">
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <TextLink href={`/blog/${post.slug}`}>
                  {post.title.toUpperCase()}
                </TextLink>
                {" - "}
                {formatDate(post.date)}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            <TextLink href="/blog">ALL POSTS</TextLink>
          </p>
        </Section>

        <Section title="CONTACT">
          <p>
            <TextLink href="mailto:kusuda.jordan.fl@gmail.com">
              KUSUDA.JORDAN.FL@GMAIL.COM
            </TextLink>{" "}
            OR{" "}
            <TextLink href="https://www.linkedin.com/in/jordankusuda/">LINKEDIN</TextLink>
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
