import { NextRequest, NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { transactions } from "@/db/schema/transaction";
import { db } from "@/db";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      .where(eq(transactions.userId, session.user.id))
      .orderBy(desc(transactions.date));

    // Convert to CSV format
    const csvHeaders = "ID,Description,Category,Amount,Date,Type,Created At\n";
    const csvRows = result
      .map((row) =>
        [
          row.id,
          `"${row.description}"`,
          row.category,
          row.amount,
          row.date?.toISOString().split("T")[0] || "",
          row.type,
          row.createdAt?.toISOString() || "",
        ].join(",")
      )
      .join("\n");

    const csv = csvHeaders + csvRows;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="transactions-${
          new Date().toISOString().split("T")[0]
        }.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
