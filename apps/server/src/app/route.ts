import { NextResponse } from "next/server";

export async function GET() {
  console.log("ddddddddddddd")
  return NextResponse.json({ message: "OK man" });
}
