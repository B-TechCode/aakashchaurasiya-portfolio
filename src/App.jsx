import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { recordAnalytics } from "./services/analyticsService";
import Certificates from "./sections/Certificates";
// ====================
// Admin Pages
// ====================
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import ProjectsAdmin from "./pages/admin/Projects";
import SkillsAdmin from "./pages/admin/Skills";
import ExperienceAdmin from "./pages/admin/Experience";
import CertificatesAdmin from "./pages/admin/Certificates";
import ResumeAdmin from "./pages/admin/Resume";
import SocialLinksAdmin from "./pages/admin/SocialLinks";
import SeoAdmin from "./pages/admin/Seo";
import ContactsAdmin from "./pages/admin/Contacts";
import AnalyticsAdmin from "./pages/admin/Analytics";

// ====================
// Route Protection
// ====================
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// ====================
// Portfolio Components
// ====================
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

// ====================
// Portfolio Homepage
// ====================
function Portfolio() {

  useEffect(() => {

    recordAnalytics(
      "PORTFOLIO_VISIT",
      "portfolio",
      1
    );

  }, []);

  return (
    <div className="noise-overlay min-h-screen bg-navy-900 text-slate-300">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Resume />
        <Certificates />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

// ====================
// App Routes
// ====================
export default function App() {
  return (
    <Routes>

      {/* ================= Public Portfolio ================= */}

      <Route path="/" element={<Portfolio />} />

      {/* ================= Admin Login ================= */}

      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* ================= Dashboard ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= Profile ================= */}

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= Projects ================= */}

      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <ProjectsAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= Skills ================= */}

      <Route
        path="/admin/skills"
        element={
          <ProtectedRoute>
            <SkillsAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= Experience ================= */}

      <Route
        path="/admin/experience"
        element={
          <ProtectedRoute>
            <ExperienceAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= Certificates ================= */}

      <Route
        path="/admin/certificates"
        element={
          <ProtectedRoute>
            <CertificatesAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= Resume ================= */}

      <Route
        path="/admin/resume"
        element={
          <ProtectedRoute>
            <ResumeAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= Social Links ================= */}

      <Route
        path="/admin/social-links"
        element={
          <ProtectedRoute>
            <SocialLinksAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= SEO ================= */}

      <Route
        path="/admin/seo"
        element={
          <ProtectedRoute>
            <SeoAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= Contacts ================= */}

      <Route
        path="/admin/contacts"
        element={
          <ProtectedRoute>
            <ContactsAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= Analytics ================= */}

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsAdmin />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}