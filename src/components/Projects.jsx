import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      number: "01",
      title: "MTI Electronics",
      tech: ["Next.js", "Payload CMS", "Tailwind CSS"],
      description: "E-commerce platform for electronics retailer with custom CMS integration",
      preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop&q=80"
    },
    {
      id: 2,
      number: "02",
      title: "Epikeart",
      tech: ["React", "Redux", "React i18n"],
      description: "Multi-language e-commerce solution with advanced state management",
      preview: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=800&fit=crop&q=80"
    },
    {
      id: 3,
      number: "03",
      title: "Resume Roaster",
      tech: ["GPT-4", "Next.js", "PostgreSQL"],
      description: "AI-powered resume analysis and optimization platform",
      preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=800&fit=crop&q=80"
    },
    {
      id: 4,
      number: "04",
      title: "Real Estate",
      tech: ["React.js", "Redux", "Tailwind CSS"],
      description: "Modern real estate platform with advanced search and filtering",
      preview: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop&q=80"
    },
    {
      id: 5,
      number: "05",
      title: "Consulting Finance",
      tech: ["HTML", "CSS & SCSS", "Javascript"],
      description: "Corporate finance consulting website with interactive features",
      preview: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=800&fit=crop&q=80"
    },
    {
      id: 6,
      number: "06",
      title: "devLinks",
      tech: ["Next.js", "Formik", "Drag & Drop"],
      description: "Developer link sharing platform with customizable profiles",
      preview: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=800&fit=crop&q=80"
    }
  ];

  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeProject, setActiveProject] = useState(projects[0]); // Default to first project

  const handleProjectClick = (project) => {
    setActiveProject(project);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <span className="asterisk">*</span>
          <h2 className="section-title">SELECTED PROJECTS</h2>
        </div>
        
        <div className="projects-layout">
          <div className="projects-list">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={`project-item ${activeProject.id === project.id ? 'active' : ''}`}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(project)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: project.id * 0.1 }}
              >
                <span className="project-number">{project.number}.</span>
                <div className="project-info">
                  <div className="project-title-wrapper">
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                  <div className="project-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="projects-preview">
            {(hoveredProject || activeProject) && (
              <motion.div
                className="preview-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={(hoveredProject || activeProject).preview} 
                  alt={(hoveredProject || activeProject).title}
                  className="preview-image"
                />
                <div className="preview-header">
                  <h4>{(hoveredProject || activeProject).title}</h4>
                  <div className="preview-tech">
                    {(hoveredProject || activeProject).tech.map((tech, index) => (
                      <span key={index} className="preview-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="preview-info">
                  <p>{(hoveredProject || activeProject).description}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;