// components/Navbar.jsx
// Responsive navigation with accessibility, smooth scroll and mobile menu

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // ===============================
  // Navbar shadow
  // ===============================

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ===============================
  // Close mobile menu on resize
  // ===============================

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ===============================
  // Close menu with Escape key
  // ===============================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ===============================
  // Close menu when clicking outside
  // ===============================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // ===============================
  // Active section observer
  // ===============================

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-120px 0px -45% 0px",
        threshold: 0.25,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // ===============================
  // Smooth Scroll
  // ===============================

  const scrollToSection = (href) => {
    const element = document.querySelector(href);

    if (!element) return;

    const navbarHeight = 80;

    const position =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const handleLinkClick = (event, href) => {
    event.preventDefault();

    setActiveLink(href);
    setIsOpen(false);

    scrollToSection(href);
  };

    return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.5)] border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}

          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
          >
            <span className="w-8 h-8 bg-accent rounded-md flex items-center justify-center font-display font-bold text-navy-900 text-sm group-hover:shadow-[0_0_16px_rgba(34,197,94,0.5)] transition-all duration-300">
              A
            </span>

            <span className="font-display font-semibold text-white hidden sm:block">
              Aakash
              <span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}

          <div
            className="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label="Primary Navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={
                  activeLink === link.href ? "page" : undefined
                }
                className={`nav-link focus:outline-none focus-visible:text-accent focus-visible:after:w-full ${
                  activeLink === link.href
                    ? "text-accent after:w-full"
                    : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="hidden md:inline-flex btn-ghost text-sm py-2 px-4"
            >
              Hire Me
            </a>

            {/* Mobile Menu Button */}

            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden text-slate-300 hover:text-accent transition-colors p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? (
                <HiX size={24} />
              ) : (
                <HiMenuAlt3 size={24} />
              )}
            </button>

          </div>

        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-navy-900/98 backdrop-blur-md border-b border-white/5"
          >
            <div className="section-container py-4 flex flex-col gap-1">

                          {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={
                    activeLink === link.href ? "page" : undefined
                  }
                  className={`flex items-center gap-3 py-3 px-2 rounded-md font-mono text-sm border-b border-white/5 last:border-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    activeLink === link.href
                      ? "text-accent bg-white/5"
                      : "text-slate-300 hover:text-accent"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="btn-primary mt-3 justify-center text-sm"
              >
                Hire Me
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

