import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import "./Contact.css";

const Contact = () => (
  <section id="contact" className="modern-contact-section">
    <div className="contact-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="contact-header"
      >
        <div className="header-content">
          <span className="asterisk">*</span>
          <h2 className="section-title">LET'S WORK TOGETHER</h2>
        </div>
        <p className="contact-description">
          Ready to bring your ideas to life? I'm always excited to discuss new opportunities, 
          collaborate on interesting projects, or simply chat about the latest in tech. 
          Let's create something amazing together!
        </p>
      </motion.div>
      <ContactForm />
    </div>
  </section>
);

export default Contact;
