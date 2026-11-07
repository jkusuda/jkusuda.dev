"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/graeme-gallery", label: "Graeme Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" style={{ viewTransitionName: "site-nav" }}>
      <ul className="flex flex-wrap justify-between gap-x-2 gap-y-1 text-sm whitespace-nowrap md:flex-col md:items-center md:gap-6 md:text-[17px]">
        {LINKS.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                data-intro-target="nav"
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-accent"
                    : "text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
