// hooks/useCategories.ts
import { useState, useEffect } from "react";

// You'll need to set up your ORPC client - this is a simplified version
// Replace this with your actual ORPC client setup
const API_BASE_URL = "http://localhost:3000/rpc"; // Add /rpc here

type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  totalSpent: number;
  transactionCount: number;
  avgTransaction: number;
  monthlyTrend: number;
  createdAt: Date;
  updatedAt: Date;
};

type CreateCategoryInput = {
  name: string;
  color: string;
  icon: string;
  description?: string;
};

type UpdateCategoryInput = {
  id: string;
  name?: string;
  color?: string;
  icon?: string;
  description?: string;
};

export function useCategories(
  period: "week" | "month" | "lastMonth" | "year" = "month"
) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/categories.getCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ period }),
        credentials: "include",
      });
      console.log("responsess", response);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Create category
  const createCategory = async (input: CreateCategoryInput) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories.createCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const newCategory = await response.json();

      // Add the new category to local state with default values
      const categoryWithDefaults = {
        ...newCategory,
        totalSpent: 0,
        transactionCount: 0,
        avgTransaction: 0,
        monthlyTrend: 0,
      };

      setCategories((prev) => [...prev, categoryWithDefaults]);
      return newCategory;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to create category"
      );
    }
  };

  // Update category
  const updateCategory = async (input: UpdateCategoryInput) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories.updateCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const updatedCategory = await response.json();

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === input.id ? { ...cat, ...updatedCategory } : cat
        )
      );

      return updatedCategory;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to update category"
      );
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories.deleteCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to delete category"
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [period]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
