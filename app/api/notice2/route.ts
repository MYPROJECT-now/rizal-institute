// app/api/notice/route.ts
import { nottice } from "@/src/actions/landingPage";
import { NextResponse } from "next/server";

export async function GET() {
  const [data] = await nottice();
  console.log("API Returning:", data);
  return NextResponse.json(data);
}
