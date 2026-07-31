import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";

import { getDashboard } from "../../api/dashboardApi";

import {
  FaProjectDiagram,
  FaTools,
  FaDownload,
  FaEnvelope,
  FaBriefcase,
  FaCertificate,
  FaGithub,
  FaLinkedin,
  FaEye,
  FaEnvelopeOpenText,
} from "react-icons/fa";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      setDashboard(response.data?.data || {});
    } catch (error) {
      console.error("Failed to load dashboard:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="w-full min-w-0">
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center sm:p-8">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Loading Dashboard...
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Please wait...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto w-full min-w-0 max-w-7xl">

        {/* Header */}

        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
            Welcome to your Portfolio CMS.
          </p>
        </div>

        {/* Dashboard Cards */}

        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">

          <DashboardCard
            title="Projects"
            value={dashboard?.projects ?? 0}
            icon={<FaProjectDiagram />}
            color="text-cyan-400"
          />

          <DashboardCard
            title="Skills"
            value={dashboard?.skills ?? 0}
            icon={<FaTools />}
            color="text-green-400"
          />

          <DashboardCard
            title="Experience"
            value={dashboard?.experiences ?? 0}
            icon={<FaBriefcase />}
            color="text-purple-400"
          />

          <DashboardCard
            title="Certificates"
            value={dashboard?.certificates ?? 0}
            icon={<FaCertificate />}
            color="text-orange-400"
          />

          <DashboardCard
            title="Messages"
            value={dashboard?.messages ?? 0}
            icon={<FaEnvelope />}
            color="text-pink-400"
          />

          <DashboardCard
            title="Unread"
            value={dashboard?.unreadMessages ?? 0}
            icon={<FaEnvelopeOpenText />}
            color="text-red-400"
          />

          <DashboardCard
            title="Resume Downloads"
            value={dashboard?.resumeDownloads ?? 0}
            icon={<FaDownload />}
            color="text-yellow-400"
          />

          <DashboardCard
            title="Project Views"
            value={dashboard?.projectClicks ?? 0}
            icon={<FaEye />}
            color="text-indigo-400"
          />

          <DashboardCard
            title="GitHub Clicks"
            value={dashboard?.githubClicks ?? 0}
            icon={<FaGithub />}
            color="text-slate-300"
          />

          <DashboardCard
            title="LinkedIn Clicks"
            value={dashboard?.linkedinClicks ?? 0}
            icon={<FaLinkedin />}
            color="text-blue-400"
          />

        </div>

      </div>
    </AdminLayout>
  );
}
