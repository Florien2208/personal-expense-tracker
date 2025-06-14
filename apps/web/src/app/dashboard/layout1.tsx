"use client";

import React, { useState } from "react";
import Overview from "./overview";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";


const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("overview");

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Close sidebar on mobile when navigating
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "overview":
        return <Overview />;
      case "transactions":
        return (
          <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Transactions</h1>
              <p className="text-slate-400">Transactions page coming soon...</p>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Analytics</h1>
              <p className="text-slate-400">Analytics page coming soon...</p>
            </div>
          </div>
        );
      case "budgets":
        return (
          <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Budgets</h1>
              <p className="text-slate-400">Budgets page coming soon...</p>
            </div>
          </div>
        );
      case "goals":
        return (
          <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Savings Goals</h1>
              <p className="text-slate-400">
                Savings Goals page coming soon...
              </p>
            </div>
          </div>
        );
      case "categories":
        return (
          <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Categories</h1>
              <p className="text-slate-400">Categories page coming soon...</p>
            </div>
          </div>
        );
      case "export":
        return (
          <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Export Data</h1>
              <p className="text-slate-400">
                Export functionality coming soon...
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Settings</h1>
              <p className="text-slate-400">Settings page coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Navbar */}
      <Navbar onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">{renderCurrentPage()}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
