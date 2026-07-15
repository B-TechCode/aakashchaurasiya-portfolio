// sections/Hero.jsx
// Dynamic Hero Section (CMS Driven)

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  FiDownload,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

import { fetchPublicProfile } from "../services/profileService";
import { fetchSocialLinks } from "../services/socialLinkService";
import { fetchLatestResume } from "../services/resumeService";

// ===============================
// Animation Variants
// ===============================

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ===============================
// Hero Component
// ===============================

export default function Hero() {

  // ===============================
  // State
  // ===============================

  const [profile, setProfile] = useState(null);

  const [socialLinks, setSocialLinks] = useState([]);

  const [resume, setResume] = useState(null);

  // ===============================
  // Load CMS Data
  // ===============================

  useEffect(() => {

    loadProfile();

    loadSocialLinks();

    loadResume();

  }, []);

  // ===============================
  // Profile
  // ===============================

  const loadProfile = async () => {

    try {

      const data = await fetchPublicProfile();

      setProfile(data);

    } catch (error) {

      console.error("Failed to load profile", error);

    }

  };

  // ===============================
  // Social Links
  // ===============================

  const loadSocialLinks = async () => {

    try {

      const data = await fetchSocialLinks();

      setSocialLinks(data);

    } catch (error) {

      console.error("Failed to load social links", error);

    }

  };

  // ===============================
  // Resume
  // ===============================

  const loadResume = async () => {

    try {

      const data = await fetchLatestResume();

      setResume(data);

    } catch (error) {

      console.error("Failed to load resume", error);

    }

  };

  // ===============================
  // Helpers
  // ===============================

  const github = socialLinks.find(
    (item) => item.platform === "GitHub"
  );

  const linkedin = socialLinks.find(
    (item) => item.platform === "LinkedIn"
  );

  const names = profile?.fullName?.split(" ") || [];

  // ===============================
  // Loading Screen
  // ===============================

  if (!profile) {

    return (

      <section className="min-h-screen flex items-center justify-center">

        <p className="text-slate-400 text-lg">
          Loading...
        </p>

      </section>

    );

  }

  return (

    <section
  id="hero"
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
>
  {/* Ambient Glow */}

  <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

  <div className="section-container relative z-10 pt-24 pb-16">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* ========================================= */}
      {/* Left Content */}
      {/* ========================================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >

        {/* Badge */}

        <motion.div variants={itemVariants}>

          <span className="inline-flex items-center gap-2 font-mono text-sm text-accent bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">

            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />

            Available for Opportunities

          </span>

        </motion.div>

        {/* Name */}

        <motion.h1
          variants={itemVariants}
          className="font-display font-bold"
        >

          <span className="block text-slate-400 text-lg md:text-xl mb-2 font-body font-normal">

            Hi, I'm

          </span>

          <span className="block text-white text-4xl md:text-6xl lg:text-5xl leading-tight">

            {names[0]} {names[1]}

          </span>

          <span className="block gradient-text glow-accent text-4xl md:text-6xl lg:text-5xl leading-tight">

            {names.slice(2).join(" ")}

          </span>

        </motion.h1>

        {/* Headline */}

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 min-h-[40px]"
        >

          <span className="font-mono text-lg md:text-xl text-slate-300">

            {profile.headline}

          </span>

          <span className="typewriter-cursor" />

        </motion.div>

        {/* About */}

        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl"
        >

          {profile.aboutMe}

        </motion.p>

        {/* Buttons */}

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 pt-2"
        >

          <a
            href="#projects"
            className="btn-primary group"
          >

            View Projects

            <FiArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />

          </a>

          <a
            href={resume?.fileUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost group"
          >

            <FiDownload
              size={16}
              className="group-hover:-translate-y-0.5 transition-transform"
            />

            Download Resume

          </a>

        </motion.div>

        {/* Social Links */}

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-5 pt-2"
        >

          <span className="font-mono text-xs text-slate-500">

            Find me on

          </span>

          {github && (

            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-mono"
            >

              <FiGithub size={16} />

              GitHub

            </a>

          )}

          {linkedin && (

            <a
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-mono"
            >

              <FiLinkedin size={16} />

              LinkedIn

            </a>

          )}

        </motion.div>

      </motion.div>

            {/* ========================================= */}
      {/* Right Side - Profile Image */}
      {/* ========================================= */}

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex justify-end"
      >

        <div className="relative translate-x-20">

          {/* Glow */}

          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl scale-110"></div>

          {/* Profile Image */}

          <img
            src={
              profile?.profileImageUrl ||
              "/default-profile.png"
            }
            alt={profile.fullName}
            className="
              relative
              w-96
              h-96
              rounded-full
              object-cover
              border-4
              border-emerald-500/30
              shadow-[0_0_60px_rgba(34,197,94,0.35)]
            "
          />

        </div>

      </motion.div>

    </div>

    {/* ========================================= */}
    {/* Stats */}
    {/* ========================================= */}

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/5"
    >

      <div>

        <p className="font-display font-bold text-2xl md:text-3xl text-accent">

          {profile.projectsCompleted || "10+"}

        </p>

        <p className="text-slate-500 text-sm font-mono mt-0.5">

          Projects Built

        </p>

      </div>

      <div>

        <p className="font-display font-bold text-2xl md:text-3xl text-accent">

          {profile.experienceYears || "2+"}

        </p>

        <p className="text-slate-500 text-sm font-mono mt-0.5">

          Years Coding

        </p>

      </div>

      <div>

        <p className="font-display font-bold text-2xl md:text-3xl text-accent">

          {profile.country || "India"}

        </p>

        <p className="text-slate-500 text-sm font-mono mt-0.5">

          Based In

        </p>

      </div>

      <div>

        <p className="font-display font-bold text-2xl md:text-3xl text-accent">

          ∞

        </p>

        <p className="text-slate-500 text-sm font-mono mt-0.5">

          Passion to Learn

        </p>

      </div>

    </motion.div>

  </div>

  {/* ========================================= */}
  {/* Scroll Indicator */}
  {/* ========================================= */}

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 0.5 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
  >

    <span className="font-mono text-xs text-slate-600">

      scroll

    </span>

    <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" />

  </motion.div>

</section>

);
}