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
} from "react-icons/fa";

    const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <FaUser />, label: "Profile", path: "/admin/profile" },

   { icon: <FaProjectDiagram />, label: "Projects", path: "/admin/projects" },
{ icon: <FaTools />, label: "Skills", path: "/admin/skills" },
{ icon: <FaCode />, label: "Services", path: "/admin/services" },
{ icon: <FaBriefcase />, label: "Experience", path: "/admin/experience" },

    { icon: <FaCertificate />, label: "Certificates", path: "/admin/certificates" },
    { icon: <FaFileAlt />, label: "Resume", path: "/admin/resume" },
    { icon: <FaLink />, label: "Social Links", path: "/admin/social-links" },
    { icon: <FaSearch />, label: "SEO", path: "/admin/seo" },
    { icon: <FaEnvelope />, label: "Contacts", path: "/admin/contacts" },
    { icon: <FaChartBar />, label: "Analytics", path: "/admin/analytics" },
    ];

    export default function Sidebar() {
        const { logout } = useAuth();
    return (
        <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-700 flex flex-col">

        <div className="p-6 border-b border-slate-700">

            <h1 className="text-2xl font-bold text-cyan-400">
            Portfolio CMS
            </h1>

            <p className="text-slate-400 text-sm mt-1">
            Admin Panel
            </p>

        </div>

        <nav className="flex-1 px-4 py-6">

            {menuItems.map((item) => (



            <NavLink
    key={item.label}
    to={item.path}
    className={({ isActive }) =>
        `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all mb-2 ${
        isActive
            ? "bg-cyan-600 text-white"
            : "text-slate-300 hover:bg-cyan-600 hover:text-white"
        }`
        }
    >
        <span className="text-lg">{item.icon}</span>
        <span>{item.label}</span>
        </NavLink>




            ))}

        </nav>

        <div className="p-4 border-t border-slate-700">

        <button
    onClick={logout}
    className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all"
    >


            <FaSignOutAlt />

            Logout

            </button>

        </div>

        </aside>
    );
    }