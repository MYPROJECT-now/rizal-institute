// app/api/grade-subject/route.ts
import { getGradeAndSubjects } from "@/src/actions/teacherAction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getGradeAndSubjects();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[GET /api/grade-subject]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch grade/subject data." },
      { status: 500 }
    );
  }
}
