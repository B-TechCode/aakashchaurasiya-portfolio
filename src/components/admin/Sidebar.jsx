import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FaTachometerAlt,
  FaUser,
  FaProjectDiagram,
  FaTools,
  FaCode,
  FaBriefcase,
  FaCertificate,
  FaFileAlt,
  FaLink,
  FaSearch,
  FaEnvelope,
  FaChartBar,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  {
    icon: <FaTachometerAlt />,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <FaUser />,
    label: "Profile",
    path: "/admin/profile",
  },
  {
    icon: <FaProjectDiagram />,
    label: "Projects",
    path: "/admin/projects",
  },
  {
    icon: <FaTools />,
    label: "Skills",
    path: "/admin/skills",
  },
  {
    icon: <FaCode />,
    label: "Services",
    path: "/admin/services",
  },
  {
    icon: <FaBriefcase />,
    label: "Experience",
    path: "/admin/experience",
  },
  {
    icon: <FaCertificate />,
    label: "Certificates",
    path: "/admin/certificates",
  },
  {
    icon: <FaFileAlt />,
    label: "Resume",
    path: "/admin/resume",
  },
  {
    icon: <FaLink />,
    label: "Social Links",
    path: "/admin/social-links",
  },
  {
    icon: <FaSearch />,
    label: "SEO",
    path: "/admin/seo",
  },
  {
    icon: <FaEnvelope />,
    label: "Contacts",
    path: "/admin/contacts",
  },
  {
    icon: <FaChartBar />,
    label: "Analytics",
    path: "/admin/analytics",
  },
];

export default function Sidebar({
  mobile = false,
  onClose = () => {},
}) {
  const { logout } = useAuth();

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <aside className="w-full h-full min-h-screen bg-slate-900 border-r border-slate-700 flex flex-col">

      {/* ================= Logo / Header ================= */}

      <div className="p-6 border-b border-slate-700">

        <div className="flex items-start justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-cyan-400">
              Portfolio CMS
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Admin Panel
            </p>
          </div>

          {/* Mobile Close Button */}

          {mobile && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <FaTimes size={20} />
            </button>
          )}

        </div>

      </div>

      {/* ================= Navigation ================= */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {menuItems.map((item) => (

          <NavLink
            key={item.label}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all mb-2 ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "text-slate-300 hover:bg-cyan-600 hover:text-white"
              }`
            }
          >
            <span className="text-lg flex-shrink-0">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>
          </NavLink>

        ))}

      </nav>

      {/* ================= Logout ================= */}

      <div className="p-4 border-t border-slate-700">

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
}
