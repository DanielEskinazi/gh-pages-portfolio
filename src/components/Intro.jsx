import React from "react";
import "./Intro.css"; // Import CSS for styling
import Particles from "react-tsparticles"; // Import Particles from react-tsparticles
import { loadFull } from "tsparticles"; // Import loadFull from tsparticles
import { loadLinksPreset } from "tsparticles-preset-links"; // Import Links preset

const Intro = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
    await loadLinksPreset(main);
  };

  return (
    <>
      <section id="intro" className="full-page">
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
            particles: {
              number: {
                value: 50,
              },
              size: {
                value: 3,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
          className="particles-box"
        />
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
