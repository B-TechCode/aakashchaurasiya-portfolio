import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import {
  FiMonitor,
  FiServer,
  FiLayout,
  FiCode,
  FiSmartphone,
  FiDatabase,
} from "react-icons/fi";

const SERVICES = [
  {
    icon: FiLayout,
    title: "Frontend Development",
    desc:
      "Building pixel-perfect, responsive UIs with React and Tailwind CSS. Focus on performance, accessibility, and delightful user experience.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: FiServer,
    title: "Backend Development",
    desc:
      "Designing robust REST APIs and server-side logic using Java and Spring Boot with clean architecture, secure endpoints, and scalable solutions.",
    tags: ["Java", "Spring Boot", "REST APIs"],
  },
  {
    icon: FiMonitor,
    title: "Full Stack Development",
    desc:
      "Developing complete web applications from database design to deployment with authentication, CRUD operations, and modern architecture.",
    tags: ["React", "Spring Boot", "MySQL"],
  },
  {
    icon: FiDatabase,
    title: "Database Design",
    desc:
      "Designing optimized relational databases with normalization, indexing, efficient queries, and scalable data models.",
    tags: ["MySQL", "JPA", "SQL"],
  },
  {
    icon: FiSmartphone,
    title: "Responsive Design",
    desc:
      "Creating mobile-first websites that provide a seamless experience across desktops, tablets, and smartphones.",
    tags: ["Tailwind", "Flexbox", "CSS Grid"],
  },
  {
    icon: FiCode,
    title: "Code Review & Refactoring",
    desc:
      "Improving code quality through clean architecture, SOLID principles, performance optimization, and maintainable coding practices.",
    tags: ["Clean Code", "SOLID", "Refactoring"],
  },
];

export default function Services() {
return (
  <SectionWrapper id="services" className="bg-navy-950/50">
    <div className="section-container">

      {/* Heading */}
      <div className="text-center mb-14">

        <p className="section-label">
          Services
        </p>

        <h2 className="section-heading">
          What I Can <span className="gradient-text">Build For You</span>
        </h2>

        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
          I develop modern, scalable, and high-performance web applications
          using industry-standard technologies and clean architecture.
        </p>

      </div>

      {/* Services Grid */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {SERVICES.map(({ icon: Icon, title, desc, tags }, index) => (

          <motion.article
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
            }}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 focus-within:border-accent/40"
          >

            {/* Hover Glow */}

            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Corner Decoration */}

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icon */}

            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20">

              <Icon
                size={26}
                className="text-accent"
                aria-hidden="true"
              />

            </div>

            {/* Title */}

            <h3 className="relative z-10 mb-3 font-display text-lg font-bold text-white transition-colors duration-300 group-hover:text-accent">

              {title}

            </h3>

            {/* Description */}

            <p className="relative z-10 flex-grow text-sm leading-7 text-slate-400">

              {desc}

            </p>

            {/* Tags */}

            <div className="relative z-10 mt-6 flex flex-wrap gap-2">

              {tags.map((tag) => (

                <span
                  key={tag}
                  className="rounded-full border border-slate-700/70 bg-navy-800/60 px-3 py-1 text-[11px] font-mono text-slate-300 transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent"
                >
                  {tag}
                </span>

              ))}

            </div>

          </motion.article>

        ))}

      </div>

    </div>

  </SectionWrapper>
);
}