import { notFound } from "next/navigation";
import { getProjectById, type GitHubProject } from "../../services/github";
import { getProjectDetails, type ProjectDetails } from "../../data/projectDetails";
import ProjectPageClient from "./ProjectPageClient";

// Server Component - handles data fetching
export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  const projectDetails = getProjectDetails(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} projectDetails={projectDetails} />;
} 