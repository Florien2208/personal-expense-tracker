"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  CreditCard,
  Download,
  TrendingUp,
  TrendingDown,
  X,
} from "lucide-react";
type TransactionType = "income" | "expense";

// Transaction Interface
interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
}

// New Transaction Interface (before parsing amount to number)
interface NewTransaction {
  description: string;
  category: string;
  amount: string;
  date: string;
  type: TransactionType;
}

const Transactions = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Grocery Shopping",
      category: "Food & Dining",
      amount: -85.5,
      date: "2024-12-15",
      type: "expense",
    },
    {
      id: 2,
      description: "Salary Deposit",
      category: "Income",
      amount: 4200.0,
      date: "2024-12-14",
      type: "income",
    },
    {
      id: 3,
      description: "Netflix Subscription",
      category: "Entertainment",
      amount: -15.99,
      date: "2024-12-13",
      type: "expense",
    },
    {
      id: 4,
      description: "Uber Ride",
      category: "Transportation",
      amount: -12.3,
      date: "2024-12-12",
      type: "expense",
    },
    {
      id: 5,
      description: "Freelance Payment",
      category: "Income",
      amount: 500.0,
      date: "2024-12-11",
      type: "income",
    },
    {
      id: 6,
      description: "Coffee Shop",
      category: "Food & Dining",
      amount: -4.5,
      date: "2024-12-11",
      type: "expense",
    },
    {
      id: 7,
      description: "Electricity Bill",
      category: "Bills & Utilities",
      amount: -120.0,
      date: "2024-12-10",
      type: "expense",
    },
    {
      id: 8,
      description: "Movie Tickets",
      category: "Entertainment",
      amount: -24.0,
      date: "2024-12-09",
      type: "expense",
    },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    description: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
  });

  const categories = [
    "Food & Dining",
    "Transportation",
    "Entertainment",
    "Bills & Utilities",
    "Shopping",
    "Healthcare",
    "Income",
    "Other",
  ];

  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      newTransaction.description &&
      newTransaction.amount &&
      newTransaction.category
    ) {
      const transaction = {
        id: Date.now(),
        ...newTransaction,
        amount:
          newTransaction.type === "expense"
            ? -Math.abs(parseFloat(newTransaction.amount))
            : Math.abs(parseFloat(newTransaction.amount)),
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({
        description: "",
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        type: "expense",
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteTransaction = (id:number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || transaction.category === filterCategory;
    const matchesType = filterType === "All" || transaction.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-slate-400">Manage your income and expenses</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white hover:bg-slate-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Income</p>
              <p className="text-2xl font-bold text-green-400">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-red-400">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Net Balance</p>
              <p
                className={`text-2xl font-bold ${
                  totalIncome - totalExpenses >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ${(totalIncome - totalExpenses).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">
            All Transactions ({filteredTransactions.length})
          </h3>
        </div>
        <div className="divide-y divide-slate-700">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-6 hover:bg-slate-700/30 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === "income"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {transaction.description}
                  </h4>
                  <p className="text-slate-400 text-sm">
                    {transaction.category} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-lg font-bold ${
                    transaction.amount > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-slate-600 transition-colors text-slate-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="p-2 rounded-lg hover:bg-slate-600 transition-colors text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Add Transaction</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  required
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter transaction description"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="expense"
                      checked={newTransaction.type === "expense"}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          type: e.target.value,
                        })
                      }
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-slate-300">Expense</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="income"
                      checked={newTransaction.type === "income"}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          type: e.target.value,
                        })
                      }
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-slate-300">Income</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  required
                  value={newTransaction.category}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      category: e.target.value,
                    })
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
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: e.target.value,
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={newTransaction.date}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      date: e.target.value,
                    })
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
