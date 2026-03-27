// sections/Skills.jsx
// Visual skill cards with proficiency bars

import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import {
  FaJava, FaReact, FaGitAlt, FaDatabase, FaPython
} from 'react-icons/fa'
import { SiJavascript, SiSpringboot, SiMysql, SiPostman, SiPython,  } from 'react-icons/si'

// ─── Skill Data ────────────────────────────────────────────────────────
// level: 0–100 (approximate proficiency for the progress bar)
const SKILLS = [
  // Languages & Core
  { name: 'Java',         icon: FaJava,        level: 80, color: '#f89820', category: 'Language'   },
  { name: 'JavaScript',   icon: SiJavascript,  level: 70, color: '#f7df1e', category: 'Language'   },
    { name: 'Python', icon: SiPython,      level: 70, color: '#f7df1e', category: 'Language'   },

  // Frameworks & Libraries
  { name: 'React',        icon: FaReact,       level: 65, color: '#61dafb', category: 'Framework'  },
  { name: 'Spring Boot',  icon: SiSpringboot,  level: 50, color: '#6db33f', category: 'Framework'  },
  // Tools & DB
  { name: 'MySQL',        icon: SiMysql,       level: 65, color: '#4479a1', category: 'Tool'       },
  { name: 'Git',          icon: FaGitAlt,      level: 72, color: '#f05032', category: 'Tool'       },
  { name: 'Postman',      icon: SiPostman,     level: 68, color: '#ff6c37', category: 'Tool'       },
  { name: 'Databases',    icon: FaDatabase,    level: 60, color: '#22c55e', category: 'Tool'       },
]

const CATEGORIES = ['All', 'Language', 'Framework', 'Tool']

// ─── Component ─────────────────────────────────────────────────────────
import { useState } from 'react'

export default function Skills() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === active)

  return (
    <SectionWrapper id="skills" className="bg-navy-950/50">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-label"> Skills</p>
          <h2 className="section-heading">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Technologies I've worked with and am actively learning.
            The bars represent my current comfort level — always growing.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                active === cat
                  ? 'bg-accent text-navy-900 border-accent font-semibold'
                  : 'border-white/10 text-slate-400 hover:border-accent/40 hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(({ name, icon: Icon, level, color }, i) => (
            <motion.div
              key={name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="glass-card p-5 flex items-center gap-4 group hover:border-white/15 transition-all"
            >
              {/* Icon bubble */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: color + '18' }}
              >
                <Icon size={24} style={{ color }} />
              </div>

              {/* Info + bar */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-semibold text-sm text-white">{name}</span>
                  <span className="font-mono text-xs text-slate-500">{level}%</span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05 + 0.3, ease: 'easeOut' }}
                    className="h-full rounded-full skill-bar-fill"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning note */}
        <p className="text-center text-slate-600 font-mono text-xs mt-8">
          * Actively expanding skills in Spring Boot, System Design &amp; DSA
        </p>
      </div>
    </SectionWrapper>
  )
}
