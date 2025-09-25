// app/api/notice/route.ts
import { nottice } from "@/src/actions/landingPage";
import { NextResponse } from "next/server";

export async function GET() {
  const noticeArray = await nottice();
  const data = noticeArray[0] || null; // if query is empty, return null
  console.log("API Returning:", data);
  return NextResponse.json(data);
}
