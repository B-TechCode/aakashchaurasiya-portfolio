import { useEffect, useState } from "react";

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

      const response = await getDashboard();

      setDashboard(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="text-white text-xl">

          Loading Dashboard...

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">

          Dashboard

        </h1>

        <p className="text-slate-400 mt-2">

          Welcome to your Portfolio CMS.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Projects"
          value={dashboard.projects}
          icon={<FaProjectDiagram />}
          color="text-cyan-400"
        />

        <DashboardCard
          title="Skills"
          value={dashboard.skills}
          icon={<FaTools />}
          color="text-green-400"
        />

        <DashboardCard
          title="Experience"
          value={dashboard.experiences}
          icon={<FaBriefcase />}
          color="text-purple-400"
        />

        <DashboardCard
          title="Certificates"
          value={dashboard.certificates}
          icon={<FaCertificate />}
          color="text-orange-400"
        />

        <DashboardCard
          title="Messages"
          value={dashboard.messages}
          icon={<FaEnvelope />}
          color="text-pink-400"
        />

        <DashboardCard
          title="Unread"
          value={dashboard.unreadMessages}
          icon={<FaEnvelopeOpenText />}
          color="text-red-400"
        />

        <DashboardCard
          title="Resume Downloads"
          value={dashboard.resumeDownloads}
          icon={<FaDownload />}
          color="text-yellow-400"
        />

        <DashboardCard
          title="Project Views"
          value={dashboard.projectClicks}
          icon={<FaEye />}
          color="text-indigo-400"
        />

        <DashboardCard
          title="GitHub Clicks"
          value={dashboard.githubClicks}
          icon={<FaGithub />}
          color="text-slate-300"
        />

        <DashboardCard
          title="LinkedIn Clicks"
          value={dashboard.linkedinClicks}
          icon={<FaLinkedin />}
          color="text-blue-400"
        />

      </div>

    </AdminLayout>

  );

}