import React from "react";
import { motion } from "framer-motion";

const Projects = () => (
  <section id="projects" className="projects">
    <div className="projects-container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="projects-title"
      >
        Featured Projects
      </motion.h2>

      <div className="projects-grid">
        <motion.div whileHover={{ scale: 1.05 }} className="project-card">
          <h3 className="project-title">Personal Finance Dashboard</h3>
          <p className="project-description">
            A full-stack application built with React, Node.js and MongoDB that
            helps users track expenses, set budgets and visualize spending
            patterns with interactive charts.
          </p>
          <div className="project-tags">
            <span className="tag tag-react">React</span>
            <span className="tag tag-node">Node.js</span>
            <span className="tag tag-mongo">MongoDB</span>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="project-card">
          <h3 className="project-title">AI Recipe Generator</h3>
          <p className="project-description">
            An innovative web app that uses OpenAI's GPT-3 to generate unique
            recipes based on available ingredients. Features include meal
            planning, nutritional information, and shopping lists.
          </p>
          <div className="project-tags">
            <span className="tag tag-next">Next.js</span>
            <span className="tag tag-openai">OpenAI API</span>
            <span className="tag tag-css">CSS</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Projects;
