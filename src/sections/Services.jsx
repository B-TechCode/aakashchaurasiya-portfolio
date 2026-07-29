
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { fetchPublicServices } from "../services/serviceService";

import {
  FiMonitor,
  FiServer,
  FiLayout,
  FiCode,
  FiSmartphone,
  FiDatabase,
} from "react-icons/fi";

// Maps iconName stored in the database to the actual React icon component.
const ICONS = {
  FiMonitor,
  FiServer,
  FiLayout,
  FiCode,
  FiSmartphone,
  FiDatabase,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchPublicServices();

        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load public services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          </div>
        )}

        {/* Services Grid */}
        {!loading && services.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {services.map((service, index) => {
              const Icon = ICONS[service.iconName] || FiCode;

              const tags = service.tags
                ? service.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                : [];

              return (
                <motion.article
                  key={service.id}
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

                    {service.title}

                  </h3>

                  {/* Description */}
                  <p className="relative z-10 flex-grow text-sm leading-7 text-slate-400">

                    {service.description}

                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
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
                  )}

                </motion.article>
              );
            })}

          </div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <p className="text-center text-slate-500 py-10">
            No services available.
          </p>
        )}

      </div>
    </SectionWrapper>
  );
}