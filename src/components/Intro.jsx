import React, { useEffect, useState } from "react";
import "./Intro.css"; // Import CSS for styling
import Particles from "react-tsparticles"; // Import Particles from react-tsparticles
import { loadFull } from "tsparticles"; // Import loadFull from tsparticles
import { loadLinksPreset } from "tsparticles-preset-links"; // Import Links preset

const Intro = () => {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3) {
        setShowParticles(false);
      } else {
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
    await loadLinksPreset(main);
  };

  return (
    <>
      <section id="intro" className="full-page">
        {showParticles && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              preset: "links",
              background: {
                color: {
                  value: "#252a34", // Update background color
                },
              },
            }}
            className="particles"
          />
        )}
        <div className="centered-content">
          <p className="text">
            Hello, I'm <span id="my-name">Daniel Eskinazi.</span>
            <br />
            I'm a full-stack developer.
          </p>
          <a href="#about" className="button smooth-scroll">
            Learn More
          </a>
        </div>
      </section>
    </>
  );
};

export default Intro;
