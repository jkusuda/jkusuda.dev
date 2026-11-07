import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTitle } from "@/components/page-title";
import { ProjectDialog } from "@/components/project-dialog";
import { ProjectTile } from "@/components/project-tile";
import { TextLink } from "@/components/text-link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "projects",
  description: "Things Jordan Kusuda has built.",
};

export default function Projects() {
  return (
    <div className="max-w-3xl">
      <PageTitle>Projects</PageTitle>
      <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </div>
      <p className="mt-10 text-muted-foreground">
        See more on <TextLink href="https://github.com/jkusuda">GitHub</TextLink>
      </p>
      <Suspense fallback={null}>
        <ProjectDialog projects={projects} />
      </Suspense>
    </div>
  );
}
