import React, { useEffect, useState } from "react";
import "./Header.css"; // Import CSS for styling

const Header = () => {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
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
