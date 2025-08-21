// app/api/enrollment-status/route.ts
import { NextResponse } from "next/server";
import { enrollmentGlobalStatus } from "@/src/actions/utils/enrollment";

export async function GET() {
  const isActive = await enrollmentGlobalStatus();
  return NextResponse.json({ isActive });
}
