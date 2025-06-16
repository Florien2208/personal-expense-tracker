// First, add this to your schema file (lib/db/schema/categories.ts)
import {
  pgTable,
  text,
  timestamp,
  serial,
  decimal,
  integer,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
  description: text("description"),
  totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).default("0"),
  transactionCount: integer("transaction_count").default(0),
  avgTransaction: decimal("avg_transaction", {
    precision: 10,
    scale: 2,
  }).default("0"),
  monthlyTrend: decimal("monthly_trend", { precision: 5, scale: 2 }).default(
    "0"
  ),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
