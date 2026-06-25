import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let project = await prisma.project.findFirst();
  if (!project) {
    project = await prisma.project.create({
      data: {
        name: "BM Ecosystem",
        slug: "bm-ecosystem",
        description: "A unified full-stack delivery and e-commerce platform.",
        intro: "Welcome to the BM Ecosystem project documentation. This document provides a comprehensive overview of the entire platform, its architecture, and the individual applications that make up the ecosystem.",
        architecture: "The ecosystem is built around a shared backend infrastructure that supports multiple frontend applications. Each platform is purpose-built for its target audience while maintaining consistency in design language, API patterns, and data flow. The architecture follows a monorepo structure with dedicated apps for each platform, shared libraries for common utilities, and a centralized API layer.",
        aboutText: "This documentation serves as the central reference for the BM Ecosystem — a unified full-stack delivery and e-commerce platform. Use the sidebar navigation to explore project overview, platform documentation, feature requests archive, active bug tracking, and deployment guides.",
        navigateText: "The sidebar on the left organizes all content into six main sections. Click on any section header to expand its sub-items. Select individual features under Platform Documentation to view specific spec details, or browse Active Work & Bug Reporting to see current sprint tasks.",
        sectionsJson: [
          { title: "1. Overview", desc: "Project introduction, external resources, and source code repositories" },
          { title: "2. Platform Documentation", desc: "In-depth specs, Figma designs, and sub-task logs for all seven applications" },
          { title: "3. Feature Requests", desc: "Historical and completed feature request logs per platform" },
          { title: "4. Active Work & Bug Reporting", desc: "Real-time tracking of active sprints, open bugs, and in-progress features" },
          { title: "5. QA", desc: "User story validation, test case tracking, and quality assurance across all platforms" },
          { title: "6. All Other Docs", desc: "Deployment checklists, supplementary system specs, and API references" }
        ]
      }
    });
    console.log("Created Project:", project.id);
  } else {
    await prisma.project.update({
      where: { id: project.id },
      data: {
        intro: "Welcome to the BM Ecosystem project documentation. This document provides a comprehensive overview of the entire platform, its architecture, and the individual applications that make up the ecosystem.",
        architecture: "The ecosystem is built around a shared backend infrastructure that supports multiple frontend applications. Each platform is purpose-built for its target audience while maintaining consistency in design language, API patterns, and data flow. The architecture follows a monorepo structure with dedicated apps for each platform, shared libraries for common utilities, and a centralized API layer.",
        aboutText: "This documentation serves as the central reference for the BM Ecosystem — a unified full-stack delivery and e-commerce platform. Use the sidebar navigation to explore project overview, platform documentation, feature requests archive, active bug tracking, and deployment guides.",
        navigateText: "The sidebar on the left organizes all content into six main sections. Click on any section header to expand its sub-items. Select individual features under Platform Documentation to view specific spec details, or browse Active Work & Bug Reporting to see current sprint tasks.",
        sectionsJson: [
          { title: "1. Overview", desc: "Project introduction, external resources, and source code repositories" },
          { title: "2. Platform Documentation", desc: "In-depth specs, Figma designs, and sub-task logs for all seven applications" },
          { title: "3. Feature Requests", desc: "Historical and completed feature request logs per platform" },
          { title: "4. Active Work & Bug Reporting", desc: "Real-time tracking of active sprints, open bugs, and in-progress features" },
          { title: "5. QA", desc: "User story validation, test case tracking, and quality assurance across all platforms" },
          { title: "6. All Other Docs", desc: "Deployment checklists, supplementary system specs, and API references" }
        ]
      }
    });
    console.log("Updated Project:", project.id);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
