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
    <div className="min-w-0 rounded-2xl border border-slate-700 bg-slate-800 p-4 transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 sm:p-5 lg:p-6">

      <div className="flex min-w-0 items-center justify-between gap-4">

        {/* Content */}

        <div className="min-w-0">
          <p className="break-words text-xs font-medium text-slate-400 sm:text-sm">
            {title}
          </p>

          <h2 className="mt-2 break-words text-2xl font-bold text-cyan-400 sm:mt-3 sm:text-3xl lg:mt-4 lg:text-4xl">
            {value ?? 0}
          </h2>
        </div>

        {/* Icon */}

        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-xl text-cyan-400 sm:h-12 sm:w-12 sm:text-2xl lg:h-14 lg:w-14 lg:text-3xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default function AnalyticsCards({ counts }) {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">

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
