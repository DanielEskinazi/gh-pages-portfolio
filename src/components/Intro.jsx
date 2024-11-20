import React, { useEffect, useState } from "react";
import "./Intro.css"; // Import CSS for styling
import Particles from "react-tsparticles"; // Import Particles from react-tsparticles
import { loadFull } from "tsparticles"; // Import loadFull from tsparticles

const Intro = () => {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        document.body.classList.remove("hide-footer", "hide-header");
        document.body.classList.add("show-footer", "show-header");
        setShowParticles(false);
      } else {
        document.body.classList.add("hide-footer", "hide-header");
        document.body.classList.remove("show-footer", "show-header");
        setShowParticles(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section id="intro" className="full-page">
      {showParticles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#ffffff",
              },
            },
            particles: {
              number: {
                value: 100,
              },
              size: {
                value: 5,
              },
              color: {
                value: "#007bff",
              },
              links: {
                enable: true,
                color: "#007bff",
                distance: 150,
              },
              move: {
                enable: true,
                speed: 2,
              },
            },
          }}
          className="particles"
        />
      )}
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
