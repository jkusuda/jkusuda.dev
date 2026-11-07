import Image from "next/image";
import {
  siDart,
  siDjango,
  siFastapi,
  siFlutter,
  siGodotengine,
  siGooglegemini,
  siNextdotjs,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVite,
} from "simple-icons";
import { Tooltip } from "@/components/tooltip";

const LOGOS = {
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  Supabase: siSupabase,
  "Tailwind CSS": siTailwindcss,
  "Three.js": siThreedotjs,
  Vite: siVite,
  Python: siPython,
  Django: siDjango,
  Godot: siGodotengine,
  Flutter: siFlutter,
  Dart: siDart,
  FastAPI: siFastapi,
  "Google Gemini": siGooglegemini,
};

// Not a real dependency: Journey to the Eye is a nod to this game, so its logo keeps its color.
const IMAGE_LOGOS = {
  "Outer Wilds": { src: "/projects/journey-to-the-eye/outer-wilds.png", width: 1798, height: 1604 },
};

export type Tech = keyof typeof LOGOS | keyof typeof IMAGE_LOGOS;

export function TechStack({ stack, className }: Readonly<{ stack: Tech[]; className: string }>) {
  return (
    <ul
      aria-label="Tech stack"
      className={`mt-7 flex flex-wrap items-center justify-center gap-5 ${className}`}
    >
      {stack.map((name) => (
        <li key={name} className="group relative">
          {/* Focusable so the name can also be reached by keyboard and by tapping. */}
          <span tabIndex={0} role="img" aria-label={name} className="block rounded-sm">
            {name in IMAGE_LOGOS ? (
              <Image
                {...IMAGE_LOGOS[name as keyof typeof IMAGE_LOGOS]}
                alt=""
                className="h-10 w-auto"
              />
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden>
                <path d={LOGOS[name as keyof typeof LOGOS].path} />
              </svg>
            )}
          </span>
          <Tooltip>{name}</Tooltip>
        </li>
      ))}
    </ul>
  );
}
