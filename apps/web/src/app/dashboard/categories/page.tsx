"use client";

import React, { useState } from "react";
import {
  PieChart,
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Tag,
  BarChart3,
  Calendar,
} from "lucide-react";
import {
  PieChart as RechartsePieChart,
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

const Categories = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Food & Dining",
      color: "#8B5CF6",
      icon: "🍽️",
      totalSpent: 850,
      transactionCount: 15,
      avgTransaction: 56.67,
      monthlyTrend: 5.2,
      description: "Restaurants, groceries, and food delivery",
    },
    {
      id: 2,
      name: "Transportation",
      color: "#06B6D4",
      icon: "🚗",
      totalSpent: 650,
      transactionCount: 12,
      avgTransaction: 54.17,
      monthlyTrend: -2.1,
      description: "Gas, public transport, rideshare, parking",
    },
    {
      id: 3,
      name: "Entertainment",
      color: "#F59E0B",
      icon: "🎬",
      totalSpent: 420,
      transactionCount: 8,
      avgTransaction: 52.5,
      monthlyTrend: 12.3,
      description: "Movies, concerts, games, subscriptions",
    },
    {
      id: 4,
      name: "Shopping",
      color: "#EF4444",
      icon: "🛍️",
      totalSpent: 380,
      transactionCount: 6,
      avgTransaction: 63.33,
      monthlyTrend: -8.7,
      description: "Clothing, electronics, home goods",
    },
    {
      id: 5,
      name: "Bills & Utilities",
      color: "#10B981",
      icon: "💡",
      totalSpent: 320,
      transactionCount: 4,
      avgTransaction: 80.0,
      monthlyTrend: 1.5,
      description: "Electricity, water, internet, phone",
    },
    {
      id: 6,
      name: "Healthcare",
      color: "#EC4899",
      icon: "⚕️",
      totalSpent: 280,
      transactionCount: 3,
      avgTransaction: 93.33,
      monthlyTrend: -15.2,
      description: "Doctor visits, pharmacy, insurance",
    },
    {
      id: 7,
      name: "Travel",
      color: "#8B5A2B",
      icon: "✈️",
      totalSpent: 150,
      transactionCount: 2,
      avgTransaction: 75.0,
      monthlyTrend: 25.0,
      description: "Hotels, flights, vacation expenses",
    },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#8B5CF6",
    icon: "📂",
    description: "",
  });

  const availableIcons = [
    "🍽️",
    "🚗",
    "🎬",
    "🛍️",
    "💡",
    "⚕️",
    "✈️",
    "🏠",
    "📚",
    "💼",
    "🎵",
    "🏃‍♂️",
    "🐕",
    "🎁",
    "💰",
    "📱",
    "🧘‍♀️",
    "🌟",
    "📂",
    "🔧",
  ];

  const colors = [
    "#8B5CF6",
    "#06B6D4",
    "#F59E0B",
    "#EF4444",
    "#10B981",
    "#EC4899",
    "#8B5A2B",
    "#6B7280",
    "#F97316",
    "#84CC16",
  ];

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      const category = {
        id: Date.now(),
        ...newCategory,
        totalSpent: 0,
        transactionCount: 0,
        avgTransaction: 0,
        monthlyTrend: 0,
      };
      setCategories([...categories, category]);
      setNewCategory({
        name: "",
        color: "#8B5CF6",
        icon: "📂",
        description: "",
      });
      setShowAddModal(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    setCategories(
      categories.map((c) => (c.id === editingCategory.id ? editingCategory : c))
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSpent = categories.reduce((sum, cat) => sum + cat.totalSpent, 0);
  const totalTransactions = categories.reduce(
    (sum, cat) => sum + cat.transactionCount,
    0
  );

  const pieChartData = filteredCategories.map((category) => ({
    name: category.name,
    value: category.totalSpent,
    color: category.color,
    percentage: ((category.totalSpent / totalSpent) * 100).toFixed(1),
  }));

  const barChartData = filteredCategories
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 6)
    .map((category) => ({
      name:
        category.name.length > 12
          ? category.name.substring(0, 12) + "..."
          : category.name,
      amount: category.totalSpent,
      transactions: category.transactionCount,
      color: category.color,
    }));

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-slate-400">
            Organize and analyze your spending patterns
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
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white hover:bg-slate-600 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {category.name}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {category.transactionCount} transactions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="p-2 rounded-lg hover:bg-slate-600 transition-colors text-slate-400 hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 rounded-lg hover:bg-slate-600 transition-colors text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Spent</span>
                <span className="text-xl font-bold text-white">
                  ${category.totalSpent.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Avg per Transaction</span>
                <span className="text-white">
                  ${category.avgTransaction.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Monthly Trend</span>
                <div
                  className={`flex items-center space-x-1 ${
                    category.monthlyTrend >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {category.monthlyTrend >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(category.monthlyTrend).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {category.description && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-slate-400 text-sm">{category.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Add New Category</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-10 gap-2">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewCategory({ ...newCategory, icon })}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-colors ${
                        newCategory.icon === icon
                          ? "bg-purple-500 text-white"
                          : "bg-slate-700 hover:bg-slate-600"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Color
                </label>
                <div className="grid grid-cols-10 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewCategory({ ...newCategory, color })}
                      className={`w-8 h-8 rounded-lg transition-all ${
                        newCategory.color === color
                          ? "ring-2 ring-white ring-offset-2 ring-offset-slate-800"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="3"
                  placeholder="Brief description of this category"
                />
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
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Edit Category</h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-10 gap-2">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() =>
                        setEditingCategory({ ...editingCategory, icon })
                      }
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-colors ${
                        editingCategory.icon === icon
                          ? "bg-purple-500 text-white"
                          : "bg-slate-700 hover:bg-slate-600"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Color
                </label>
                <div className="grid grid-cols-10 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setEditingCategory({ ...editingCategory, color })
                      }
                      className={`w-8 h-8 rounded-lg transition-all ${
                        editingCategory.color === color
                          ? "ring-2 ring-white ring-offset-2 ring-offset-slate-800"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="3"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
