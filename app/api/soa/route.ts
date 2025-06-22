import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {  downPaymentTable, MonthsInSoaTable, StudentInfoTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const inputLrn = formData.get("lrn") as string;

  if (!file || !inputLrn) {
    return NextResponse.json({ error: "Missing file or LRN" }, { status: 400 });
  }

  const [student] = await db
    .select()
    .from(StudentInfoTable)
    .where(eq(StudentInfoTable.lrn, inputLrn));

  if (!student) {
    return NextResponse.json({ error: "Student with this LRN not found." }, { status: 404 });
  }

  const studentId = student.student_id;

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allRows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  let isMonthlyPayments = false;
  let downPaymentId: number | null = null;

  for (const row of allRows) {
    if (!row || row.length === 0) continue;

    const firstCell = row[0]?.toString().toLowerCase() || "";

    if (firstCell.includes("payment schedule")) {
      isMonthlyPayments = true;
      continue;
    }

    if (isMonthlyPayments) {
      const month = row[0];
      const monthlyDue = parseFloat(row[1]?.toString().replace(/,/g, "") || "");
      const date = row[2] || null;
      const remarks = row[4] || null;
      const siNumber = row[3] || null;

      if (!month || isNaN(monthlyDue)) continue;

      if (!downPaymentId) {
        return NextResponse.json({ error: "Down payment must be inserted before monthly payments" }, { status: 400 });
      }

      await db.insert(MonthsInSoaTable).values({
        student_id: studentId,
        downPaymentId,  // <-- Add this to link monthly payments to down payment
        month,
        monthlyDue: monthlyDue,
        dateOfPayment: date,
        remarks,
        SInumber: siNumber,
      });
    } else {
      const amount = parseFloat(row[1]?.toString().replace(/,/g, "") || "");
      const date = row[2];
      const remarks = row[4] || null;
      const siNumber = row[3] || null;

      if (!date || isNaN(amount)) continue;

      // Insert down payment only once and save its id
      if (!downPaymentId) {
        const inserted = await db.insert(downPaymentTable)
          .values({
            student_id: studentId,
            amount,
            SINumberDP: siNumber,
            remarksDP: remarks,
          })
          .returning({ id: downPaymentTable.donw_id });

        if (inserted.length === 0) {
          return NextResponse.json({ error: "Failed to insert down payment" }, { status: 500 });
        }

        downPaymentId = inserted[0].id;
      }
    }
  }

  return NextResponse.json({ success: true });
}
