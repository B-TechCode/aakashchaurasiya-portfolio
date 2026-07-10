export default function DashboardCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="
        bg-slate-800
        rounded-2xl
        p-6
        shadow-lg
        border
        border-slate-700
        hover:border-cyan-500
        transition-all
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`text-5xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}