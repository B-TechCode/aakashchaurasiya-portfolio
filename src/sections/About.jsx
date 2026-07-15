// sections/About.jsx
// About Section (CMS Driven)

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import SectionWrapper from "../components/SectionWrapper";

import {
  FiCode,
  FiCpu,
  FiZap,
  FiBook,
} from "react-icons/fi";

import { fetchPublicProfile } from "../services/profileService";

// =======================================
// Highlight Cards
// =======================================

const HIGHLIGHTS = [
  {
    icon: FiCode,
    title: "Full Stack Focus",
    desc: "Building end-to-end web applications using React, Spring Boot, and MySQL.",
  },
  {
    icon: FiCpu,
    title: "Software Engineering",
    desc: "Passionate about scalable backend systems, APIs, and clean architecture.",
  },
  {
    icon: FiZap,
    title: "Fast Learner",
    desc: "Continuously learning new technologies through real-world projects.",
  },
  {
    icon: FiBook,
    title: "Problem Solver",
    desc: "Enjoy solving challenging programming problems and building impactful products.",
  },
];

export default function About() {

  // =======================================
  // State
  // =======================================

  const [profile, setProfile] = useState(null);

  // =======================================
  // Load Profile
  // =======================================

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const data = await fetchPublicProfile();

      setProfile(data);

    } catch (error) {

      console.error("Failed to load profile", error);

    }

  };

  // =======================================
  // Loading
  // =======================================

  if (!profile) {

    return (
      <SectionWrapper id="about">
        <div className="section-container py-20 text-center">
          <p className="text-slate-400">Loading...</p>
        </div>
      </SectionWrapper>
    );

  }

  return (

    <SectionWrapper id="about">

      <div className="section-container">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ================================= */}
          {/* Left Content */}
          {/* ================================= */}

          <div>

            <p className="section-label">
              About Me
            </p>

            <div className="space-y-5 text-slate-400 leading-relaxed text-[15px] mt-6">

              <p>

                I'm{" "}

                <span className="text-white font-medium">

                  {profile.fullName}

                </span>

                , {profile.aboutMe}

              </p>

              <p>

                My primary focus is{" "}

                <span className="text-accent font-medium">

                  {profile.headline}

                </span>

                . I enjoy building modern applications with clean architecture,
                scalable backend systems, and responsive user experiences.

              </p>

              <p>

                I continuously improve my skills by building real-world projects,
                exploring new technologies, learning system design,
                and solving programming challenges.

              </p>

            </div>

            {/* ================================= */}
            {/* Tags */}
            {/* ================================= */}

            <div className="flex flex-wrap gap-2 mt-8">

              {[
                profile.location || "India",
                profile.headline,
                "Open To Work",
                "Available",
              ].map((tag) => (

                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-full"
                >

                  {tag}

                </span>

              ))}

            </div>

          </div>

          {/* ================================= */}
          {/* Right Cards */}
          {/* ================================= */}

          <div className="grid sm:grid-cols-2 gap-4">

            {HIGHLIGHTS.map(
              ({ icon: Icon, title, desc }, index) => (

                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                  }}
                  className="glass-card p-5 group hover:border-accent/30 transition-all duration-300"
                >

                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">

                    <Icon
                      size={20}
                      className="text-accent"
                    />

                  </div>

                  <h3 className="font-display font-semibold text-white text-sm mb-2">

                    {title}

                  </h3>

                  <p className="text-slate-500 text-xs leading-relaxed">

                    {desc}

                  </p>

                </motion.div>

              )

            )}

          </div>

        </div>

      </div>

    </SectionWrapper>

  );

}