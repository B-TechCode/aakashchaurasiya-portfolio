import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import { recordAnalytics } from "./services/analyticsService";

import Seo from "./components/Seo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
const Projects = lazy(() => import("./sections/Projects"));
const Services = lazy(() => import("./sections/Services"));
const Resume = lazy(() => import("./sections/Resume"));
const Certificates = lazy(() => import("./sections/Certificates"));
const Contact = lazy(() => import("./sections/Contact"));

// ====================
// Admin Pages
// ====================

const Login = lazy(() => import("./pages/auth/Login"));
const VerifyOtp = lazy(() => import("./pages/auth/VerifyOtp"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Profile = lazy(() => import("./pages/admin/Profile"));
const ProjectsAdmin = lazy(() => import("./pages/admin/Projects"));
const SkillsAdmin = lazy(() => import("./pages/admin/Skills"));
const ExperienceAdmin = lazy(() => import("./pages/admin/Experience"));
const CertificatesAdmin = lazy(() => import("./pages/admin/Certificates"));
const ResumeAdmin = lazy(() => import("./pages/admin/Resume"));
const SocialLinksAdmin = lazy(() => import("./pages/admin/SocialLinks"));
const SeoAdmin = lazy(() => import("./pages/admin/Seo"));
const ContactsAdmin = lazy(() => import("./pages/admin/Contacts"));
const AnalyticsAdmin = lazy(() => import("./pages/admin/Analytics"));

const NotFound = lazy(() => import("./pages/NotFound"));

// ====================
// Route Protection
// ====================

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";


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
    <>
      <Seo />

      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-accent text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Skip to main content
      </a>

      <div className="noise-overlay min-h-screen bg-navy-900 text-slate-300">
        <Navbar />

        <main id="main-content">
  <Hero />
  <About />
  <Skills />

  <Suspense fallback={null}>
    <Projects />
    <Services />
    <Resume />
    <Certificates />
    <Contact />
  </Suspense>
</main>

        <Footer />
      </div>
    </>
  );
}

// ====================
// App Routes
// ====================

export default function App() {
  return (
  <Suspense
    fallback={
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-5" />

          <p className="text-slate-400 font-mono">
            Loading...
          </p>

        </div>
      </div>
    }
  >
    <Routes>

      {/* ================= Public Portfolio ================= */}

      <Route
        path="/"
        element={<Portfolio />}
      />

      {/* ================= Admin Login ================= */}

      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* ================= Verify OTP ================= */}

      <Route
        path="/verify-otp"
        element={
          <PublicRoute>
            <VerifyOtp />
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





      {/* ================= 404 ================= */}

<Route
  path="*"
  element={<NotFound />}
/>


</Routes>
</Suspense>
);

   
}

