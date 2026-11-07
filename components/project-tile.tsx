import Image from "next/image";
import Link from "next/link";
import { ProjectArt } from "@/components/project-art";
import type { Project } from "@/lib/projects";

export function ProjectTile({ project }: Readonly<{ project: Project }>) {
  const { slug, name, kind, tint, ink, art, thumbnail } = project;

  return (
    <Link
      href={`/projects?project=${slug}`}
      scroll={false}
      data-project-tile={slug}
      className="group block"
    >
      <div
        className="relative aspect-video overflow-hidden rounded-md transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1"
        style={{ backgroundColor: tint, color: ink, "--project-tint": tint } as React.CSSProperties}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="(min-width: 640px) 368px, 100vw"
            className="object-cover"
          />
        ) : (
          <ProjectArt name={art} />
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-[17px]">{name}</h2>
          <p className="text-sm text-muted-foreground">{kind}</p>
        </div>
        <span
          aria-hidden
          className="text-muted-foreground transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
