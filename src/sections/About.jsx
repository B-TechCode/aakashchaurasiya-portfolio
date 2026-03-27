// sections/About.jsx
// Personal introduction with highlights and fun facts

import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { FiCode, FiCpu, FiZap, FiBook } from 'react-icons/fi'

const HIGHLIGHTS = [
  {
    icon: FiCode,
    title: 'Full Stack Focus',
    desc: 'Building end-to-end web apps with Java backends and React frontends.',
  },
  {
    icon: FiCpu,
    title: 'CSE Student',
    desc: '3rd year B.Tech Computer Science at a top institute in India.',
  },
  {
    icon: FiZap,
    title: 'Fast Learner',
    desc: 'Picked up React, Spring Boot, and RESTful APIs within months of focused practice.',
  },
  {
    icon: FiBook,
    title: 'Always Learning',
    desc: 'Constantly upgrading skills through projects, courses, and open-source contribution.',
  },
]

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <p className="section-label">About Me</p>
            <h5 className="section-heading mb-4">
              {/* Passionate about code,<br /> */}
              {/* <span className="gradient-text">curious about everything.</span> */}
            </h5>

            <div className="space-y-4 text-slate-400 leading-relaxed text-[15px]">
              <p>
                I'm <span className="text-white font-medium">Aakash Prasad Chaurasiya</span>, a 3rd-year B.Tech Computer Science
                Engineering student based in India. I'm deeply passionate about software development
                and building products that solve real-world problems.
              </p>
              <p>
                My journey started with core Java and gradually expanded into the world of
                <span className="text-accent font-medium"> full-stack development</span> — where I now
                work with React for the frontend and Java/Springboot for the backend, designing systems
                that are both performant and maintainable.
              </p>
              {/* <p>
                I'm actively seeking <span className="text-white font-medium">internship and entry-level opportunities</span> where
                I can contribute meaningfully, grow rapidly, and work alongside experienced engineers
                who care about craft and quality.
              </p> */}
              <p>
                When I'm not coding, I'm reading about system design, contributing to
                open-source, or experimenting with new technologies that catch my eye.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['Open to Work', 'India-Based', 'Remote Friendly', 'Internship Ready'].map((tag) => (
                <span key={tag} className="font-mono text-xs px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Highlights grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-5 group hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="font-display font-semibold text-white text-sm mb-1.5">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
