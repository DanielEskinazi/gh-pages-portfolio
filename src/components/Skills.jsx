import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Responsive Design"]
    },
    {
      title: "Backend", 
      skills: ["Node.js", "Python", "Java", "C++", "REST APIs", "Microservices"]
    },
    {
      title: "Databases",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Database Design"]
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Azure", "Docker", "Jenkins", "CI/CD", "Git"]
    },
    {
      title: "Frameworks & Tools",
      skills: ["Express.js", "Spring Boot", "Next.js", "VS Code", "Agile", "Scrum"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="skills-title"
        >
          Technical Skills
        </motion.h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="skill-category"
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
