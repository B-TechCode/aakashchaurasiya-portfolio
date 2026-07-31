import { useEffect, useState } from "react";

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

  // Close the drawer with Escape.
  useEffect(() => {
    if (!sidebarOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [sidebarOpen]);

  // Prevent the page behind the mobile drawer from scrolling.
  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen w-full bg-slate-950">

      {/* =============================================
          DESKTOP SIDEBAR
      ============================================== */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <Sidebar />
      </aside>

      {/* =============================================
          MOBILE + TABLET SIDEBAR
      ============================================== */}

      {sidebarOpen && (
        <div className="lg:hidden">

          {/* Overlay */}

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-black/60"
          />

          {/* Drawer */}

          <aside className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw]">
            <Sidebar
              mobile
              onClose={closeSidebar}
            />
          </aside>

        </div>
      )}

      {/* =============================================
          MAIN ADMIN AREA
      ============================================== */}

      <div className="flex min-h-screen min-w-0 flex-col lg:ml-72">

        <Topbar onMenuClick={openSidebar} />

        <main className="min-w-0 flex-1 overflow-x-hidden bg-slate-900">

          <div className="mx-auto w-full min-w-0 p-4 sm:p-6 lg:p-8">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}
