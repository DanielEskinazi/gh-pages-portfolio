import React, { useState, useEffect } from "react";
import "./Intro.css"; // Import CSS for styling
import Particles from "react-tsparticles"; // Import Particles from react-tsparticles
import { loadFull } from "tsparticles"; // Import loadFull from tsparticles
import { loadLinksPreset } from "tsparticles-preset-links"; // Import Links preset
import { tsParticles } from "tsparticles-engine"; // Import tsParticles engine

const Intro = () => {
  const [commitCount, setCommitCount] = useState(0); // Start with 0 particles
  const [commits, setCommits] = useState([]); // Store commit data for linking
  const [particlesReady, setParticlesReady] = useState(false); // Track when particles are loaded

  // Detect if user is on mobile device
  const isMobile = () => {
    return (
      window.innerWidth <= 768 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  };

  // Detect if user is on a low-powered device
  const isLowPerformanceDevice = () => {
    return (
      window.navigator.hardwareConcurrency <= 2 ||
      window.innerWidth <= 480 ||
      /Android.*Version\/4/i.test(navigator.userAgent)
    );
  };

  useEffect(() => {
    const fetchRealCommits = async () => {
      try {
        // Use token in development, but not in production build to avoid exposure
        const GITHUB_TOKEN =
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_GITHUB_TOKEN
            : "";

        const headers = GITHUB_TOKEN
          ? {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            }
          : {
              Accept: "application/vnd.github.v3+json",
            };

        // First, get all repositories
        const reposResponse = await fetch(
          "https://api.github.com/users/DanielEskinazi/repos?per_page=100&type=all",
          { headers }
        );

        if (!reposResponse.ok) {
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }

        const repos = await reposResponse.json();

        // Fetch ALL commits from ALL repositories in parallel
        const commitPromises = repos.map(async (repo) => {
          const repoCommits = [];
          try {
            // Fetch first page to check if there are commits
            const firstPageResponse = await fetch(
              `https://api.github.com/repos/DanielEskinazi/${repo.name}/commits?per_page=100&page=1`,
              { headers }
            );

            if (firstPageResponse.ok) {
              const firstPageCommits = await firstPageResponse.json();

              if (firstPageCommits.length > 0) {
                // Add first page commits
                repoCommits.push(
                  ...firstPageCommits.map((commit) => ({
                    ...commit,
                    repoName: repo.name,
                    url: commit.html_url,
                  }))
                );

                // If we got 100 commits, there might be more pages
                if (firstPageCommits.length === 100) {
                  // Fetch remaining pages in parallel (up to 5 pages per repo)
                  const pagePromises = [];
                  for (let page = 2; page <= 5; page++) {
                    pagePromises.push(
                      fetch(
                        `https://api.github.com/repos/DanielEskinazi/${repo.name}/commits?per_page=100&page=${page}`,
                        { headers }
                      )
                        .then((res) => (res.ok ? res.json() : []))
                        .then((commits) =>
                          commits.map((commit) => ({
                            ...commit,
                            repoName: repo.name,
                            url: commit.html_url,
                          }))
                        )
                    );
                  }

                  const additionalPages = await Promise.all(pagePromises);
                  additionalPages.forEach((pageCommits) => {
                    if (pageCommits.length > 0) {
                      repoCommits.push(...pageCommits);
                    }
                  });
                }
              }
            }

            console.log(
              `Fetched ${repoCommits.length} commits from ${repo.name}`
            );
            return repoCommits;
          } catch (error) {
            console.log(`Error fetching commits for ${repo.name}:`, error);
            return [];
          }
        });

        // Wait for all repos to finish
        const allRepoCommits = await Promise.all(commitPromises);
        const allCommits = allRepoCommits.flat();

        if (allCommits.length > 0) {
          // Sort commits by date (most recent first) and take only the last 50
          const sortedCommits = allCommits.sort(
            (a, b) =>
              new Date(b.commit.author.date) - new Date(a.commit.author.date)
          );
          const last50Commits = sortedCommits.slice(0, 50);

          // Shuffle the last 50 commits for random particle-to-commit mapping
          const shuffledCommits = last50Commits.sort(() => Math.random() - 0.5);
          setCommits(shuffledCommits);

          // Set particles based on device capabilities
          const targetCount = isLowPerformanceDevice()
            ? Math.min(last50Commits.length, 15)
            : isMobile()
            ? Math.min(last50Commits.length, 25)
            : last50Commits.length;
          setCommitCount(targetCount);

          console.log(
            `Using last ${last50Commits.length} commits from GitHub!`
          );
        } else {
          throw new Error("No commits found");
        }
      } catch (error) {
        console.log("GitHub API failed, using fallback commits:", error);
        // Fallback to known commits if API fails
        const fallbackCommits = [
          {
            url: "https://github.com/DanielEskinazi/gh-pages-portfolio/commit/48b49f9",
            repoName: "gh-pages-portfolio",
          },
          {
            url: "https://github.com/DanielEskinazi/gh-pages-portfolio/commit/425ba0d",
            repoName: "gh-pages-portfolio",
          },
          {
            url: "https://github.com/DanielEskinazi/gh-pages-portfolio/commit/1266814",
            repoName: "gh-pages-portfolio",
          },
          {
            url: "https://github.com/DanielEskinazi/gh-pages-portfolio/commit/4d49e8f",
            repoName: "gh-pages-portfolio",
          },
          {
            url: "https://github.com/DanielEskinazi/gh-pages-portfolio/commit/bb6b481",
            repoName: "gh-pages-portfolio",
          },
        ];

        const fallbackCount = isLowPerformanceDevice() ? 10 : isMobile() ? 15 : 30;
        const expandedCommits = [];
        for (let i = 0; i < fallbackCount; i++) {
          expandedCommits.push(fallbackCommits[i % fallbackCommits.length]);
        }

        setCommits(expandedCommits);

        // Set fallback particles
        setCommitCount(fallbackCount);
      }
    };

    fetchRealCommits();
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
    await loadLinksPreset(main);
  };

  const particlesLoaded = (container) => {
    console.log("Particles loaded, setting up click handler");
    setParticlesReady(true); // Mark particles as ready

    // Only set up click handler for desktop - disable on mobile
    if (!isMobile()) {
      // Use the global tsParticles click handler
      tsParticles.setOnClickHandler((event, particlesInstance) => {
        // Check if we clicked on an actual clickable element
        const clickedElement = event.target;

        // Skip if clicking on buttons, links, inputs, or other interactive elements
        if (
          clickedElement.tagName === "BUTTON" ||
          clickedElement.tagName === "A" ||
          clickedElement.tagName === "INPUT" ||
          clickedElement.tagName === "TEXTAREA" ||
          clickedElement.tagName === "SELECT" ||
          clickedElement.classList.contains("button") ||
          clickedElement.classList.contains("learn-more-button") ||
          clickedElement.classList.contains("contact-button") ||
          clickedElement.classList.contains("social-link") ||
          clickedElement.classList.contains("content-blocker") ||
          clickedElement.closest("button") ||
          clickedElement.closest("a") ||
          clickedElement.closest("input") ||
          clickedElement.closest("textarea") ||
          clickedElement.closest("select") ||
          clickedElement.closest(".ui.button") ||
          clickedElement.closest(".content-blocker") ||
          clickedElement.closest("form")
        ) {
          return; // Don't handle clicks on actual interactive elements
        }

        console.log(
          "tsParticles click handler triggered!",
          event,
          particlesInstance
        );

        if (commits.length > 0) {
          const randomCommit =
            commits[Math.floor(Math.random() * commits.length)];
          console.log("Opening random commit:", randomCommit);
          window.open(randomCommit.url, "_blank");
        }
      });
    }
  };

  return (
    <>
      <section id="intro" className="full-page">
        <div className="particles-container">
          <div
            className={`particles-wrapper ${
              particlesReady ? "particles-visible" : ""
            }`}
          >
            <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              style={{ cursor: "pointer" }}
              options={{
                preset: "links",
                fullScreen: {
                  enable: true,
                  zIndex: 0,
                },
                background: {
                  color: {
                    value: "#252a34", // Match body background
                  },
                },
                particles: {
                  number: {
                    value: commitCount, // Dynamic count based on total commits across all repos
                  },
                  size: {
                    value: isMobile() ? 2 : 3,
                  },
                  move: {
                    speed: isMobile() ? 1 : 2,
                  },
                },
                interactivity: {
                  events: {
                    onHover: {
                      enable: !isMobile(), // Disable hover effects on mobile for performance
                      mode: ["grab", "bubble"],
                    },
                    onClick: {
                      enable: true,
                      mode: [],
                    },
                  },
                  modes: {
                    grab: {
                      distance: isMobile() ? 100 : 140,
                      links: {
                        opacity: 1,
                      },
                    },
                    bubble: {
                      distance: isMobile() ? 15 : 20,
                      size: isMobile() ? 6 : 8,
                      duration: 0.3,
                      opacity: 1,
                      speed: isMobile() ? 2 : 3,
                      color: {
                        value: "#8e2de2",
                      },
                    },
                  },
                },
              }}
              className="particles-box"
            />
          </div>
        </div>
        <div
          className={`centered-content ${
            particlesReady ? "particles-loaded" : ""
          }`}
        >
          <div className="content-blocker content-blocker">
            <div className="intro-layout">
              {/* Left side - Text content */}
              <div className="intro-content">
                <h1 className="intro-title">
                  <span className="frontend-text">FULL STACK</span>
                  <span className="developer-text">DEVELOPER</span>
                </h1>
                <p className="intro-description">
                  Hi! I'm <span className="name-highlight">Daniel</span>. A
                  Senior Full Stack Engineer with 7+ years of experience
                  building high-performance, scalable, and responsive web
                  solutions.
                </p>
                <a
                  href="#skills"
                  className="learn-more-button smooth-scroll intro-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  View My Tech Stack
                </a>
              </div>

              {/* Right side - Profile card */}
              <div className="profile-card content-blocker">
                <div className="profile-image">
                  <img src="/headshot.jpeg" alt="Daniel Eskinazi" />
                </div>
                <h3 className="profile-name">Daniel Eskinazi</h3>
                <p className="profile-title">Full Stack Developer</p>
                <p className="profile-location">Plantation, Florida</p>

                <div className="social-links">
                  <a
                    href="https://linkedin.com/in/danieleskinazi"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/DanielEskinazi"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="mailto:daniel@danieleskinazi.com"
                    className="social-link"
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>

                <a
                  href="#contact"
                  className="contact-button smooth-scroll"
                  onClick={(e) => e.stopPropagation()}
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
