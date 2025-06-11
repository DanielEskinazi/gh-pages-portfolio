import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Skills.css";

const techStack = [
  // Frontend
  {
    id: 1,
    name: "React",
    category: "Frontend",
    proficiency: "Expert",
    years: 5,
    tags: ["hooks", "context", "jsx", "components"],
    icon: "⚛️",
    core: true,
  },
  {
    id: 2,
    name: "TypeScript",
    category: "Frontend",
    proficiency: "Expert",
    years: 4,
    tags: ["types", "interfaces", "generics", "strict"],
    icon: "🔷",
    core: true,
  },
  {
    id: 3,
    name: "Next.js",
    category: "Frontend",
    proficiency: "Expert",
    years: 3,
    tags: ["ssr", "api-routes", "routing", "optimization"],
    icon: "▲",
    core: true,
  },
  {
    id: 4,
    name: "Tailwind CSS",
    category: "Frontend",
    proficiency: "Expert",
    years: 3,
    tags: ["utility", "responsive", "customization", "theming"],
    icon: "💨",
  },
  {
    id: 5,
    name: "Framer Motion",
    category: "Frontend",
    proficiency: "Intermediate",
    years: 2,
    tags: ["animations", "gestures", "transitions", "spring"],
    icon: "🎭",
  },
  // Backend
  {
    id: 6,
    name: "Node.js",
    category: "Backend",
    proficiency: "Expert",
    years: 6,
    tags: ["express", "api", "middleware", "async"],
    icon: "💚",
    core: true,
  },
  {
    id: 7,
    name: "Python",
    category: "Backend",
    proficiency: "Expert",
    years: 7,
    tags: ["fastapi", "django", "automation", "scripting"],
    icon: "🐍",
    core: true,
  },
  {
    id: 8,
    name: "Go",
    category: "Backend",
    proficiency: "Intermediate",
    years: 2,
    tags: ["microservices", "concurrency", "performance", "cli"],
    icon: "🔷",
  },
  {
    id: 9,
    name: "GraphQL",
    category: "Backend",
    proficiency: "Intermediate",
    years: 3,
    tags: ["queries", "mutations", "schema", "resolvers"],
    icon: "🔍",
  },
  // Databases
  {
    id: 10,
    name: "PostgreSQL",
    category: "Databases",
    proficiency: "Expert",
    years: 6,
    tags: ["sql", "indexing", "relations", "optimization"],
    icon: "🐘",
    core: true,
  },
  {
    id: 11,
    name: "Redis",
    category: "Databases",
    proficiency: "Intermediate",
    years: 4,
    tags: ["caching", "sessions", "pub-sub", "performance"],
    icon: "🔴",
  },
  {
    id: 12,
    name: "Supabase",
    category: "Databases",
    proficiency: "Expert",
    years: 2,
    tags: ["real-time", "auth", "edge-functions", "storage"],
    icon: "⚡",
  },
  {
    id: 13,
    name: "Couchbase",
    category: "Databases",
    proficiency: "Intermediate",
    years: 3,
    tags: ["nosql", "documents", "n1ql", "clustering"],
    icon: "🛋️",
  },
  // DevOps
  {
    id: 14,
    name: "Docker",
    category: "DevOps",
    proficiency: "Expert",
    years: 5,
    tags: ["containers", "compose", "images", "deployment"],
    icon: "🐳",
    core: true,
  },
  {
    id: 15,
    name: "Kubernetes",
    category: "DevOps",
    proficiency: "Intermediate",
    years: 2,
    tags: ["orchestration", "pods", "services", "scaling"],
    icon: "☸️",
  },
  {
    id: 16,
    name: "GitHub Actions",
    category: "DevOps",
    proficiency: "Expert",
    years: 4,
    tags: ["ci-cd", "workflows", "automation", "testing"],
    icon: "🔄",
  },
  // Cloud Services
  {
    id: 17,
    name: "AWS",
    category: "Cloud Services",
    proficiency: "Intermediate",
    years: 4,
    tags: ["ec2", "s3", "lambda", "cloudformation"],
    icon: "☁️",
  },
  {
    id: 18,
    name: "Vercel",
    category: "Cloud Services",
    proficiency: "Expert",
    years: 3,
    tags: ["deployment", "edge", "serverless", "optimization"],
    icon: "▲",
  },
  // AI/ML
  {
    id: 19,
    name: "OpenAI API",
    category: "AI/ML",
    proficiency: "Intermediate",
    years: 2,
    tags: ["gpt", "embeddings", "completions", "fine-tuning"],
    icon: "🤖",
  },
  {
    id: 20,
    name: "LangChain",
    category: "AI/ML",
    proficiency: "Beginner",
    years: 1,
    tags: ["chains", "agents", "memory", "tools"],
    icon: "🔗",
  },
  // Testing
  {
    id: 21,
    name: "Jest",
    category: "Testing",
    proficiency: "Expert",
    years: 5,
    tags: ["unit", "mocking", "coverage", "tdd"],
    icon: "🃏",
  },
  {
    id: 22,
    name: "Playwright",
    category: "Testing",
    proficiency: "Intermediate",
    years: 2,
    tags: ["e2e", "automation", "browsers", "visual"],
    icon: "🎭",
  },
  // Monitoring
  {
    id: 23,
    name: "Sentry",
    category: "Monitoring",
    proficiency: "Intermediate",
    years: 3,
    tags: ["errors", "performance", "alerts", "debugging"],
    icon: "🚨",
  },
  // Tools
  {
    id: 24,
    name: "VS Code",
    category: "Tools",
    proficiency: "Expert",
    years: 7,
    tags: ["editor", "extensions", "debugging", "productivity"],
    icon: "💻",
  },
  {
    id: 25,
    name: "Git",
    category: "Tools",
    proficiency: "Expert",
    years: 7,
    tags: ["version-control", "branching", "merging", "collaboration"],
    icon: "📝",
    core: true,
  },
];

