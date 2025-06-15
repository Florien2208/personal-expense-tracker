"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex flex-col">
      {/* Navbar */}
      <div className="flex-none">
        <Navbar onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content - This will render the current page */}
        <div className="flex-1 lg:ml-0 overflow-auto h-full">
          <div className="h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
