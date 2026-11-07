"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { PopupDialog } from "@/components/popup-dialog";
import { ProjectArt } from "@/components/project-art";
import { popupTheme, type PopupTheme } from "@/components/project-themes";
import { TechStack } from "@/components/tech-stack";
import type { Project } from "@/lib/projects";

type ProjectProps = Readonly<{ project: Project; theme: PopupTheme }>;

function ProjectMedia({ project, theme }: ProjectProps) {
  const { name, art, youtubeId, screens } = project;

  if (youtubeId) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={`${name} demo video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={`mt-7 aspect-video w-full ${theme.media}`}
      />
    );
  }

  if (screens) {
    return (
      <ul className="mt-7 flex snap-x gap-3 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
        {screens.map(({ src, label }) => (
          <li key={src} className="w-[45%] shrink-0 snap-center md:w-auto">
            <figure>
              <Image
                src={src}
                alt={`${name} ${label} screen`}
                width={480}
                height={1058}
                sizes="(min-width: 768px) 135px, 45vw"
                className={`h-auto w-full ${theme.media}`}
              />
              <figcaption className="mt-2 text-sm">{label}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`relative mt-7 aspect-video overflow-hidden ${theme.media}`}>
      <ProjectArt name={art} />
      <p className="absolute right-3 bottom-2 text-xs">Video coming soon</p>
    </div>
  );
}

function ProjectDetails({ project, theme }: ProjectProps) {
  const { name, href, description, stack, tint, background, pixelated } = project;
  const linkLabel = href.includes("github.com") ? "View on GitHub" : "Visit the site";

  return (
    <div
      className={`relative px-5 pt-16 pb-10 md:px-20 md:py-10 ${theme.surface}`}
      style={{ backgroundColor: tint }}
    >
      {background && (
        <Image
          src={background}
          alt=""
          fill
          loading="eager"
          unoptimized={pixelated}
          sizes="(min-width: 768px) 896px, 92vw"
          className="object-cover"
          style={{
            imageRendering: pixelated ? "pixelated" : undefined,
            objectPosition: theme.imagePosition,
          }}
        />
      )}
      {theme.scrim && <div className={`absolute inset-0 ${theme.scrim}`} />}

      <div className="relative mx-auto max-w-xl text-center">
        <h2 id="project-dialog-title" className={theme.title}>
          {name}
        </h2>
        {theme.tagline && <p className={`mt-1 ${theme.tagline.className}`}>{theme.tagline.text}</p>}
        <p className={`mx-auto mt-4 max-w-lg ${theme.description}`}>{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-block px-4 py-1.5 ${theme.link}`}
        >
          {linkLabel}
        </a>
        <ProjectMedia project={project} theme={theme} />
        {stack.length > 0 && <TechStack stack={stack} className={theme.stack} />}
      </div>
    </div>
  );
}

export function ProjectDialog({ projects }: Readonly<{ projects: Project[] }>) {
  const router = useRouter();
  const slug = useSearchParams().get("project");
  const project = projects.find((candidate) => candidate.slug === slug);
  const theme = project && popupTheme(project.slug);
  const dialog = useRef<HTMLDialogElement>(null);
  const openedFromGrid = useRef(false);

  useEffect(() => {
    if (!project) openedFromGrid.current = true;
    if (project && !dialog.current?.open) dialog.current?.showModal();
    if (!project && dialog.current?.open) dialog.current.close();
  }, [project]);

  // Also runs when Esc closes the dialog natively. A shared link has no grid
  // entry in history to go back to, so it replaces the URL instead.
  const handleClose = () => {
    if (!project) return;
    if (openedFromGrid.current) router.back();
    else router.replace("/projects", { scroll: false });
    document.querySelector<HTMLElement>(`[data-project-tile="${project.slug}"]`)?.focus();
  };

  return (
    <PopupDialog
      ref={dialog}
      aria-labelledby="project-dialog-title"
      onClose={handleClose}
      className="max-h-[90dvh] w-[min(92vw,56rem)] overflow-y-auto"
    >
      {project && theme && (
        <>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className={`absolute top-4 right-4 z-10 cursor-pointer px-3 py-1 text-sm ${theme.close}`}
          >
            Close ×
          </button>
          <ProjectDetails project={project} theme={theme} />
        </>
      )}
    </PopupDialog>
  );
}
