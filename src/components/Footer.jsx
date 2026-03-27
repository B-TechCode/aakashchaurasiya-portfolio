// components/Footer.jsx
// Clean minimal footer with social links and copyright

import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/B-TechCode', label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/aakashprasadchaurasiya', label: 'LinkedIn' },
  { icon: FiMail,     href: 'mailto:aakashchaurasiya630@gmail.com',     label: 'Email'    },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-white/5 bg-navy-950/80">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-accent rounded flex items-center justify-center font-display font-bold text-navy-900 text-xs">A</span>
            <span className="font-display text-white text-sm">Aakash<span className="text-accent">.</span></span>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-slate-500">
            © {new Date().getFullYear()} Aakash Prasad Chaurasiya. Built with React + Tailwind.
          </p>

          {/* Socials + Back to top */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-400 hover:text-accent transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="ml-2 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:border-accent hover:text-accent transition-all duration-200"
            >
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
