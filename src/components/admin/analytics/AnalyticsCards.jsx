import {
  FaFileDownload,
  FaProjectDiagram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaChartLine,
} from "react-icons/fa";

function AnalyticsCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-4">
            {value}
          </h2>

        </div>

        <div className="text-4xl text-cyan-400">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default function AnalyticsCards({ counts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      <AnalyticsCard
        title="Portfolio Visits"
        value={counts?.portfolioVisits ?? 0}
        icon={<FaChartLine />}
      />

      <AnalyticsCard
        title="Resume Downloads"
        value={counts?.resumeDownloads ?? 0}
        icon={<FaFileDownload />}
      />

      <AnalyticsCard
        title="Project Clicks"
        value={counts?.projectClicks ?? 0}
        icon={<FaProjectDiagram />}
      />

      <AnalyticsCard
        title="GitHub Clicks"
        value={counts?.githubClicks ?? 0}
        icon={<FaGithub />}
      />

      <AnalyticsCard
        title="LinkedIn Clicks"
        value={counts?.linkedinClicks ?? 0}
        icon={<FaLinkedin />}
      />

      <AnalyticsCard
        title="Contact Forms"
        value={counts?.contactFormSubmissions ?? 0}
        icon={<FaEnvelope />}
      />

    </div>
  );
}