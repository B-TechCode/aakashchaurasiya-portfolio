import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import SectionWrapper from "../components/SectionWrapper";
import ProjectCard from "../components/ProjectCard";

import { fetchPublicProjects } from "../services/projectService";
import { fetchSocialLinks } from "../services/socialLinkService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [githubUrl, setGithubUrl] = useState("#");

  useEffect(() => {
    loadProjects();
    loadSocialLinks();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchPublicProjects();

      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSocialLinks = async () => {
    try {
      const links = await fetchSocialLinks();

      const github = links.find(
        (item) => item.platform === "GitHub"
      );

      if (github) {
        setGithubUrl(github.url);
      }
    } catch (error) {
      console.error("Failed to load social links", error);
    }
  };

  return (
    <SectionWrapper id="projects">
      <div className="section-container">

        {/* Heading */}

        <div className="text-center mb-8">
          <p className="section-label">
            Projects
          </p>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">
              Loading projects...
            </p>
          </div>
        ) : !projects.length ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white">
              No Projects Yet
            </h3>

            <p className="text-slate-400 mt-3">
              Projects will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        {/* GitHub Button */}

        <div className="text-center mt-8">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost py-2 px-4 text-sm"
          >
            See All Projects

            <FiArrowRight className="inline ml-2" />
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
}