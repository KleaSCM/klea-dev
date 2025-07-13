import { notFound } from "next/navigation";
import { getProjectById, type Project } from "../../data/projects";
import ProjectPageClient from "./ProjectPageClient";

// Server Component - handles data fetching
export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
} 