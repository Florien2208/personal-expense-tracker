"use client";

import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  // Sample data
  const stats = [
    {
      label: "Total Balance",
      value: "$12,540.00",
      change: "+12.5%",
      changeType: "positive",
      icon: <Wallet className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Monthly Income",
      value: "$8,200.00",
      change: "+8.2%",
      changeType: "positive",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Monthly Expenses",
      value: "$3,450.00",
      change: "-4.1%",
      changeType: "negative",
      icon: <TrendingDown className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
    },
    {
      label: "Savings Goal",
      value: "$2,100.00",
      change: "70% Complete",
      changeType: "neutral",
      icon: <Target className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const monthlyData = [
    { month: "Jan", income: 7500, expenses: 4200 },
    { month: "Feb", income: 8200, expenses: 3800 },
    { month: "Mar", income: 7800, expenses: 4100 },
    { month: "Apr", income: 8500, expenses: 3600 },
    { month: "May", income: 8200, expenses: 3450 },
  ];

  const categoryData = [
    { name: "Food & Dining", value: 850, color: "#8B5CF6" },
    { name: "Transportation", value: 650, color: "#06B6D4" },
    { name: "Entertainment", value: 420, color: "#F59E0B" },
    { name: "Shopping", value: 380, color: "#EF4444" },
    { name: "Bills & Utilities", value: 320, color: "#10B981" },
    { name: "Healthcare", value: 280, color: "#EC4899" },
    { name: "Other", value: 550, color: "#6B7280" },
  ];

  const recentTransactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      category: "Food & Dining",
      amount: -85.5,
      date: "Today",
      type: "expense",
    },
    {
      id: 2,
      description: "Salary Deposit",
      category: "Income",
      amount: 4200.0,
      date: "Yesterday",
      type: "income",
    },
    {
      id: 3,
      description: "Netflix Subscription",
      category: "Entertainment",
      amount: -15.99,
      date: "2 days ago",
      type: "expense",
    },
    {
      id: 4,
      description: "Uber Ride",
      category: "Transportation",
      amount: -12.3,
      date: "3 days ago",
      type: "expense",
    },
    {
      id: 5,
      description: "Freelance Payment",
      category: "Income",
      amount: 500.0,
      date: "4 days ago",
      type: "income",
    },
  ];

  const budgetProgress = [
    { category: "Food & Dining", spent: 850, budget: 1000, color: "#8B5CF6" },
    { category: "Transportation", spent: 650, budget: 800, color: "#06B6D4" },
    { category: "Entertainment", spent: 420, budget: 500, color: "#F59E0B" },
    { category: "Shopping", spent: 380, budget: 600, color: "#EF4444" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Financial Overview
          </h1>
          <p className="text-slate-400">
            Track your income, expenses, and financial goals
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
              >
                {stat.icon}
              </div>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  stat.changeType === "positive"
                    ? "text-green-400"
                    : stat.changeType === "negative"
                    ? "text-red-400"
                    : "text-slate-400"
                }`}
              >
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : stat.changeType === "negative" ? (
                  <ArrowDownRight className="w-4 h-4" />
                ) : null}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Income vs Expenses</h3>
            <Filter className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white transition-colors" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="income" fill="#06B6D4" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Spending by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions and Budget Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              Recent Transactions
            </h3>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`font-semibold ${
                      transaction.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <div className="relative">
                    <button className="p-1 rounded hover:bg-slate-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Budget Progress</h3>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Manage Budgets
            </button>
          </div>
          <div className="space-y-4">
            {budgetProgress.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">
                    {budget.category}
                  </span>
                  <span className="text-slate-400 text-sm">
                    ${budget.spent} / ${budget.budget}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (budget.spent / budget.budget) * 100,
                        100
                      )}%`,
                      backgroundColor: budget.color,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">
                    {((budget.spent / budget.budget) * 100).toFixed(0)}% used
                  </span>
                  <span className="text-slate-400">
                    ${budget.budget - budget.spent} remaining
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
