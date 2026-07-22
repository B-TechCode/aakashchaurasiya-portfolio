import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { FiDownload, FiCalendar, FiMapPin } from "react-icons/fi";

import { fetchPublicExperiences } from "../services/experienceService";
import { fetchLatestResume } from "../services/resumeService";
import { recordAnalytics } from "../services/analyticsService";

export default function Resume() {
  const [experiences, setExperiences] = useState([]);
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ===============================
  // Load Data
  // ===============================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(false);

      const [experienceData, resumeData] = await Promise.all([
        fetchPublicExperiences(),
        fetchLatestResume(),
      ]);

      setExperiences(experienceData);
      setResume(resumeData);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Analytics
  // ===============================

  const handleResumeDownload = () => {
    if (!resume) return;

    recordAnalytics("RESUME_DOWNLOAD");
  };

  // ===============================
  // Helpers
  // ===============================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // ===============================
  // Loading UI
  // ===============================

  if (loading) {
    return (
      <SectionWrapper id="resume">
        <div className="section-container flex items-center justify-center py-32">

          <div className="text-center">

            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-5" />

            <p className="font-mono text-slate-400">
              Loading Resume...
            </p>

          </div>

        </div>
      </SectionWrapper>
    );
  }

  // ===============================
  // Error UI
  // ===============================

  if (error) {
    return (
      <SectionWrapper id="resume">
        <div className="section-container flex items-center justify-center py-32">

          <div className="text-center">

            <h2 className="text-2xl font-bold text-white mb-3">
              Failed to load resume
            </h2>

            <p className="text-slate-400 mb-6">
              Please try again.
            </p>

            <button
              onClick={loadData}
              className="btn-primary"
            >
              Retry
            </button>

          </div>

        </div>
      </SectionWrapper>
    );
  }

    return (
    <SectionWrapper id="resume">
      <div className="section-container">

        {/* =============================== */}
        {/* Section Header */}
        {/* =============================== */}

        <div className="text-center mb-14">

          <p className="section-label">
            Resume
          </p>

          <h2 className="section-heading">
            My <span className="gradient-text">Journey</span>
          </h2>

          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            A snapshot of my education and professional experience.
          </p>

        </div>

        {/* =============================== */}
        {/* Download Resume */}
        {/* =============================== */}

        <div className="flex justify-center mb-14">

          <motion.a
            href={`${import.meta.env.VITE_API_BASE_URL}/public/resume/download`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeDownload}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`btn-primary text-base px-8 py-4 animate-pulse-glow ${
              !resume
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >

            <FiDownload size={18} />

            Download Full Resume (PDF)

          </motion.a>

        </div>

        {/* =============================== */}
        {/* Timeline */}
        {/* =============================== */}

        <div className="relative max-w-3xl mx-auto">

          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

          <div className="space-y-8">

            {experiences.map((item, index) => (

              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -30 : 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={`relative flex gap-6 md:gap-0 ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >

                <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 mt-5 rounded-full border-2 border-accent bg-navy-900 z-10">

                  {item.currentlyWorking && (

                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />

                  )}

                </div>

                <div
                  className={`ml-12 md:ml-0 md:w-[45%] ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >

                  <div className="glass-card p-5 hover:border-accent/25 transition-all duration-300">

                                      <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded mb-3 bg-accent/15 text-accent">
                      Experience
                    </span>

                    <h3 className="font-display font-bold text-white text-sm mb-1">
                      {item.title}
                    </h3>

                    <p className="text-accent text-xs font-mono mb-2">
                      {item.organization}
                    </p>

                    <div className="flex flex-wrap gap-3 text-slate-500 text-xs font-mono mb-3">

                      <span className="flex items-center gap-1">
                        <FiCalendar size={10} />

                        {formatDate(item.startDate)} -{" "}

                        {item.currentlyWorking
                          ? "Present"
                          : formatDate(item.endDate)}
                      </span>

                      <span className="flex items-center gap-1">
                        <FiMapPin size={10} />
                        {item.location}
                      </span>

                    </div>

                    <p className="text-slate-500 text-xs leading-relaxed">
                      {item.description}
                    </p>

                  </div>

                </div>

              </motion.div>

            ))}

            {experiences.length === 0 && (
              <div className="text-center py-10">

                <p className="text-slate-500 font-mono">
                  No experience has been added yet.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

    </SectionWrapper>
  );
}