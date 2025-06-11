// For more help visit https://formspr.ee/react-help
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import "./ContactForm.css";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mbjwwvdd");

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="success-message"
      >
        <div className="message-icon success">
          <i className="fas fa-check-circle"></i>
        </div>
        <h3>Thank you for contacting me!</h3>
        <p>I will get back to you as soon as possible.</p>
      </motion.div>
    );
  } else if (state.errors?.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="error-message"
      >
        <div className="message-icon error">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h3>Oops! Something went wrong.</h3>
        <p>Please email me directly at contact@danieleskinazi.com</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="modern-contact-form"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            <i className="fas fa-user"></i>
            Full Name
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              className="form-input"
              required
            />
            <div className="input-glow"></div>
          </div>
          <ValidationError prefix="Name" field="name" errors={state.errors} className="validation-error" />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <i className="fas fa-envelope"></i>
            Email Address
          </label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              className="form-input"
              required
            />
            <div className="input-glow"></div>
          </div>
          <ValidationError prefix="Email" field="email" errors={state.errors} className="validation-error" />
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="message" className="form-label">
          <i className="fas fa-comment-alt"></i>
          Message
        </label>
        <div className="input-wrapper">
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Tell me about your project or just say hello!"
            className="form-textarea"
            required
          />
          <div className="input-glow"></div>
        </div>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="validation-error"
        />
      </div>

      <motion.button
        type="submit"
        disabled={state.submitting}
        className={`submit-button ${state.submitting ? 'submitting' : ''}`}
        whileHover={{ scale: state.submitting ? 1 : 1.02 }}
        whileTap={{ scale: state.submitting ? 1 : 0.98 }}
      >
        {state.submitting ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Sending...
          </>
        ) : (
          <>
            <i className="fas fa-paper-plane"></i>
            Send Message
          </>
        )}
        <div className="button-glow"></div>
      </motion.button>
    </motion.form>
  );
}
