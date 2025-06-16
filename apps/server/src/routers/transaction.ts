import { z } from "zod";
import { eq, desc, and, like, sql } from "drizzle-orm";
import { protectedProcedure } from "../lib/orpc";
import { transactions } from "@/db/schema/transaction";
import { db } from "@/db";

const transactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.string().transform((val) => parseFloat(val)),
  date: z.string(),
  type: z.enum(["income", "expense"]),
});

const updateTransactionSchema = transactionSchema.extend({
  id: z.number(),
});

const getTransactionsSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  type: z.enum(["income", "expense", "all"]).optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});

export const transactionRouter = {
  // Get all transactions for the authenticated user
  getTransactions: protectedProcedure
    .input(getTransactionsSchema)
    .handler(async ({ input, context }) => {
      const { search, category, type, limit, offset } = input;
      const userId = context.session.user.id;

      let whereConditions = [eq(transactions.userId, userId)];

      if (search) {
        whereConditions.push(like(transactions.description, `%${search}%`));
      }

      if (category && category !== "All") {
        whereConditions.push(eq(transactions.category, category));
      }

      if (type && type !== "all") {
        whereConditions.push(eq(transactions.type, type));
      }

      const result = await db
        .select()
        .from(transactions)
        .where(and(...whereConditions))
        .orderBy(desc(transactions.date), desc(transactions.createdAt))
        .limit(limit)
        .offset(offset);

      return result;
    }),

  // Create a new transaction
  createTransaction: protectedProcedure
    .input(transactionSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const { description, category, amount, date, type } = input;

      // Adjust amount based on type
      const adjustedAmount =
        type === "expense" ? -Math.abs(amount) : Math.abs(amount);

      const [newTransaction] = await db
        .insert(transactions)
        .values({
          description,
          category,
          amount: adjustedAmount.toString(),
          date: new Date(date),
          type,
          userId,
        })
        .returning();

      return newTransaction;
    }),

  // Update a transaction
  updateTransaction: protectedProcedure
    .input(updateTransactionSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const { id, description, category, amount, date, type } = input;

      // Adjust amount based on type
      const adjustedAmount =
        type === "expense" ? -Math.abs(amount) : Math.abs(amount);

      const [updatedTransaction] = await db
        .update(transactions)
        .set({
          description,
          category,
          amount: adjustedAmount.toString(),
          date: new Date(date),
          type,
          updatedAt: new Date(),
        })
        .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
        .returning();

      if (!updatedTransaction) {
        throw new Error("Transaction not found or unauthorized");
      }

      return updatedTransaction;
    }),

  // Delete a transaction
  deleteTransaction: protectedProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;
      const { id } = input;

      const [deletedTransaction] = await db
        .delete(transactions)
        .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
        .returning();

      if (!deletedTransaction) {
        throw new Error("Transaction not found or unauthorized");
      }

      return { success: true, id };
    }),

  // Get transaction summary
  getSummary: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session.user.id;

    const result = await db
      .select({
        totalIncome: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.amount} > 0 THEN ${transactions.amount} ELSE 0 END), 0)`,
        totalExpenses: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.amount} < 0 THEN ABS(${transactions.amount}) ELSE 0 END), 0)`,
        transactionCount: sql<number>`COUNT(*)`,
      })
      .from(transactions)
      .where(eq(transactions.userId, userId));

    const summary = result[0];
    const netBalance = summary.totalIncome - summary.totalExpenses;

    return {
      totalIncome: Number(summary.totalIncome),
      totalExpenses: Number(summary.totalExpenses),
      netBalance,
      transactionCount: Number(summary.transactionCount),
    };
  }),

  // Get categories with transaction counts
  getCategories: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session.user.id;

    const result = await db
      .select({
        category: transactions.category,
        count: sql<number>`COUNT(*)`,
        totalAmount: sql<number>`SUM(${transactions.amount})`,
      })
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .groupBy(transactions.category)
      .orderBy(sql`COUNT(*) DESC`);

    return result.map((row) => ({
      category: row.category,
      count: Number(row.count),
      totalAmount: Number(row.totalAmount),
    }));
  }),

  // Export transactions as CSV data
  exportTransactions: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session.user.id;

    const result = await db
      .select({
        id: transactions.id,
        description: transactions.description,
        category: transactions.category,
        amount: transactions.amount,
        date: transactions.date,
        type: transactions.type,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.date));

    return result;
  }),
};
