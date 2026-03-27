// components/Navbar.jsx
// Responsive navigation with smooth scroll and mobile hamburger menu

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Resume',   href: '#resume'   },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [activeLink, setActiveLink] = useState('')

  // Add shadow when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink('#' + entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = (href) => {
    setIsOpen(false)
    setActiveLink(href)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.5)] border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-8 h-8 bg-accent rounded-md flex items-center justify-center font-display font-bold text-navy-900 text-sm group-hover:shadow-[0_0_16px_rgba(34,197,94,0.5)] transition-all duration-300">
              A
            </span>
            <span className="font-display font-semibold text-white hidden sm:block">
              Aakash<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`nav-link ${activeLink === link.href ? 'text-accent after:w-full' : ''}`}
              >
                {/* <span className="text-accent/60 mr-1">0{i + 1}.</span> */}
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex btn-ghost text-sm py-2 px-4"
            >
              Hire Me
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-300 hover:text-accent transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-navy-900/98 backdrop-blur-md border-b border-white/5"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center gap-3 py-3 px-2 text-slate-300 hover:text-accent font-mono text-sm border-b border-white/5 last:border-0 transition-colors"
                >
                  {/* <span className="text-accent/50 text-xs">0{i + 1}.</span> */}
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary mt-3 justify-center text-sm">
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
