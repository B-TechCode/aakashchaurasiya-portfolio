// sections/Resume.jsx
// Resume download section with timeline of education & experience

import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { FiDownload, FiCalendar, FiMapPin } from 'react-icons/fi'

const TIMELINE = [
  {
    type: 'education',
    title: 'B.Tech in Computer Science Engineering',
    org: 'Vignan Foundation For Science, Technology & Research',
    period: '2024 – 2027',
    location: 'India',
    desc: 'Pursuing a full-time degree in Computer Science with coursework in Data Structures, Algorithms, Operating Systems, DBMS, and Software Engineering.',
    current: true,
  },
  {
    type: 'project',
    title: 'Inventory Management System',
    org: 'Personal Project',
    period: 'Jan 2024 – Mar 2024',
    location: 'Remote',
    desc: 'Designed and built a full-stack inventory management app using Java Spring Boot and MySQL with REST APIs and a responsive HTML/CSS frontend.',
    current: false,
  },
  {
    type: 'project',
    title: 'Quiz Web Application',
    org: 'Personal Project',
    period: 'Jul 2023 – Aug 2023',
    location: 'Remote',
    desc: 'Developed an interactive quiz platform with category filters, score tracking, and a real-time timer using vanilla JavaScript and CSS animations.',
    current: false,
  },
  {
    type: 'education',
    title: 'Higher Secondary Education (12th Grade)',
    org: 'National infotech',
    period: '2020 – 2022',
    location: 'Nepal',
    desc: 'Completed 12th with a focus on Mathematics, Physics, and Computer Science. Scored above 85%.',
    current: false,
  },
]

export default function Resume() {
  return (
    <SectionWrapper id="resume">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="section-label">Resume</p>
          <h2 className="section-heading">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            A snapshot of my education, projects, and growth as a developer.
          </p>
        </div>

        {/* Download CTA */}
        <div className="flex justify-center mb-14">
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-base px-8 py-4 animate-pulse-glow"
          >
            <FiDownload size={18} />
            Download Full Resume (PDF)
          </motion.a>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex gap-6 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 mt-5 rounded-full border-2 border-accent bg-navy-900 z-10">
                  {item.current && (
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
                  )}
                </div>

                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="glass-card p-5 hover:border-accent/25 transition-all duration-300">
                    {/* Badge */}
                    <span className={`inline-block font-mono text-[10px] px-2 py-0.5 rounded mb-3 ${
                      item.type === 'education'
                        ? 'bg-blue-500/15 text-blue-400'
                        : 'bg-accent/15 text-accent'
                    }`}>
                      {item.type === 'education' ? ' Education' : ' Project'}
                    </span>

                    <h3 className="font-display font-bold text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-accent text-xs font-mono mb-2">{item.org}</p>

                    <div className="flex flex-wrap gap-3 text-slate-500 text-xs font-mono mb-3">
                      <span className="flex items-center gap-1"><FiCalendar size={10} /> {item.period}</span>
                      <span className="flex items-center gap-1"><FiMapPin size={10} /> {item.location}</span>
                      {item.current && (
                        <span className="text-accent flex items-center gap-1">● Current</span>
                      )}
                    </div>

                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