const categories = [
  "Core Stack",
  "Frontend",
  "Backend",
  "Databases",
  "DevOps",
  "Cloud Services",
  "AI/ML",
  "Testing",
  "Monitoring",
  "Tools",
];

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Core Stack");

  const filteredTech = useMemo(() => {
    return techStack.filter((tech) => {
      const matchesSearch =
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      let matchesCategory;
      if (selectedCategory === "Core Stack") {
        matchesCategory = tech.core === true;
      } else {
        matchesCategory = tech.category === selectedCategory;
      }
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section id="skills" className="tech-stack-explorer">
      <div className="tech-container">
        <div className="filters-section">
          <div className="search-container">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search technologies or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`category-pill ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
                <span className="category-count">
                  {category === "Core Stack" 
                    ? techStack.filter((tech) => tech.core === true).length
                    : techStack.filter((tech) => tech.category === category).length
                  }
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="results-info">
          <span className="results-count">
            {filteredTech.length} of {techStack.length} technologies
          </span>
        </div>

        <div className="tech-grid">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, index) => (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  layout: { duration: 0.3 },
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="tech-card"
              >
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="tech-header">
                    <span className="tech-icon">{tech.icon}</span>
                    <div className="tech-info">
                      <h3 className="tech-name">{tech.name}</h3>
                      <span className="tech-category">{tech.category}</span>
                    </div>
                  </div>

                  <div className="proficiency-section">
                    <div className="proficiency-info">
                      <span
                        className={`proficiency-badge ${tech.proficiency.toLowerCase()}`}
                      >
                        {tech.proficiency}
                      </span>
                      <span className="experience-years">
                        {tech.years}+ years
                      </span>
                    </div>
                  </div>

                  <div className="tech-tags">
                    {tech.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTech.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-results"
          >
            <span className="no-results-icon">🔍</span>
            <h3>No technologies found</h3>
            <p>Try adjusting your search or category filter</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
