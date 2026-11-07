import type { ProjectArtName } from "@/components/project-art";
import type { Tech } from "@/components/tech-stack";

export type Project = {
  slug: string;
  name: string;
  kind: string;
  href: string;
  description: string;
  stack: Tech[];
  art: ProjectArtName;
  /** Tile background, and the popup background when there is no image. */
  tint: string;
  /** Line art color. */
  ink: string;
  /** Image in public/projects/<slug>/, shown around the popup's content. */
  background?: string;
  /** Keeps a low-resolution background crisp when it's scaled up. */
  pixelated?: boolean;
  /** Image in public/projects/<slug>/, shown on the tile instead of the art. */
  thumbnail?: string;
  /** The part after watch?v= in a YouTube link. */
  youtubeId?: string;
  /** Phone screenshots in public/projects/<slug>/, shown in the popup when there is no video. */
  screens?: { src: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "pokebrowser",
    name: "Pokebrowser",
    kind: "Browser game",
    href: "https://www.pokebrowser.net/",
    description: "A Chrome extension that brings a Pokémon adventure to your browser.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    art: "browser",
    tint: "#e6cfc3",
    ink: "#9a4f3c",
    background: "/projects/pokebrowser/background.gif",
    pixelated: true,
    thumbnail: "/projects/pokebrowser/thumbnail.webp",
    youtubeId: "DfkSVHb_8HI",
  },
  {
    slug: "mii-nagement",
    name: "Mii-nagement",
    kind: "Agent manager",
    href: "https://mii-nagement.vercel.app/",
    description:
      "A Tomodachi Life inspired agent manager where your coding agents live, interact with each other, and ship real code.",
    stack: ["Python", "Django", "Godot"],
    art: "island",
    tint: "#d2dfd6",
    ink: "#3f6b62",
    background: "/projects/mii-nagement/background.webp",
    thumbnail: "/projects/mii-nagement/thumbnail.webp",
    youtubeId: "bhfhtuuFQPg",
  },
  {
    slug: "journey-to-the-eye",
    name: "Journey to the Eye",
    kind: "Simulation",
    href: "https://journey-to-the-eye.vercel.app/",
    description: "A simulation of optimal paths between stars in the Milky Way.",
    stack: ["React", "Three.js", "TypeScript", "Vite", "Outer Wilds"],
    art: "galaxy",
    tint: "#d3d2b3",
    ink: "#4f5a45",
    background: "/projects/journey-to-the-eye/background.webp",
    thumbnail: "/projects/journey-to-the-eye/thumbnail.webp",
    youtubeId: "_3elCJ1uU1s",
  },
  {
    slug: "subscriptos",
    name: "Subscriptos",
    kind: "Chrome extension",
    href: "https://subscriptos-rho.vercel.app/",
    description:
      "An extension that scans terms of service as you browse and protects your credit card.",
    stack: ["React", "FastAPI", "Python", "Google Gemini", "Supabase"],
    art: "card",
    tint: "#ddd2ba",
    ink: "#6b5a3c",
    background: "/projects/subscriptos/background.png",
    thumbnail: "/projects/subscriptos/thumbnail.webp",
    youtubeId: "xxUuvp_TFpU",
  },
  {
    slug: "meeteor",
    name: "Meeteor",
    kind: "Astrophotography app",
    href: "https://github.com/jkusuda/meeteor",
    description:
      "An astrophotography social platform with daily challenges based on what's visible in the night sky.",
    stack: ["Flutter", "Dart", "Supabase"],
    art: "comet",
    tint: "#d5ccd4",
    ink: "#54465f",
    background: "/projects/meeteor/background.png",
    thumbnail: "/projects/meeteor/thumbnail.webp",
    screens: [
      { src: "/projects/meeteor/screen-home.webp", label: "Home" },
      { src: "/projects/meeteor/screen-explore.webp", label: "Explore" },
      { src: "/projects/meeteor/screen-post.webp", label: "Post" },
      { src: "/projects/meeteor/screen-challenges.webp", label: "Challenges" },
    ],
  },
];
