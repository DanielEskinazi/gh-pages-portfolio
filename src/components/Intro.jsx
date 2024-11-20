import React, { useEffect } from "react";
import "./Intro.css"; // Import CSS for styling

const Intro = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        document.body.classList.remove("hide-footer", "hide-header");
        document.body.classList.add("show-footer", "show-header");
      } else {
        document.body.classList.add("hide-footer", "hide-header");
        document.body.classList.remove("show-footer", "show-header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="intro" className="full-page">
      <div className="centered-content">
        <h2>About Me</h2>
        <p className="text">
          Hello, I'm Daniel Eskinazi. I'm a full-stack developer.
        </p>
        <a href="#about" className="button smooth-scroll">
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Intro;
