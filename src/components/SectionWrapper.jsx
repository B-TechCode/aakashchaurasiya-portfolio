// components/SectionWrapper.jsx
// Reusable wrapper that adds consistent padding and fade-in animation to every section

import { motion } from 'framer-motion'

/**
 * SectionWrapper
 * @param {string} id - section id for anchor links
 * @param {string} className - extra classes
 */
export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}
