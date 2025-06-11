import React from "react";
import "./About.css"; // Import CSS for styling

const About = () => (
  <section id="about">
    <div className="spacer"></div>
    <div className="about-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-image">
          <img src="/headshot.jpg" alt="Daniel Eskinazi" />
        </div>
        <h3 className="profile-name">Daniel Eskinazi</h3>
        <p className="profile-title">Full Stack Developer</p>
        <p className="profile-location">Plantation, Florida</p>

        <div className="social-links">
          <a href="#" className="social-link">
            <i className="fab fa-dribbble"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fas fa-envelope"></i>
          </a>
        </div>

        <button className="contact-button">Let's Talk</button>
      </div>

      {/* Main Content */}
      <div className="about-content">
        <h1 className="about-main-title">
          Transforming Your <br />
          Ideas into <span className="highlight-text">Reality</span>
        </h1>

        <div className="about-description">
          <p>
            Passionate about creating intuitive and engaging user experiences.
          </p>
          <p>
            Specialize in transforming ideas into beautifully crafted products.
          </p>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">+7</div>
            <div className="stat-label">
              <div>YEARS OF</div>
              <div>EXPERIENCE</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-number">+50</div>
            <div className="stat-label">
              <div>PROJECTS</div>
              <div>COMPLETED</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-number">+20</div>
            <div className="stat-label">
              <div>WORLDWIDE</div>
              <div>CLIENTS</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="primary-button">Let's Talk</button>
          <button className="secondary-button">
            My Work <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        {/* Trust Section */}
        <div className="trust-section">
          <p className="trust-text">
            Relied on by companies like American Express
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
