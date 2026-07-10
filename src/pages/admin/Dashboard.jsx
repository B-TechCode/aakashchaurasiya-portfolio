import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";

import {
  FaProjectDiagram,
  FaTools,
  FaDownload,
  FaEnvelope,
} from "react-icons/fa";

export default function Dashboard() {

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
          value="0"
          icon={<FaProjectDiagram />}
          color="text-cyan-400"
        />

        <DashboardCard
          title="Skills"
          value="0"
          icon={<FaTools />}
          color="text-green-400"
        />

        <DashboardCard
          title="Resume Downloads"
          value="0"
          icon={<FaDownload />}
          color="text-yellow-400"
        />

        <DashboardCard
          title="Messages"
          value="0"
          icon={<FaEnvelope />}
          color="text-pink-400"
        />

      </div>

      <div className="mt-10">

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold text-white">
            Recent Activity
          </h2>

          <p className="text-slate-400 mt-4">
            Recent activities will appear here after backend integration.
          </p>

        </div>

      </div>

    </AdminLayout>

  );

}