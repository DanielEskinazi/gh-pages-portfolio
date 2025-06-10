import React from "react";
import Intro from "./Intro";
import Header from "./Header";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import "../styles/global.css";
import "../styles/components.css";

export default function MainContent() {
  return (
    <>
      <Intro />
      <Header />
      <main className="main-content">
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
