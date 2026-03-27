// sections/Services.jsx
// Services offered with icon cards and descriptions

import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { FiMonitor, FiServer, FiLayout, FiCode, FiSmartphone, FiDatabase } from 'react-icons/fi'

const SERVICES = [
  {
    icon: FiLayout,
    title: 'Frontend Development',
    desc: 'Building pixel-perfect, responsive UIs with React and Tailwind CSS. Focus on performance, accessibility, and delightful user experience.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: FiServer,
    title: 'Backend Development',
    desc: 'Designing robust REST APIs and server-side logic using Java and Spring Boot. Clean architecture, proper error handling, and secure endpoints.',
    tags: ['Java', 'Spring Boot', 'REST APIs'],
  },
  {
    icon: FiMonitor,
    title: 'Full Stack Web Apps',
    desc: 'End-to-end web application development — from database schema to polished UI. Handling auth, CRUD, and deployment on modern platforms.',
    tags: ['Full Stack', 'MySQL', 'SpringBoot'],
  },
  {
    icon: FiDatabase,
    title: 'Database Design',
    desc: 'Structuring relational databases efficiently with proper normalization, indexing strategies, and optimized queries for real-world data models.',
    tags: ['MySQL', 'Schema Design', 'JDBC'],
  },
  {
    icon: FiSmartphone,
    title: 'Responsive Design',
    desc: 'Every project I build works flawlessly on mobile, tablet, and desktop. Mobile-first approach with fluid layouts and adaptive components.',
    tags: ['CSS Grid', 'Flexbox', 'Tailwind'],
  },
  {
    icon: FiCode,
    title: 'Code Review & Refactoring',
    desc: 'Reviewing existing codebases for quality, readability, and performance. Identifying anti-patterns and applying SOLID principles to improve maintainability.',
    tags: ['OOP', 'Clean Code', 'SOLID'],
  },
]

export default function Services() {
  return (
    <SectionWrapper id="services" className="bg-navy-950/50">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="section-label">Services</p>
          <h2 className="section-heading">
            {/* What I Can <span className="gradient-text">Do For You</span> */}
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Services I offer as a developer — whether you need a full product
            built or specific expertise applied to your existing project.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc, tags }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 group relative overflow-hidden hover:border-accent/25 transition-all duration-300"
            >
              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                <Icon size={22} className="text-accent" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-accent transition-colors duration-300">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 bg-navy-700/80 text-slate-400 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
