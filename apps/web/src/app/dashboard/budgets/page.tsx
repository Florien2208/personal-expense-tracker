"use client";

import React, { useState } from "react";
import {
  Target,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
interface Budget {
  id: number;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  period: "weekly" | "monthly" | "yearly";
  color: string;
  startDate: string;
  endDate: string;
}

interface NewBudget {
  category: string;
  budgetAmount: string;
  period: "weekly" | "monthly" | "yearly";
  color: string;
}

interface PieChartDataItem {
  name: string;
  value: number;
  color: string;
  budget: number;
}
const Budgets = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: 1,
      category: "Food & Dining",
      budgetAmount: 1000,
      spentAmount: 850,
      period: "monthly",
      color: "#8B5CF6",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
    },
    {
      id: 2,
      category: "Transportation",
      budgetAmount: 800,
      spentAmount: 650,
      period: "monthly",
      color: "#06B6D4",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
    },
    {
      id: 3,
      category: "Entertainment",
      budgetAmount: 500,
      spentAmount: 420,
      period: "monthly",
      color: "#F59E0B",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
    },
    {
      id: 4,
      category: "Shopping",
      budgetAmount: 600,
      spentAmount: 720,
      period: "monthly",
      color: "#EF4444",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
    },
    {
      id: 5,
      category: "Bills & Utilities",
      budgetAmount: 400,
      spentAmount: 320,
      period: "monthly",
      color: "#10B981",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
    },
  ]);

  const [newBudget, setNewBudget] = useState<NewBudget>({
    category: "",
    budgetAmount: "",
    period: "monthly",
    color: "#8B5CF6",
  });

  const categories:string [] = [
    "Food & Dining",
    "Transportation",
    "Entertainment",
    "Bills & Utilities",
    "Shopping",
    "Healthcare",
    "Other",
  ];

  const colors: string[] = [
    "#8B5CF6",
    "#06B6D4",
    "#F59E0B",
    "#EF4444",
    "#10B981",
    "#EC4899",
    "#6B7280",
    "#8B5A2B",
  ];

  const handleAddBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newBudget.category && newBudget.budgetAmount) {
      const budget = {
        id: Date.now(),
        ...newBudget,
        budgetAmount: parseFloat(newBudget.budgetAmount),
        spentAmount: 0,
        startDate: new Date().toISOString().split("T")[0],
        endDate: getEndDate(newBudget.period),
      };
      setBudgets([...budgets, budget]);
      setNewBudget({
        category: "",
        budgetAmount: "",
        period: "monthly",
        color: "#8B5CF6",
      });
      setShowAddModal(false);
    }
  };

  const handleEditBudget = (budget:Budget) => {
    setEditingBudget({ ...budget });
  };

  const handleUpdateBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingBudget) {
      setBudgets(
        budgets.map((b) =>
          b.id === editingBudget.id
            ? {
                ...editingBudget,
                budgetAmount: parseFloat(editingBudget.budgetAmount.toString()),
              }
            : b
        )
      );
      setEditingBudget(null);
    }
  };

  const handleDeleteBudget = (id:number) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  const getEndDate = (period: "weekly" | "monthly" | "yearly"): string => {
    const now = new Date();
    const endDate = new Date(now);

    switch (period) {
      case "weekly":
        endDate.setDate(now.getDate() + 7);
        break;
      case "monthly":
        endDate.setMonth(now.getMonth() + 1);
        break;
      case "yearly":
        endDate.setFullYear(now.getFullYear() + 1);
        break;
      default:
        endDate.setMonth(now.getMonth() + 1);
    }

    return endDate.toISOString().split("T")[0];
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100)
      return { status: "exceeded", color: "text-red-400", icon: AlertTriangle };
    if (percentage >= 80)
      return {
        status: "warning",
        color: "text-yellow-400",
        icon: AlertTriangle,
      };
    return { status: "good", color: "text-green-400", icon: CheckCircle };
  };

  const totalBudget = budgets.reduce(
    (sum, budget) => sum + budget.budgetAmount,
    0
  );
  const totalSpent = budgets.reduce(
    (sum, budget) => sum + budget.spentAmount,
    0
  );
  const totalRemaining = totalBudget - totalSpent;

  const pieChartData: PieChartDataItem[] = budgets.map((budget) => ({
    name: budget.category,
    value: budget.spentAmount,
    color: budget.color,
    budget: budget.budgetAmount,
  }));

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Budget Management
          </h1>
          <p className="text-slate-400">Set and track your spending limits</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Budget</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-white">
                ${totalBudget.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-red-400">
                ${totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Remaining</p>
              <p
                className={`text-2xl font-bold ${
                  totalRemaining >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                ${Math.abs(totalRemaining).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview Chart and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Spending Distribution Chart */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Spending Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                formatter={(value, name, props) => [
                  `$${Number(value).toFixed(
                    2
                  )} / $${props.payload.budget.toFixed(2)}`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Status Overview */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Budget Status</h3>
          <div className="space-y-4">
            {budgets.map((budget) => {
              const status = getBudgetStatus(
                budget.spentAmount,
                budget.budgetAmount
              );
              const StatusIcon = status.icon;
              const percentage = Math.min(
                (budget.spentAmount / budget.budgetAmount) * 100,
                100
              );

              return (
                <div
                  key={budget.id}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    <div>
                      <p className="text-white font-medium">
                        {budget.category}
                      </p>
                      <p className="text-slate-400 text-sm">
                        ${budget.spentAmount.toFixed(2)} / $
                        {budget.budgetAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${status.color}`}>
                      {percentage.toFixed(0)}%
                    </p>
                    <p className="text-slate-400 text-sm">
                      ${(budget.budgetAmount - budget.spentAmount).toFixed(2)}{" "}
                      left
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Budget List */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">
            All Budgets ({budgets.length})
          </h3>
        </div>
        <div className="divide-y divide-slate-700">
          {budgets.map((budget) => {
            const status = getBudgetStatus(
              budget.spentAmount,
              budget.budgetAmount
            );
            const percentage = (budget.spentAmount / budget.budgetAmount) * 100;
            const isOverBudget = budget.spentAmount > budget.budgetAmount;

            return (
              <div
                key={budget.id}
                className="p-6 hover:bg-slate-700/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: budget.color }}
                    ></div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">
                        {budget.category}
                      </h4>
                      <p className="text-slate-400 text-sm capitalize">
                        {budget.period} budget • Ends{" "}
                        {new Date(budget.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        ${budget.spentAmount.toFixed(2)} / $
                        {budget.budgetAmount.toFixed(2)}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          isOverBudget ? "text-red-400" : "text-slate-400"
                        }`}
                      >
                        {isOverBudget
                          ? `${(
                              budget.spentAmount - budget.budgetAmount
                            ).toFixed(2)} over budget`
                          : `${(
                              budget.budgetAmount - budget.spentAmount
                            ).toFixed(2)} remaining`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditBudget(budget)}
                        className="p-2 rounded-lg hover:bg-slate-600 transition-colors text-slate-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="p-2 rounded-lg hover:bg-slate-600 transition-colors text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: isOverBudget
                          ? "#EF4444"
                          : budget.color,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-medium ${status.color}`}>
                      {percentage.toFixed(1)}% used
                    </span>
                    {isOverBudget && (
                      <span className="text-red-400 font-medium flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Over Budget</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Budget Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Create Budget</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddBudget} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  required
                  value={newBudget.category}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, category: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Budget Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newBudget.budgetAmount}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, budgetAmount: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Period
                </label>
                <select
                  value={newBudget.period}
                  onChange={(e) =>
                    setNewBudget({
                      ...newBudget,
                      period: e.target.value as "weekly" | "monthly" | "yearly",
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Color
                </label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewBudget({ ...newBudget, color })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        newBudget.color === color
                          ? "border-white"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Create Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Budget Modal */}
      {editingBudget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Edit Budget</h3>
              <button
                onClick={() => setEditingBudget(null)}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateBudget} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={editingBudget.category}
                  disabled
                  className="w-full bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Budget Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editingBudget.budgetAmount}
                  onChange={(e) =>
                    setEditingBudget({
                      ...editingBudget,
                      period: e.target.value as "weekly" | "monthly" | "yearly",
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Period
                </label>
                <select
                  value={editingBudget.period}
                  onChange={(e) =>
                    setEditingBudget({
                      ...editingBudget,
                      period: e.target.value as "weekly" | "monthly" | "yearly",
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Color
                </label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setEditingBudget({ ...editingBudget, color })
                      }
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        editingBudget.color === color
                          ? "border-white"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingBudget(null)}
                  className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Update Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
