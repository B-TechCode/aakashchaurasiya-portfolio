// // components/ProjectCard.jsx
// // Reusable card for each project with hover effects

// import { motion } from 'framer-motion'
// import { FiGithub, FiExternalLink } from 'react-icons/fi'

// /**
//  * ProjectCard
//  * @param {object} project - { title, description, problem, solution, tech[], github, demo, featured }
//  * @param {number} index - for staggered animation
//  */
// export default function ProjectCard({ project, index }) {
//   const { title, description, tech, github, demo, emoji } = project

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: '-50px' }}
//       transition={{ duration: 0.5, delay: index * 0.12 }}
//       whileHover={{ y: -6 }}
//       className="glass-card border-glow p-6 md:p-7 flex flex-col gap-5 group relative overflow-hidden"
//     >
//       {/* Background glow on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

//       {/* Top row: emoji + github link */}
//       <div className="flex items-start justify-between">
//         <span className="text-3xl">{emoji}</span>
//         <div className="flex items-center gap-3">
//           {github && (
//             <a
//               href={github}
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="View on GitHub"
//               className="text-slate-400 hover:text-accent transition-colors"
//             >
//               <FiGithub size={20} />
//             </a>
//           )}
//           {demo && (
//             <a
//               href={demo}
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Live demo"
//               className="text-slate-400 hover:text-accent transition-colors"
//             >
//               <FiExternalLink size={20} />
//             </a>
//           )}
//         </div>
//       </div>

//       {/* Title */}
//       <div>
//         <h3 className="font-display font-bold text-xl text-white group-hover:text-accent transition-colors duration-300">
//           {title}
//         </h3>
//         <p className="text-slate-400 text-sm leading-relaxed mt-2">
//           {description}
//         </p>
//       </div>

//       {/* Tech stack */}
//       <div className="flex flex-wrap gap-2 mt-auto">
//         {tech.map((t) => (
//           <span
//             key={t}
//             className="font-mono text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20"
//           >
//             {t}
//           </span>
//         ))}
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-3 pt-1">
//         {github && (
//           <a href={github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-2 px-4 flex-1 justify-center">
//             <FiGithub size={14} /> GitHub
//           </a>
//         )}
//         {demo && (
//           <a href={demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2 px-4 flex-1 justify-center">
//             <FiExternalLink size={14} /> Live Demo
//           </a>
//         )}
//       </div>
//     </motion.div>
//   )
// }


//Edited code is Here
// components/ProjectCard.jsx

import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  const { title, description, tech, github, demo, emoji } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="glass-card border-glow p-4 md:p-5 flex flex-col gap-3 group relative overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="text-2xl">{emoji}</span>
        <div className="flex items-center gap-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              className="text-slate-400 hover:text-accent transition-colors"
            >
              <FiGithub size={18} />
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="text-slate-400 hover:text-accent transition-colors"
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mt-1 line-clamp-4">
          {description}
        </p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1 mt-auto">
        {tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-1">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-[10px] py-1.5 px-3 flex-1 justify-center">
            <FiGithub size={12} /> GitHub
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-[10px] py-1.5 px-3 flex-1 justify-center">
            <FiExternalLink size={12} /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  )
}