import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { recordAnalytics } from "../services/analyticsService";

export default function ProjectCard({ project, index }) {

const {
  id,
  title,
  summary,
  description,
  githubUrl,
  liveUrl,
  images = [],
  skills = [],
} = project;

  const handleGithubClick = () => {

    if (githubUrl) {

      recordAnalytics(
        "PROJECT_GITHUB_CLICK",
        githubUrl,
        id
      );

    }

  };

  const handleLiveDemoClick = () => {

    if (liveUrl) {

      recordAnalytics(
        "PROJECT_LIVE_CLICK",
        liveUrl,
        id
      );

    }

  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={{ y: -6 }}
      className="glass-card border-glow p-5 flex flex-col gap-4 group relative overflow-hidden"
    >

      {/* Background Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Image */}

      <div className="overflow-hidden rounded-xl">

        <img
          src={
            images.length
              ? images[0].imageUrl
              : "https://placehold.co/600x350/0f172a/94a3b8?text=Project"
          }
          alt={title}
          className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
        />

      </div>

      {/* Header */}

      <div className="flex justify-between items-start gap-4">

        <h3 className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors">

          {title}

        </h3>

        <div className="flex gap-2">

          {githubUrl && (

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGithubClick}
              className="text-slate-400 hover:text-accent transition-colors"
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
              className="text-slate-400 hover:text-accent transition-colors"
            >
              <FiExternalLink size={18} />
            </a>

          )}

        </div>

      </div>

      {/* Description */}

      <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">

        {summary || description}

      </p>

      {/* Skills */}

    {/* Skills */}

<div className="flex flex-wrap gap-2 mt-auto">

  {skills.length > 0 ? (

    skills.map((skill) => (

      <span
        key={skill.id}
        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20"
      >
        {skill.name}
      </span>

    ))

  ) : (

    <span className="text-xs text-slate-500">
      No skills assigned
    </span>

  )}

</div>

      {/* Footer Buttons */}

      <div className="flex gap-3 pt-2">

        {githubUrl && (

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGithubClick}
            className="btn-ghost flex-1 justify-center text-xs"
          >

            <FiGithub size={14} />

            <span className="ml-2">
              GitHub
            </span>

          </a>

        )}

        {liveUrl && (

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLiveDemoClick}
            className="btn-primary flex-1 justify-center text-xs"
          >

            <FiExternalLink size={14} />

            <span className="ml-2">
              Live Demo
            </span>

          </a>

        )}

      </div>

    </motion.div>

  );

}