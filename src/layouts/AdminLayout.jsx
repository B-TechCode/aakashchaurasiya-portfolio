import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 p-8 bg-slate-900">
          {children}
        </main>

      </div>

    </div>
  );
}