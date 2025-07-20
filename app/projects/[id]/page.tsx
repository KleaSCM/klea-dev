import { notFound } from "next/navigation";
import { getProjectById } from "../../services/github";
import { loadProjectDetails } from "../../data/universalTemplateLoader";
import UniversalProjectPageClient from "./UniversalProjectPageClient";

// Server Component - handles data fetching
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const project = await getProjectById(id);
    
    if (!project) {
      notFound();
    }

    // Safely get project details with error handling
    let projectDetails = null;
    try {
      projectDetails = await loadProjectDetails(id);
    } catch (error) {
      console.warn(`Failed to load project details for ${id}:`, error);
      // Continue without project details - will use basic GitHub data
    }

    return <UniversalProjectPageClient project={project} projectDetails={projectDetails} />;
  } catch (error) {
    console.error(`Error loading project ${id}:`, error);
    notFound();
  }
} 