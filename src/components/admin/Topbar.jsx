import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="h-20 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-slate-400 text-sm">
          Welcome back, Aakash 
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative text-slate-300 hover:text-cyan-400 transition">
          <FaBell size={22} />
          <span className="absolute -top-2 -right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle
            size={42}
            className="text-cyan-400"
          />

          <div>
            <h4 className="text-white font-semibold">
              Aakash
            </h4>

            <p className="text-slate-400 text-sm">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}