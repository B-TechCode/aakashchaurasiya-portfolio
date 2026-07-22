import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import SectionWrapper from "../components/SectionWrapper";
import ProjectCard from "../components/ProjectCard";

import { fetchPublicProjects } from "../services/projectService";
import { fetchSocialLinks } from "../services/socialLinkService";
import { recordAnalytics } from "../services/analyticsService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [githubUrl, setGithubUrl] = useState("#");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(false);

      const [projectsData, socialLinks] = await Promise.all([
        fetchPublicProjects(),
        fetchSocialLinks(),
      ]);

      setProjects(projectsData);

      const github = socialLinks.find(
        (item) => item.platform === "GitHub"
      );

      if (github) {
        setGithubUrl(github.url);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubClick = () => {
    if (githubUrl !== "#") {
      recordAnalytics("GITHUB_CLICK");
    }
  };

  return (
  <SectionWrapper id="projects">
    <div className="section-container">

      {/* ====================== */}
      {/* Section Heading */}
      {/* ====================== */}

      <div className="text-center mb-10">

        <p className="section-label">
          Projects
        </p>

        <h2 className="section-heading">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
          A selection of projects showcasing my experience in full-stack
          development, scalable backend systems, modern frontend design,
          authentication, cloud deployment, and real-world problem solving.
        </p>

      </div>

      {/* ====================== */}
      {/* Loading */}
      {/* ====================== */}

      {loading ? (

        <div className="flex justify-center items-center py-24">

          <div className="text-center">

            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-5" />

            <p className="font-mono text-slate-400">
              Loading Projects...
            </p>

          </div>

        </div>

      ) : error ? (

        /* ====================== */
        /* Error State */
        /* ====================== */

        <div className="text-center py-20">

          <h3 className="text-2xl font-bold text-white mb-3">
            Failed to load projects
          </h3>

          <p className="text-slate-400 mb-6">
            Something went wrong while loading your projects.
          </p>

          <button
            onClick={loadData}
            className="btn-primary"
          >
            Retry
          </button>

        </div>

      ) : projects.length === 0 ? (

        /* ====================== */
        /* Empty State */
        /* ====================== */

        <div className="text-center py-20">

          <h3 className="text-2xl font-bold text-white">
            No Projects Yet
          </h3>

          <p className="text-slate-400 mt-3">
            Projects will appear here once they are published.
          </p>

        </div>

      ) : (

        /* ====================== */
        /* Projects Grid */
        /* ====================== */

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {projects.map((project, index) => (

            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />

          ))}

        </div>

      )}

      {/* ====================== */}
      {/* GitHub Button */}
      {/* ====================== */}

      {!loading && !error && githubUrl !== "#" && (

        <div className="text-center mt-12">

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGithubClick}
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3"
          >

            See All Projects

            <FiArrowRight size={18} />

          </a>

        </div>

      )}

    </div>
  </SectionWrapper>
);
}