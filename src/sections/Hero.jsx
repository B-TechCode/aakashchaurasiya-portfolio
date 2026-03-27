// sections/Hero.jsx
// Full-screen hero with typewriter, animated intro, and CTA buttons

import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { useTypewriter } from '../hooks/useTypewriter'

// Staggered animation variants
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  // Words to cycle in the typewriter
  const dynamicText = useTypewriter(
    ['Full Stack Developer', 'Java Enthusiast', 'React Developer', 'Problem Solver'],
    80, 45, 2200
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Greeting badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 font-mono text-sm text-accent bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Available for Internships &amp; Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={itemVariants} className="font-display font-bold">
              <span className="block text-slate-400 text-lg md:text-xl mb-2 font-body font-normal">
                Hi, I'm
              </span>
              <span className="block text-white text-4xl md:text-6xl lg:text-3xl leading-tight">
                Aakash Prasad
              </span>
              <span className="block gradient-text glow-accent text-4xl md:text-6xl lg:text-4xl leading-tight">
                Chaurasiya
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 h-8">
              <span className="font-mono text-lg md:text-xl text-slate-300">
                {dynamicText}
              </span>
              <span className="typewriter-cursor" />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
              I build <span className="text-accent font-medium">scalable and modern web applications</span> using
              Java and React. 3rd Year B.Tech CSE student passionate about clean code,
              great UX, and continuous learning.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="btn-primary group">
                View Projects
                <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="btn-ghost group"
              >
                <FiDownload size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-5 pt-2">
              <span className="font-mono text-xs text-slate-500">Find me on</span>
              <a
                href="https://github.com/B-TechCode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-mono"
              >
                <FiGithub size={16} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/aakashprasadchaurasiya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-mono"
              >
                <FiLinkedin size={16} /> LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/5"
        >
          {[
            { value: '10+', label: 'Projects Built'   },
            { value: '3rd', label: 'Year B.Tech CSE'  },
            { value: '2+',  label: 'Years Coding'     },
            { value: '∞',   label: 'Passion to Learn' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display font-bold text-2xl md:text-3xl text-accent">{value}</p>
              <p className="text-slate-500 text-sm font-mono mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-slate-600">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
