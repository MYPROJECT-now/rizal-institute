import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { ilike, and, or, eq } from "drizzle-orm";

import { db } from "@/src/db/drizzle";
import { StudentGradesTable, StudentInfoTable } from "@/src/db/schema";
import { getAcademicYearID } from "@/src/actions/utils/academicYear";

export async function POST(req: NextRequest) {
  try {
    console.log("📥 Receiving uploaded Excel file...");

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const gradeLevel_id = Number(formData.get("gradeLevel_id"));
    const subject_id = Number(formData.get("subject_id"));


    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "buffer" });

    console.log("📑 Available sheets:", workbook.SheetNames);

    const sheetName = workbook.SheetNames.find(
      (name) => name.trim().toLowerCase() === "summary of quarterly grades"
    );

    if (!sheetName) {
      return NextResponse.json({
        success: false,
        error: "'SUMMARY OF QUARTERLY GRADES' sheet not found.",
      });
    }

    console.log(`✅ Found sheet: "${sheetName}"`);
    const worksheet = workbook.Sheets[sheetName];

    const safeValue = (cell: XLSX.CellObject | undefined): string =>
      String(cell?.v ?? cell?.w ?? "").toUpperCase().trim();

    const columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const maxHeaderScanRows = 30;

    let learnersCol: string | null = null;
    let finalCol: string | null = null;

    // 🔍 Find LEARNERS' NAMES and FINAL headers
    for (let row = 1; row <= maxHeaderScanRows; row++) {
      for (const col of columns) {
        const cellRef = `${col}${row}`;
        const value = safeValue(worksheet[cellRef]);

        if (!learnersCol && value.includes("LEARNERS' NAMES")) {
          learnersCol = col;
          console.log(`✅ Found "LEARNERS' NAMES" at ${cellRef}`);
        }

        if (!finalCol && value.includes("FINAL")) {
          finalCol = col;
          console.log(`✅ Found "FINAL" at ${cellRef}`);
        }

        if (learnersCol && finalCol) break;
      }
      if (learnersCol && finalCol) break;
    }

    if (!learnersCol || !finalCol) {
      return NextResponse.json({
        success: false,
        error: "Could not locate both 'LEARNERS' NAMES' and 'FINAL' columns.",
      });
    }

    // 🔍 Find MALE and FEMALE row markers
    let maleRow: number | null = null;
    let femaleRow: number | null = null;

    for (let row = 1; row <= 1000; row++) {
      for (const col of columns) {
        const value = safeValue(worksheet[`${col}${row}`]);
        if (!maleRow && value === "MALE") {
          maleRow = row;
          console.log(`✅ Found "MALE" at ${col}${row}`);
        }
        if (!femaleRow && value === "FEMALE") {
          femaleRow = row;
          console.log(`✅ Found "FEMALE" at ${col}${row}`);
        }

        if (maleRow && femaleRow) break;
      }
      if (maleRow && femaleRow) break;
    }

    const extractFromSection = (
      startRow: number,
      learnersCol: string,
      finalCol: string
    ): { name: string; final: string; row: number }[] => {
      const students: { name: string; final: string; row: number }[] = [];
      let row = startRow + 1;
      let skips = 0;

      console.log(`🔍 Scanning rows below ${startRow}...`);
      while (skips < 5) {
        const name = safeValue(worksheet[`${learnersCol}${row}`]);
        const final = safeValue(worksheet[`${finalCol}${row}`]);

        if (name && final) {
          students.push({ name, final, row });
          console.log(`✅ Row ${row}: ${name} - ${final}`);
          skips = 0;
        } else {
          console.log(`⏭️ Skipped row ${row} (missing name or final)`);
          skips++;
        }

        row++;
      }

      console.log(`🛑 Stopped after 5 skips.`);
      return students;
    };

    const maleStudents =
      typeof maleRow === "number"
        ? extractFromSection(maleRow, learnersCol, finalCol)
        : [];

    const femaleStudents =
      typeof femaleRow === "number"
        ? extractFromSection(femaleRow, learnersCol, finalCol)
        : [];

    const allStudents = [...maleStudents, ...femaleStudents];

    let insertedCount = 0;

    // ✅ MATCH & FILL FINAL GRADE
    for (const student of allStudents) {
      const originalName = student.name.trim();
      const parts = originalName.replace(",", "").split(/\s+/);

      if (parts.length < 2) {
        console.log(`❌ Skipping "${originalName}" — not enough parts`);
        continue;
      }

      const [part1, part2] = parts;

      const match = await db
        .select({
          student_id: StudentInfoTable.student_id,
          firstName: StudentInfoTable.studentFirstName,
          lastName: StudentInfoTable.studentLastName,
        })
        .from(StudentInfoTable)
        .where(
          or(
            and(
              ilike(StudentInfoTable.studentFirstName, `%${part1}%`),
              ilike(StudentInfoTable.studentLastName, `%${part2}%`)
            ),
            and(
              ilike(StudentInfoTable.studentFirstName, `%${part2}%`),
              ilike(StudentInfoTable.studentLastName, `%${part1}%`)
            )
          )
        );
        

      if (match.length > 0) {
        const found = match[0];
        const grade = parseInt(student.final, 10);

        const existing = await db
        .select()
        .from(StudentGradesTable)
        .where(
          and(
            eq(StudentGradesTable.student_id, found.student_id),
          )
        );

        if (existing.length === 0) {
          console.log(`⚠️ No existing grade row for student ID ${found.student_id}`);
        }



        const acadId = await getAcademicYearID();
        if (!isNaN(grade)) {
          const updateResult = await db
            .update(StudentGradesTable)
            .set({
              finalGrade: grade,
              dateSubmitted: new Date().toISOString().split("T")[0],
            })
            .where(
              and(
                eq(StudentGradesTable.student_id, found.student_id),
                eq(StudentGradesTable.academicYear_id, acadId),
                eq(StudentGradesTable.gradeLevel_id, gradeLevel_id),
                eq(StudentGradesTable.subject_id, subject_id)
              )
            );

          if (updateResult.rowCount > 0) {
            insertedCount++;
            console.log(`✅ INSERTED INTO EXISTING ROW: ${originalName} → ${grade}`);
          } else {
            console.log(`⚠️ Row not found for grade insertion: ${originalName}`);
          }
        } else {
          console.log(`❌ Invalid grade value: "${student.final}"`);
        }
      } else {
        console.log(`❌ NO MATCH: "${originalName}"`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Grade submitted. ${insertedCount} grades inserted.`,
      totalExtracted: allStudents.length,
    });
  } catch (err) {
    const error = err as Error; // 👈 assert to Error
    console.error("❌ Unexpected Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
