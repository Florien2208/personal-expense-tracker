// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema/categories";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.userId, session.user.id))
      .orderBy(categories.name);

    return NextResponse.json({
      categories: userCategories,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, color, icon, description } = body;

    if (!name || !color || !icon) {
      return NextResponse.json(
        { error: "Name, color, and icon are required" },
        { status: 400 }
      );
    }

    const newCategory = await db
      .insert(categories)
      .values({
        name,
        color,
        icon,
        description: description || null,
        userId: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(
      {
        category: newCategory[0],
        message: "Category created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Category creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
