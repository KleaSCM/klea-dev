import { notFound, redirect } from "next/navigation";
import { getProjectById } from "../../services/github";
import { loadProjectDetails } from "../../data/universalTemplateLoader";
import UniversalProjectPageClient from "./UniversalProjectPageClient";

// Server Component - handles data fetching
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const project = await getProjectById(id);
    
    if (!project) {
      // If project not found, redirect to GitHub
      console.log(`Project ${id} not found, redirecting to GitHub`);
      redirect('https://github.com/KleaSCM');
    }

    // Safely get project details with error handling
    let projectDetails = null;
    try {
      projectDetails = await loadProjectDetails(id);
    } catch (error) {
      console.warn(`Failed to load project details for ${id}:`, error);
      // Check if it's a 418 teapot error (TEMPLATE.md not found)
      if (error instanceof Error && error.message.includes('418')) {
        console.log(`TEMPLATE.md not found for ${id} - showing basic project page`);
        // Continue without project details - will use basic GitHub data
      } else {
        // For other errors, throw them
        throw error;
      }
    }

    // If no project details (no TEMPLATE.md), still show the project page
    // The UniversalProjectPageClient can handle null projectDetails
    return <UniversalProjectPageClient project={project} projectDetails={projectDetails} />;
  } catch (error) {
    console.error(`Error loading project ${id}:`, error);
    notFound();
  }
} 