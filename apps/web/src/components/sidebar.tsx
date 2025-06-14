"use client";

import React from "react";
import {
  BarChart3,
  Wallet,
  Target,
  PieChart,
  TrendingUp,
  Settings,
  CreditCard,
  Download,
  Bell,
  User,
  Home,
  Plus,
} from "lucide-react";

const Sidebar = ({ isOpen, currentPage, onPageChange }) => {
  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <Home className="w-5 h-5" />,
      active: currentPage === "overview",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: <CreditCard className="w-5 h-5" />,
      active: currentPage === "transactions",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      active: currentPage === "analytics",
    },
    {
      id: "budgets",
      label: "Budgets",
      icon: <Target className="w-5 h-5" />,
      active: currentPage === "budgets",
    },
    {
      id: "goals",
      label: "Savings Goals",
      icon: <TrendingUp className="w-5 h-5" />,
      active: currentPage === "goals",
    },
    {
      id: "categories",
      label: "Categories",
      icon: <PieChart className="w-5 h-5" />,
      active: currentPage === "categories",
    },
  ];

  const bottomMenuItems = [
    {
      id: "export",
      label: "Export Data",
      icon: <Download className="w-5 h-5" />,
      active: currentPage === "export",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      active: currentPage === "settings",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-slate-900/95 backdrop-blur-sm border-r border-slate-800 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto w-64`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo - Only show on mobile when sidebar is open */}
          <div className="flex items-center space-x-3 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Dashboard</span>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    item.active
                      ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span
                    className={`${
                      item.active ? "text-purple-400" : "text-slate-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-slate-800 pt-4">
            <div className="space-y-2">
              {bottomMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    item.active
                      ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span
                    className={`${
                      item.active ? "text-purple-400" : "text-slate-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  John Doe
                </p>
                <p className="text-slate-400 text-xs truncate">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
