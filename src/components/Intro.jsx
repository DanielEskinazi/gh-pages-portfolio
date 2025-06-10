import React, { useState, useEffect } from "react";
import "./Intro.css"; // Import CSS for styling
import Particles from "react-tsparticles"; // Import Particles from react-tsparticles
import { loadFull } from "tsparticles"; // Import loadFull from tsparticles
import { loadLinksPreset } from "tsparticles-preset-links"; // Import Links preset
import { tsParticles } from "tsparticles-engine"; // Import tsParticles engine

const Intro = () => {
  const [commitCount, setCommitCount] = useState(19); // Default fallback
  const [commits, setCommits] = useState([]); // Store commit data for linking
  const [particlesReady, setParticlesReady] = useState(false); // Track when particles are loaded

  useEffect(() => {
    const fetchRealCommits = async () => {
      try {
        // Use token in development, but not in production build to avoid exposure
        const GITHUB_TOKEN = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_GITHUB_TOKEN : '';
        
        const headers = GITHUB_TOKEN ? {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        } : {
          'Accept': 'application/vnd.github.v3+json'
        };

        // First, get all repositories
        const reposResponse = await fetch(
          'https://api.github.com/users/DanielEskinazi/repos?per_page=100&type=all',
          { headers }
        );
        
        if (!reposResponse.ok) {
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }
        
        const repos = await reposResponse.json();
        let allCommits = [];
        
        // Fetch ALL commits from ALL repositories
        for (const repo of repos) { // Keep all repos
          try {
            let page = 1;
            let hasMoreCommits = true;
            
            while (hasMoreCommits) {
              const commitsResponse = await fetch(
                `https://api.github.com/repos/DanielEskinazi/${repo.name}/commits?per_page=100&page=${page}`, // 100 commits per page
                { headers }
              );
              
              if (commitsResponse.ok) {
                const repoCommits = await commitsResponse.json();
                
                if (repoCommits.length === 0) {
                  hasMoreCommits = false;
                } else {
                  const commitsWithRepo = repoCommits.map(commit => ({
                    ...commit,
                    repoName: repo.name,
                    url: commit.html_url
                  }));
                  allCommits = [...allCommits, ...commitsWithRepo];
                  page++;
                  
                  // If we got less than 100, we're on the last page
                  if (repoCommits.length < 100) {
                    hasMoreCommits = false;
                  }
                }
              } else {
                console.log(`Failed to fetch commits for ${repo.name}, page ${page}`);
                hasMoreCommits = false;
              }
            }
            
            console.log(`Fetched ${allCommits.filter(c => c.repoName === repo.name).length} commits from ${repo.name}`);
          } catch (repoError) {
            console.log(`Error fetching commits for ${repo.name}:`, repoError);
          }
        }
        
        if (allCommits.length > 0) {
          // Shuffle commits for random particle-to-commit mapping
          const shuffledCommits = allCommits.sort(() => Math.random() - 0.5);
          setCommits(shuffledCommits);
          setCommitCount(Math.min(allCommits.length, 500)); // Cap at 500 particles for performance
          console.log(`Fetched ${allCommits.length} real commits from GitHub!`);
        } else {
          throw new Error('No commits found');
        }
        
      } catch (error) {
        console.log('GitHub API failed, using fallback commits:', error);
        // Fallback to known commits if API fails
        const fallbackCommits = [
          { url: 'https://github.com/DanielEskinazi/gh-pages-portfolio/commit/48b49f9', repoName: 'gh-pages-portfolio' },
          { url: 'https://github.com/DanielEskinazi/gh-pages-portfolio/commit/425ba0d', repoName: 'gh-pages-portfolio' },
          { url: 'https://github.com/DanielEskinazi/gh-pages-portfolio/commit/1266814', repoName: 'gh-pages-portfolio' },
          { url: 'https://github.com/DanielEskinazi/gh-pages-portfolio/commit/4d49e8f', repoName: 'gh-pages-portfolio' },
          { url: 'https://github.com/DanielEskinazi/gh-pages-portfolio/commit/bb6b481', repoName: 'gh-pages-portfolio' },
        ];
        
        const expandedCommits = [];
        for (let i = 0; i < 30; i++) {
          expandedCommits.push(fallbackCommits[i % fallbackCommits.length]);
        }
        
        setCommits(expandedCommits);
        setCommitCount(30);
      }
    };

    fetchRealCommits();
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
    await loadLinksPreset(main);
  };

  const particlesLoaded = (container) => {
    console.log('Particles loaded, setting up click handler');
    setParticlesReady(true); // Mark particles as ready
    
    // Use the global tsParticles click handler
    tsParticles.setOnClickHandler((event, particlesInstance) => {
      // Check if the click is within the intro section
      const introSection = document.getElementById('intro');
      if (!introSection || !introSection.contains(event.target)) {
        return; // Ignore clicks outside intro section
      }
      
      // Check if we clicked on a UI element (not particles)
      const clickedElement = event.target;
      if (clickedElement.classList.contains('button') || 
          clickedElement.classList.contains('text') ||
          clickedElement.closest('.content-blocker')) {
        return; // Don't handle clicks on UI elements
      }
      
      console.log('tsParticles click handler triggered!', event, particlesInstance);
      
      if (commits.length > 0) {
        const randomCommit = commits[Math.floor(Math.random() * commits.length)];
        console.log('Opening random commit:', randomCommit);
        window.open(randomCommit.url, '_blank');
      }
    });
  };

  return (
    <>
      <section id="intro" className="full-page">
        <div className="particles-container">
          <div className={`particles-wrapper ${particlesReady ? 'particles-visible' : ''}`}>
            <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            style={{ cursor: 'pointer' }}
            options={{
            preset: "links",
            fullScreen: {
              enable: false,
              zIndex: -1
            },
            background: {
              color: {
                value: "transparent", // Make background transparent
              },
            },
            particles: {
              number: {
                value: commitCount, // Dynamic count based on total commits across all repos
              },
              size: {
                value: 3,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                onClick: {
                  enable: true,
                  mode: [],
                },
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 1,
                  },
                },
              },
            },
          }}
          className="particles-box"
        />
          </div>
        </div>
        <div className={`centered-content ${particlesReady ? 'particles-loaded' : ''}`}>
          <div className="content-blocker">
            <p className="text intro-text">
              Hello, I'm <span id="my-name">Daniel Eskinazi.</span>
              <br />
              I'm a full-stack developer.
            </p>
            <a 
              href="#about" 
              className="button smooth-scroll intro-button"
              onClick={(e) => e.stopPropagation()}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
