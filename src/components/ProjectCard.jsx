import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { recordAnalytics } from "../services/analyticsService";

export default function ProjectCard({ project, index }) {

  const {
    id,
    title,
    description,
    githubUrl,
    liveUrl,
    images = [],
    skillIds = [],
  } = project;

  const handleGithubClick = () => {
    recordAnalytics(
      "PROJECT_GITHUB_CLICK",
      "project",
      id
    );
  };

  const handleLiveDemoClick = () => {
    recordAnalytics(
      "PROJECT_LIVE_CLICK",
      "project",
      id
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="glass-card border-glow p-4 md:p-5 flex flex-col gap-3 group relative overflow-hidden"
    >

      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      {/* Project Image */}
      {images.length > 0 && (
        <img
          src={images[0].imageUrl}
          alt={title}
          className="w-full h-44 object-cover rounded-xl"
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between">

        <h3 className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        <div className="flex gap-2">

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGithubClick}
              className="text-slate-400 hover:text-accent"
            >
              <FiGithub size={18} />
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveDemoClick}
              className="text-slate-400 hover:text-accent"
            >
              <FiExternalLink size={18} />
            </a>
          )}

        </div>

      </div>

      {/* Description */}

      <p className="text-slate-400 text-xs leading-relaxed line-clamp-4">
        {description}
      </p>

      {/* Skills */}

      <div className="flex flex-wrap gap-1 mt-auto">

        {skillIds.map((skillId) => (

          <span
            key={skillId}
            className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20"
          >
            Skill #{skillId}
          </span>

        ))}

      </div>

      {/* Buttons */}

      <div className="flex gap-2 pt-1">

        {githubUrl && (

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGithubClick}
            className="btn-ghost text-[10px] py-1.5 px-3 flex-1 justify-center"
          >
            <FiGithub size={12} />
            <span className="ml-1">GitHub</span>
          </a>

        )}

        {liveUrl && (

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLiveDemoClick}
            className="btn-primary text-[10px] py-1.5 px-3 flex-1 justify-center"
          >
            <FiExternalLink size={12} />
            <span className="ml-1">Live Demo</span>
          </a>

        )}

      </div>

    </motion.div>
  );
}
