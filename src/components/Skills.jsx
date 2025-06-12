import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Skills.css";
import "./Intro.css";
import {
  SiGo,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiSupabase,
  SiRedis,
  SiMongodb,
  SiCouchbase,
  SiPrometheus,
  SiElasticsearch,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiAmazonwebservices,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiAnsible,
  SiJenkins,
  SiGitlab,
  SiGithubactions,
  SiJest,
  SiPytest,
  SiSplunk,
  SiGrafana,
  SiKibana,
  SiJaeger,
  SiFigma,
  SiPostman,
  SiJira,
  SiConfluence,
  SiSlack,
  SiGit,
  SiApachekafka,
  SiMysql,
  SiMake,
} from "react-icons/si";

// Brand colors for each technology
const techColors = {
  Go: "#00ADD8",
  "Node.js": "#339933",
  Python: "#3776AB",
  PostgreSQL: "#4169E1",
  Supabase: "#3ECF8E",
  Redis: "#DC382D",
  MongoDB: "#47A248",
  Couchbase: "#EA2328",
  Prometheus: "#E6522C",
  Elasticsearch: "#005571",
  Kafka: "#231F20",
  MySQL: "#4479A1",
  React: "#61DAFB",
  "Next.js": "#000000",
  Tailwind: "#06B6D4",
  TypeScript: "#3178C6",
  HTML: "#E34C26",
  CSS: "#1572B6",
  AWS: "#FF9900",
  GCP: "#4285F4",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  Ansible: "#EE0000",
  Jenkins: "#D24939",
  "GitLab CI/CD": "#FC6D26",
  "GitHub Actions": "#2088FF",
  Make: "#000000",
  Jest: "#C21325",
  Pytest: "#0A9EDC",
  "Go test": "#00ADD8",
  Splunk: "#000000",
  Grafana: "#F46800",
  Kibana: "#005571",
  Jaeger: "#60D0E4",
  N8N: "#EA4B71",
  Figma: "#F24E1E",
  Postman: "#FF6C37",
  Jira: "#0052CC",
  Confluence: "#172B4D",
  Slack: "#4A154B",
  Zoom: "#2D8CFF",
  Git: "#F05032",
};

