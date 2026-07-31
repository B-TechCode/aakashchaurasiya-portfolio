import { useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950">

      {/* ================= Desktop Sidebar ================= */}

      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 z-40">
        <Sidebar />
      </div>

      {/* ================= Mobile Sidebar ================= */}

      {sidebarOpen && (
        <>
          {/* Dark Overlay */}

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />

          {/* Sidebar Drawer */}

          <div className="fixed left-0 top-0 bottom-0 z-50 w-72 max-w-[85vw] lg:hidden">
            <Sidebar
              mobile
              onClose={closeSidebar}
            />
          </div>
        </>
      )}

      {/* ================= Main Area ================= */}

      <div className="min-h-screen flex flex-col lg:ml-72">

        <Topbar onMenuClick={openSidebar} />

        <main className="flex-1 min-w-0 overflow-x-hidden bg-slate-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
