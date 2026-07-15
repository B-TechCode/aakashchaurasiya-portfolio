import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

import {
  FaJava,
  FaReact,
  FaGitAlt,
  FaDatabase,
  FaCode,
} from "react-icons/fa";

import {
  SiJavascript,
  SiSpringboot,
  SiMysql,
  SiPostman,
  SiPython,
} from "react-icons/si";

import { fetchPublicSkills } from "../services/skillService";

const ICONS = {
  FaJava,
  FaReact,
  FaGitAlt,
  FaDatabase,
  SiJavascript,
  SiSpringboot,
  SiMysql,
  SiPostman,
  SiPython,
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await fetchPublicSkills();
      setSkills(data);
    } catch (error) {
      console.error("Failed to load skills", error);
    }
  };

  const categories = [
    "All",
    ...new Set(skills.map((skill) => skill.category).filter(Boolean)),
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter(
          (skill) => skill.category === activeCategory
        );

  return (
    <SectionWrapper
      id="skills"
      className="bg-navy-950/50"
    >
      <div className="section-container">

        {/* Heading */}

        <div className="text-center mb-12">

          <p className="section-label">
            Skills
          </p>

          <h2 className="section-heading">
            My{" "}
            <span className="gradient-text">
              Tech Stack
            </span>
          </h2>

          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Technologies I've worked with and am
            actively learning.
          </p>

        </div>

        {/* Category Buttons */}

        <div className="flex flex-wrap justify-center gap-2 mb-10">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setActiveCategory(category)
              }
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === category
                  ? "bg-accent text-navy-900 border-accent font-semibold"
                  : "border-white/10 text-slate-400 hover:border-accent/40 hover:text-accent"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {/* Skills Grid */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {filteredSkills.map((skill, index) => {

            const Icon =
              ICONS[skill.iconName] || FaCode;

            return (

              <motion.div
                key={skill.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.35,
                }}
                className="glass-card p-5 flex items-center gap-4 group hover:border-white/15 transition-all"
              >

                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">

                  <Icon
                    size={24}
                    className="text-accent"
                  />

                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex justify-between items-center mb-2">

                    <span className="font-display font-semibold text-sm text-white">
                      {skill.name}
                    </span>

                    <span className="font-mono text-xs text-slate-500">
                      {skill.proficiency}%
                    </span>

                  </div>

                  <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: `${skill.proficiency}%`,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.05 + 0.3,
                      }}
                      className="h-full rounded-full bg-accent"
                    />

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

        <p className="text-center text-slate-600 font-mono text-xs mt-8">
          * Skills are loaded dynamically from
          the Portfolio CMS.
        </p>

      </div>
    </SectionWrapper>
  );
}