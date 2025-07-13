import { notFound } from "next/navigation";
import { getProjectById } from "../../services/github";
import { getProjectDetails } from "../../data/projectDetails";
import ProjectPageClient from "./ProjectPageClient";

// Server Component - handles data fetching
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  const projectDetails = getProjectDetails(id);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} projectDetails={projectDetails} />;
} 