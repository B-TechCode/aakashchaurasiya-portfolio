import { useEffect, useState } from "react";

import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiGlobe,
  FiArrowUp,
} from "react-icons/fi";

import { fetchSocialLinks } from "../services/socialLinkService";
import { recordAnalytics } from "../services/analyticsService";

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    try {
      const data = await fetchSocialLinks();
      setSocialLinks(data);
    } catch (error) {
      console.error("Failed to load social links", error);
    }
  };

  // ===============================
  // Analytics
  // ===============================

  const handleSocialClick = (platform) => {
    switch (platform) {
      case "GitHub":
        recordAnalytics("GITHUB_CLICK");
        break;

      case "LinkedIn":
        recordAnalytics("LINKEDIN_CLICK");
        break;

      default:
        break;
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    return (
    <footer className="border-t border-white/5 bg-navy-950/80">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Brand */}

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-accent rounded flex items-center justify-center font-display font-bold text-navy-900 text-xs">
              A
            </span>

            <span className="font-display text-white text-sm">
              Aakash
              <span className="text-accent">.</span>
            </span>
          </div>

          {/* Copyright */}

          <p className="font-mono text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} Aakash Prasad Chaurasiya. Built with
            React + Tailwind.
          </p>

          {/* Social Links */}

          <div className="flex items-center gap-4">
            {socialLinks.map((item) => {
              let Icon = FiGlobe;

              switch (item.platform) {
                case "GitHub":
                  Icon = FiGithub;
                  break;

                case "LinkedIn":
                  Icon = FiLinkedin;
                  break;

                case "Email":
                  Icon = FiMail;
                  break;

                default:
                  Icon = FiGlobe;
              }

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.platform}
                  onClick={() => handleSocialClick(item.platform)}
                  className="text-slate-400 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              );
            })}

            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="ml-2 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200"
            >
              <FiArrowUp size={14} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}