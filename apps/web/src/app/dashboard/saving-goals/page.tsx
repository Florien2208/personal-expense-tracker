"use client";

import React, { useState, type JSX } from "react";
import {
  Target,
  Plus,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  X,
  CheckCircle,
  AlertCircle,
  PiggyBank,
  Home,
  Car,
  Plane,
  Laptop,
  Heart,
  Gift,
} from "lucide-react";

interface Contribution {
  date: string;
  amount: number;
}

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  icon: string;
  color: string;
  priority: "low" | "medium" | "high";
  monthlyTarget: number;
  createdDate: string;
  contributions: Contribution[];
}

interface NewGoal {
  name: string;
  targetAmount: string;
  deadline: string;
  category: string;
  icon: string;
  color: string;
  priority: "low" | "medium" | "high";
  monthlyTarget: string;
}

interface GoalCategory {
  name: string;
  icon: string;
  color: string;
}

interface GoalStatus {
  status: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SavingsGoals = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState<Goal | null>(
    null
  );
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [contributionAmount, setContributionAmount] = useState("");

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: "2025-06-30",
      category: "Emergency",
      icon: "shield",
      color: "#10B981",
      priority: "high",
      monthlyTarget: 500,
      createdDate: "2024-01-01",
      contributions: [
        { date: "2024-01-15", amount: 1500 },
        { date: "2024-02-15", amount: 1000 },
        { date: "2024-03-15", amount: 1500 },
        { date: "2024-04-15", amount: 1000 },
        { date: "2024-05-15", amount: 1500 },
        { date: "2024-06-15", amount: 1000 },
      ],
    },
    {
      id: 2,
      name: "Dream Vacation",
      targetAmount: 5000,
      currentAmount: 2100,
      deadline: "2025-08-15",
      category: "Travel",
      icon: "plane",
      color: "#8B5CF6",
      priority: "medium",
      monthlyTarget: 400,
      createdDate: "2024-02-01",
      contributions: [
        { date: "2024-02-15", amount: 500 },
        { date: "2024-03-15", amount: 400 },
        { date: "2024-04-15", amount: 400 },
        { date: "2024-05-15", amount: 400 },
        { date: "2024-06-15", amount: 400 },
      ],
    },
    {
      id: 3,
      name: "New Car",
      targetAmount: 25000,
      currentAmount: 8500,
      deadline: "2025-12-31",
      category: "Transportation",
      icon: "car",
      color: "#06B6D4",
      priority: "medium",
      monthlyTarget: 1000,
      createdDate: "2024-01-15",
      contributions: [
        { date: "2024-01-30", amount: 2000 },
        { date: "2024-02-28", amount: 1500 },
        { date: "2024-03-31", amount: 1000 },
        { date: "2024-04-30", amount: 1500 },
        { date: "2024-05-31", amount: 1000 },
        { date: "2024-06-30", amount: 1500 },
      ],
    },
    {
      id: 4,
      name: "Home Down Payment",
      targetAmount: 50000,
      currentAmount: 15000,
      deadline: "2026-03-01",
      category: "Housing",
      icon: "home",
      color: "#F59E0B",
      priority: "high",
      monthlyTarget: 2000,
      createdDate: "2024-01-01",
      contributions: [
        { date: "2024-01-31", amount: 3000 },
        { date: "2024-02-29", amount: 2500 },
        { date: "2024-03-31", amount: 2000 },
        { date: "2024-04-30", amount: 2500 },
        { date: "2024-05-31", amount: 2500 },
        { date: "2024-06-30", amount: 2500 },
      ],
    },
  ]);

  const [newGoal, setNewGoal] = useState<NewGoal>({
    name: "",
    targetAmount: "",
    deadline: "",
    category: "",
    icon: "target",
    color: "#8B5CF6",
    priority: "medium",
    monthlyTarget: "",
  });

  const goalCategories = [
    { name: "Emergency", icon: "shield", color: "#10B981" },
    { name: "Travel", icon: "plane", color: "#8B5CF6" },
    { name: "Transportation", icon: "car", color: "#06B6D4" },
    { name: "Housing", icon: "home", color: "#F59E0B" },
    { name: "Education", icon: "laptop", color: "#EF4444" },
    { name: "Health", icon: "heart", color: "#EC4899" },
    { name: "Gift", icon: "gift", color: "#6B7280" },
    { name: "Other", icon: "target", color: "#8B5A2B" },
  ];

  const getIcon = (iconName: string): JSX.Element => {
    const icons: Record<string, JSX.Element> = {
      shield: <PiggyBank className="w-5 h-5" />,
      plane: <Plane className="w-5 h-5" />,
      car: <Car className="w-5 h-5" />,
      home: <Home className="w-5 h-5" />,
      laptop: <Laptop className="w-5 h-5" />,
      heart: <Heart className="w-5 h-5" />,
      gift: <Gift className="w-5 h-5" />,
      target: <Target className="w-5 h-5" />,
    };
    return icons[iconName] || icons.target;
  };

  const getGoalStatus = (current: number, target: number, deadline: string) => {
    const progress = (current / target) * 100;
    const daysLeft = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (progress >= 100)
      return {
        status: "completed",
        color: "text-green-400",
        icon: CheckCircle,
      };
    if (daysLeft < 0)
      return { status: "overdue", color: "text-red-400", icon: AlertCircle };
    if (daysLeft < 30 && progress < 90)
      return { status: "urgent", color: "text-yellow-400", icon: Clock };
    return { status: "on-track", color: "text-blue-400", icon: TrendingUp };
  };

  const calculateMonthsToGoal = (
    current: number,
    target: number,
    monthlyContribution: number
  ): string | number => {
    if (monthlyContribution <= 0) return "∞";
    const remaining = target - current;
    return Math.ceil(remaining / monthlyContribution);
  };

  const handleAddGoal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newGoal.name && newGoal.targetAmount && newGoal.deadline) {
      const goal = {
        id: Date.now(),
        ...newGoal,
        targetAmount: parseFloat(newGoal.targetAmount),
        monthlyTarget: parseFloat(newGoal.monthlyTarget) || 0,
        currentAmount: 0,
        createdDate: new Date().toISOString().split("T")[0],
        contributions: [],
      };
      setGoals([...goals, goal]);
      setNewGoal({
        name: "",
        targetAmount: "",
        deadline: "",
        category: "",
        icon: "target",
        color: "#8B5CF6",
        priority: "medium",
        monthlyTarget: "",
      });
      setShowAddModal(false);
    }
  };

  const handleContribute = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contributionAmount && showContributeModal) {
      const amount = parseFloat(contributionAmount);
      const updatedGoals = goals.map((goal) => {
        if (goal.id === showContributeModal.id) {
          return {
            ...goal,
            currentAmount: goal.currentAmount + amount,
            contributions: [
              ...goal.contributions,
              {
                date: new Date().toISOString().split("T")[0],
                amount: amount,
              },
            ],
          };
        }
        return goal;
      });
      setGoals(updatedGoals);
      setContributionAmount("");
      setShowContributeModal(null);
    }
  };

  const handleDeleteGoal = (id:number) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const totalTargetAmount = goals.reduce(
    (sum, goal) => sum + goal.targetAmount,
    0
  );
  const totalCurrentAmount = goals.reduce(
    (sum, goal) => sum + goal.currentAmount,
    0
  );
  const completedGoals = goals.filter(
    (goal) => goal.currentAmount >= goal.targetAmount
  ).length;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysLeft = (deadline: string): number => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return days > 0 ? days : 0;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Savings Goals</h1>
          <p className="text-slate-400">
            Track your progress towards financial goals
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Saved</p>
              <p className="text-2xl font-bold text-green-400">
                ${totalCurrentAmount.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Target Amount</p>
              <p className="text-2xl font-bold text-blue-400">
                ${totalTargetAmount.toLocaleString()}
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
              <p className="text-slate-400 text-sm mb-1">Completed Goals</p>
              <p className="text-2xl font-bold text-purple-400">
                {completedGoals}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Overall Progress</p>
              <p className="text-2xl font-bold text-cyan-400">
                {((totalCurrentAmount / totalTargetAmount) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const status = getGoalStatus(
            goal.currentAmount,
            goal.targetAmount,
            goal.deadline
          );
          const daysLeft = getDaysLeft(goal.deadline);
          const monthsToGoal = calculateMonthsToGoal(
            goal.currentAmount,
            goal.targetAmount,
            goal.monthlyTarget
          );

          return (
            <div
              key={goal.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Goal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${goal.color}20`,
                      color: goal.color,
                    }}
                  >
                    {getIcon(goal.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {goal.name}
                    </h3>
                    <p className="text-slate-400 text-sm flex items-center space-x-1">
                      <status.icon className="w-4 h-4" />
                      <span className={status.color}>
                        {status.status.replace("-", " ")}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingGoal(goal)}
                    className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Goal Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">
                    ${goal.currentAmount.toLocaleString()} / $
                    {goal.targetAmount.toLocaleString()}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {progress.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      backgroundColor: goal.color,
                    }}
                  ></div>
                </div>
              </div>

              {/* Goal Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-slate-400">Deadline</p>
                  <p className="text-white font-medium">
                    {formatDate(goal.deadline)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Days Left</p>
                  <p className="text-white font-medium">{daysLeft} days</p>
                </div>
                <div>
                  <p className="text-slate-400">Monthly Target</p>
                  <p className="text-white font-medium">
                    ${goal.monthlyTarget}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Est. Completion</p>
                  <p className="text-white font-medium">
                    {monthsToGoal === "∞" ? "N/A" : `${monthsToGoal} months`}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowContributeModal(goal)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Money</span>
                </button>
                <button className="bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Progress</span>
                </button>
              </div>

              {/* Recent Contributions */}
              {goal.contributions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">
                    Recent Contributions
                  </p>
                  <div className="space-y-1">
                    {goal.contributions.slice(-3).map((contribution, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-slate-300">
                          {formatDate(contribution.date)}
                        </span>
                        <span className="text-green-400">
                          +${contribution.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Add Savings Goal</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddGoal} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Goal Name
                </label>
                <input
                  type="text"
                  required
                  value={newGoal.name}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, name: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter goal name"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  required
                  value={newGoal.category}
                  onChange={(e) => {
                    const selectedCategory = goalCategories.find(
                      (c) => c.name === e.target.value
                    );
                    setNewGoal({
                      ...newGoal,
                      category: e.target.value,
                      icon: selectedCategory?.icon || "target",
                      color: selectedCategory?.color || "#8B5CF6",
                    });
                  }}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select category</option>
                  {goalCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Target Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newGoal.targetAmount}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, targetAmount: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Monthly Target ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newGoal.monthlyTarget}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, monthlyTarget: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  required
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  value={newGoal.priority}
                  onChange={(e) =>
                    setNewGoal({
                      ...newGoal,
                      priority: e.target.value as "low" | "medium" | "high",
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
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
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contribute Modal */}
      {showContributeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Add Contribution</h3>
              <button
                onClick={() => setShowContributeModal(null)}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleContribute} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Contributing to: {showContributeModal.name}
                </label>
                <div className="bg-slate-700 rounded-lg p-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Current Progress</span>
                    <span className="text-white">
                      ${showContributeModal.currentAmount.toLocaleString()} / $
                      {showContributeModal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Contribution Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContributeModal(null)}
                  className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Add Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsGoals;
