import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => (
  <section id="contact" className="contact">
    <div className="contact-container">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-description">
        I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
        Feel free to reach out!
      </p>
      <ContactForm />
    </div>
  </section>
);

export default Contact;
