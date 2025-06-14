"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  PieChart,
  Shield,
  Target,
  Download,
  Bell,
  Search,
  Edit3,
  BarChart3,
  Wallet,
  CreditCard,
  Filter,
  Calendar,
  ArrowRight,
  Star,
  Check,
  Menu,
  X,
} from "lucide-react";

const ExpenseTrackerHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Smart Transaction Management",
      description:
        "Add, edit, and delete transactions with intelligent categorization",
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Visual Spending Insights",
      description:
        "Beautiful charts showing expenses by category and monthly trends",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Budget Tracking",
      description:
        "Set monthly budgets and track your progress with smart alerts",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Advanced Filtering",
      description:
        "Find transactions quickly with powerful search and filter options",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "CSV Export",
      description:
        "Export your financial data for external analysis and record-keeping",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Alerts",
      description:
        "Get notified when you're approaching budget limits or savings goals",
    },
  ];

  const stats = [
    {
      label: "Transactions Tracked",
      value: "50K+",
      icon: <CreditCard className="w-8 h-8" />,
    },
    {
      label: "Money Saved",
      value: "$2M+",
      icon: <DollarSign className="w-8 h-8" />,
    },
    {
      label: "Active Users",
      value: "10K+",
      icon: <Wallet className="w-8 h-8" />,
    },
    {
      label: "Categories",
      value: "50+",
      icon: <BarChart3 className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">ExpenseTracker</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="hover:text-purple-300 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-purple-300 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="hover:text-purple-300 transition-colors"
            >
              About
            </a>
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-md border-t border-slate-700 p-6">
            <div className="space-y-4">
              <a
                href="#features"
                className="block hover:text-purple-300 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block hover:text-purple-300 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="block hover:text-purple-300 transition-colors"
              >
                About
              </a>
              <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm">Track, Analyze, Save Money</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight">
            Master Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Financial Future
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform how you manage money with intelligent expense tracking,
            beautiful insights, and smart budgeting tools that actually work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Start Tracking Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border border-slate-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-purple-400">{stat.icon}</div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Succeed
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Powerful features designed to give you complete control over your
              financial life
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Animation */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center transform transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl mb-6">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-slate-300 text-lg">
                    {features[activeFeature].description}
                  </p>
                </div>
              </div>

              {/* Feature Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeFeature
                        ? "bg-purple-500 w-8"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    index === activeFeature
                      ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30"
                      : "hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      index === activeFeature
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                        : "bg-slate-700"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-slate-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Transaction Management */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Edit3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart Transactions
              </h3>
              <p className="text-slate-300 mb-6">
                Effortlessly add, edit, and manage all your income and expenses
                with intelligent categorization.
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Quick transaction entry
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Auto-categorization
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Bulk operations
                </li>
              </ul>
            </div>

            {/* Visual Analytics */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Visual Analytics
              </h3>
              <p className="text-slate-300 mb-6">
                Beautiful interactive charts and graphs to understand your
                spending patterns.
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-purple-500 mr-2" />
                  Category breakdowns
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-purple-500 mr-2" />
                  Monthly trends
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-purple-500 mr-2" />
                  Interactive charts
                </li>
              </ul>
            </div>

            {/* Budget Tracking */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Budget Control
              </h3>
              <p className="text-slate-300 mb-6">
                Set monthly budgets and track progress with smart alerts and
                savings goals.
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-cyan-500 mr-2" />
                  Monthly budget limits
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-cyan-500 mr-2" />
                  Smart alerts
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-cyan-500 mr-2" />
                  Savings goals
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Take Control of Your
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Finances?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their financial
              habits with our intelligent expense tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border border-slate-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">ExpenseTracker</span>
            </div>
            <div className="flex items-center space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
              <span>© 2025 ExpenseTracker. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExpenseTrackerHomepage;