const techStack = [
  // Backend
  {
    id: 1,
    name: "Go",
    category: "Backend",
    years: 6,
    tags: ["microservices", "concurrency", "performance", "cli"],
    icon: SiGo,
    core: true,
  },
  {
    id: 2,
    name: "Node.js",
    category: "Backend",
    years: 6,
    tags: ["express", "api", "middleware", "async"],
    icon: SiNodedotjs,
    core: true,
  },
  {
    id: 3,
    name: "Python",
    category: "Backend",
    years: 7,
    tags: ["fastapi", "django", "automation", "scripting"],
    icon: SiPython,
    core: true,
  },
  // Databases
  {
    id: 4,
    name: "PostgreSQL",
    category: "Databases",
    years: 6,
    tags: ["sql", "indexing", "relations", "optimization"],
    icon: SiPostgresql,
    core: true,
  },
  {
    id: 5,
    name: "Supabase",
    category: "Databases",
    years: 2,
    tags: ["real-time", "auth", "edge-functions", "storage"],
    icon: SiSupabase,
    core: true,
  },
  {
    id: 6,
    name: "Redis",
    category: "Databases",
    years: 5,
    tags: ["caching", "sessions", "pub-sub", "performance"],
    icon: SiRedis,
    core: true,
  },
  {
    id: 7,
    name: "MongoDB",
    category: "Databases",
    years: 5,
    tags: ["nosql", "documents", "aggregation", "scaling"],
    icon: SiMongodb,
  },
  {
    id: 8,
    name: "Couchbase",
    category: "Databases",
    years: 6,
    tags: ["nosql", "documents", "n1ql", "clustering"],
    icon: SiCouchbase,
  },
  {
    id: 9,
    name: "Prometheus",
    category: "Databases",
    years: 2,
    tags: ["metrics", "time-series", "monitoring", "scraping"],
    icon: SiPrometheus,
  },
  {
    id: 10,
    name: "Elasticsearch",
    category: "Databases",
    years: 5,
    tags: ["search", "analytics", "logging", "indexing"],
    icon: SiElasticsearch,
  },
  {
    id: 11,
    name: "Kafka",
    category: "Databases",
    years: 6,
    tags: ["streaming", "pub-sub", "distributed", "real-time"],
    icon: SiApachekafka,
  },
  {
    id: 12,
    name: "MySQL",
    category: "Databases",
    years: 7,
    tags: ["sql", "relational", "transactions", "replication"],
    icon: SiMysql,
  },
  // Frontend
  {
    id: 11,
    name: "React",
    category: "Frontend",
    years: 7,
    tags: ["hooks", "context", "jsx", "components"],
    icon: SiReact,
    core: true,
  },
  {
    id: 12,
    name: "Next.js",
    category: "Frontend",
    years: 6,
    tags: ["ssr", "api-routes", "routing", "optimization"],
    icon: SiNextdotjs,
    core: true,
  },
  {
    id: 13,
    name: "Tailwind",
    category: "Frontend",
    years: 3,
    tags: ["utility-first", "responsive", "customization", "rapid"],
    icon: SiTailwindcss,
  },
  {
    id: 14,
    name: "TypeScript",
    category: "Frontend",
    years: 3,
    tags: ["types", "interfaces", "generics", "strict"],
    icon: SiTypescript,
    core: true,
  },
  {
    id: 15,
    name: "HTML",
    category: "Frontend",
    years: 7,
    tags: ["semantic", "accessibility", "forms", "multimedia"],
    icon: SiHtml5,
    core: true,
  },
  {
    id: 16,
    name: "CSS",
    category: "Frontend",
    years: 7,
    tags: ["responsive", "grid", "flexbox", "animations"],
    icon: SiCss3,
    core: true,
  },
  // Cloud
  {
    id: 16,
    name: "AWS",
    category: "Cloud",
    years: 1,
    tags: ["ec2", "s3", "lambda", "cloudformation"],
    icon: SiAmazonwebservices,
  },
  {
    id: 17,
    name: "GCP",
    category: "Cloud",
    years: 1,
    tags: ["compute", "storage", "bigquery", "kubernetes"],
    icon: SiGooglecloud,
  },
  // DevOps
  {
    id: 21,
    name: "Docker",
    category: "DevOps",
    years: 6,
    tags: ["containers", "compose", "images", "deployment"],
    icon: SiDocker,
    core: true,
  },
  {
    id: 22,
    name: "Kubernetes",
    category: "DevOps",
    years: 3,
    tags: ["orchestration", "pods", "services", "scaling"],
    icon: SiKubernetes,
  },
  {
    id: 24,
    name: "Ansible",
    category: "DevOps",
    years: 4,
    tags: ["automation", "playbooks", "configuration", "idempotent"],
    icon: SiAnsible,
  },
  {
    id: 25,
    name: "Jenkins",
    category: "DevOps",
    years: 4,
    tags: ["ci-cd", "pipelines", "automation", "plugins"],
    icon: SiJenkins,
  },
  {
    id: 26,
    name: "GitLab CI/CD",
    category: "DevOps",
    years: 4,
    tags: ["pipelines", "runners", "yaml", "automation"],
    icon: SiGitlab,
  },
  {
    id: 27,
    name: "GitHub Actions",
    category: "DevOps",
    years: 5,
    tags: ["workflows", "automation", "testing", "deployment"],
    icon: SiGithubactions,
  },
  {
    id: 28,
    name: "Make",
    category: "DevOps",
    years: 5,
    tags: ["build", "automation", "makefile", "dependencies"],
    icon: SiMake,
  },
  // Testing
  {
    id: 28,
    name: "Jest",
    category: "Testing",
    years: 7,
    tags: ["unit", "mocking", "coverage", "javascript"],
    icon: SiJest,
  },
  {
    id: 29,
    name: "Pytest",
    category: "Testing",
    years: 7,
    tags: ["python", "fixtures", "parametrize", "plugins"],
    icon: SiPytest,
  },
  {
    id: 30,
    name: "Go test",
    category: "Testing",
    years: 6,
    tags: ["testing", "benchmarks", "table-driven", "coverage"],
    icon: SiGo,
  },
  // Monitoring
  {
    id: 31,
    name: "Splunk",
    category: "Monitoring",
    years: 4,
    tags: ["logs", "search", "analytics", "dashboards"],
    icon: SiSplunk,
  },
  {
    id: 32,
    name: "Prometheus",
    category: "Monitoring",
    years: 5,
    tags: ["metrics", "time-series", "alerting", "scraping"],
    icon: SiPrometheus,
  },
  {
    id: 33,
    name: "Grafana",
    category: "Monitoring",
    years: 5,
    tags: ["dashboards", "visualization", "alerts", "queries"],
    icon: SiGrafana,
  },
  {
    id: 34,
    name: "Kibana",
    category: "Monitoring",
    years: 4,
    tags: ["elasticsearch", "visualization", "logs", "analytics"],
    icon: SiKibana,
  },
  {
    id: 35,
    name: "Jaeger",
    category: "Monitoring",
    years: 6,
    tags: ["tracing", "distributed", "performance", "debugging"],
    icon: SiJaeger,
  },
  // Tools
  {
    id: 36,
    name: "N8N",
    category: "Tools",
    years: 2,
    tags: ["automation", "workflows", "integrations", "visual"],
    icon: "🔗",
  },
  {
    id: 37,
    name: "Figma",
    category: "Tools",
    years: 3,
    tags: ["design", "prototyping", "collaboration", "ui-ux"],
    icon: SiFigma,
  },
  {
    id: 38,
    name: "Postman",
    category: "Tools",
    years: 7,
    tags: ["api-testing", "collections", "environments", "automation"],
    icon: SiPostman,
  },
  {
    id: 40,
    name: "Jira",
    category: "Tools",
    years: 7,
    tags: ["project-management", "agile", "tickets", "workflows"],
    icon: SiJira,
  },
  {
    id: 41,
    name: "Confluence",
    category: "Tools",
    years: 7,
    tags: ["documentation", "wiki", "collaboration", "atlassian"],
    icon: SiConfluence,
  },
  {
    id: 42,
    name: "Slack",
    category: "Tools",
    years: 7,
    tags: ["communication", "teams", "integrations", "workflows"],
    icon: SiSlack,
  },
  {
    id: 44,
    name: "Git",
    category: "Tools",
    years: 8,
    tags: ["version-control", "branching", "merging", "collaboration"],
    icon: SiGit,
  },
];

const categories = [
  "Core Stack",
  "Backend",
  "Databases",
  "Frontend",
  "Cloud",
  "DevOps",
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
                    : techStack.filter((tech) => tech.category === category)
                        .length}
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
                className="tech-card content-blocker"
              >
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="tech-header">
                    <span
                      className="tech-icon"
                      style={{
                        color: techColors[tech.name] || "#ffffff",
                        background: techColors[tech.name]
                          ? `${techColors[tech.name]}15`
                          : "rgba(255, 255, 255, 0.05)",
                        borderColor: techColors[tech.name]
                          ? `${techColors[tech.name]}30`
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {typeof tech.icon === "string" ? (
                        tech.icon
                      ) : (
                        <tech.icon />
                      )}
                    </span>
                    <div className="tech-info">
                      <h3 className="tech-name">{tech.name}</h3>
                      <span className="tech-category">{tech.category}</span>
                    </div>
                    <span className="experience-years">
                      {tech.years}+ years
                    </span>
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
