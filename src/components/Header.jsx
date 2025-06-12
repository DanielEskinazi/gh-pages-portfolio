import React, { useEffect, useState } from "react";
import "./Header.css"; // Import CSS for styling

const Header = () => {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const app = document.querySelector('.App');
      const scrollPos = app ? app.scrollTop : window.scrollY;
      const viewportHeight = window.innerHeight;
      
      console.log('SCROLL EVENT FIRED! ScrollPos:', scrollPos, 'ViewportHeight:', viewportHeight);
      
      // Simple section detection based on scroll position
      let currentSection = "intro";
      if (scrollPos >= viewportHeight * 2.8) { // Contact starts around 2624px
        currentSection = "contact";
      } else if (scrollPos >= viewportHeight * 1.9) { // Projects starts around 1776px  
        currentSection = "projects";
      } else if (scrollPos >= viewportHeight * 0.9) { // Skills starts around 928px
        currentSection = "skills";
      }
      
      console.log('Setting section to:', currentSection);
      setActiveSection(currentSection);
    };

    // Try both the App container and window
    const app = document.querySelector('.App');
    
    if (app) {
      console.log('Adding scroll listener to .App container');
      app.addEventListener("scroll", handleScroll);
    }
    
    console.log('Adding scroll listener to window');
    window.addEventListener("scroll", handleScroll);
    
    handleScroll(); // Call once on mount

    return () => {
      if (app) {
        app.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="mini-dock-header">
      <nav className="mini-dock-nav">
        <a 
          href="#intro" 
          className={`mini-nav-icon ${activeSection === "intro" ? "active" : ""}`} 
          title="Home"
        >
          <i className="fas fa-home"></i>
        </a>
        <a 
          href="#skills" 
          className={`mini-nav-icon ${activeSection === "skills" ? "active" : ""}`} 
          title="Tech Stack"
        >
          <i className="fas fa-code"></i>
        </a>
        <a 
          href="#projects" 
          className={`mini-nav-icon ${activeSection === "projects" ? "active" : ""}`} 
          title="Projects"
        >
          <i className="fas fa-briefcase"></i>
        </a>
        <a 
          href="#contact" 
          className={`mini-nav-icon ${activeSection === "contact" ? "active" : ""}`} 
          title="Contact"
        >
          <i className="fas fa-envelope"></i>
        </a>
      </nav>
    </header>
  );
};

export default Header;
