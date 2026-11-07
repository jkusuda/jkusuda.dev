import type { Metadata } from "next";
import { siGithub } from "simple-icons";
import { PageTitle } from "@/components/page-title";
import { TextLink } from "@/components/text-link";

export const metadata: Metadata = {
  title: "contact",
  description: "How to get in touch with Jordan Kusuda.",
};

// simple-icons no longer includes LinkedIn, so its mark and the envelope are drawn here.
const LINKEDIN_LOGO =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
const EMAIL_LOGO =
  "M3 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H3Zm0 3.6 9 5.6 9-5.6v2.4l-9 5.6-9-5.6V7.6Z";

const LINKS = [
  {
    label: "Email",
    logo: EMAIL_LOGO,
    text: "kusuda.jordan.fl@gmail.com",
    href: "mailto:kusuda.jordan.fl@gmail.com",
  },
  {
    label: "LinkedIn",
    logo: LINKEDIN_LOGO,
    text: "jordankusuda",
    href: "https://www.linkedin.com/in/jordankusuda/",
  },
  { label: "GitHub", logo: siGithub.path, text: "jkusuda", href: "https://github.com/jkusuda" },
];

export default function Contact() {
  return (
    <div className="max-w-xl">
      <PageTitle>Let’s Connect!</PageTitle>
      <dl className="mt-10 grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 text-[15px] sm:gap-x-8 sm:text-[17px]">
        {LINKS.map(({ label, logo, text, href }) => (
          <div key={label} className="contents">
            <dt className="flex items-center gap-2.5 text-muted-foreground">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                fillRule="evenodd"
                className="size-5 shrink-0"
                aria-hidden
              >
                <path d={logo} />
              </svg>
              {label}
            </dt>
            <dd className="min-w-0 break-words">
              <TextLink href={href}>{text}</TextLink>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
