  import { NextRequest, NextResponse } from "next/server";
  import * as XLSX from "xlsx";
  import { drizzle } from "drizzle-orm/neon-http";
  import { neon } from "@neondatabase/serverless";
  import {  applicantsInformationTable, auditTrailsTable, downPaymentTable, MonthsInSoaTable, StudentInfoTable } from "@/src/db/schema";
  import { eq } from "drizzle-orm";
  import { generateSINumber } from "@/src/actions/utils/SI_Number_counter";
  import { getAcademicYearID } from "@/src/actions/utils/academicYear";
  import { getStaffCredentials } from "@/src/actions/utils/staffID";

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const inputLrn = formData.get("lrn") as string;

    if (!file || !inputLrn) {
      return NextResponse.json({ success: false, error: "Missing file or LRN" }, { status: 400 });
    }

    const [student] = await db
      .select()
      .from(StudentInfoTable)
      .where(eq(StudentInfoTable.lrn, inputLrn));

    if (!student) {
      console.log("❌ No student found for LRN:", inputLrn);
      return NextResponse.json({ success: false, error: "No student found with this LRN" });
    }
      const credentials = await getStaffCredentials();
        if (!credentials) {
        return NextResponse.json({ success: false, error: "Unauthorized or invalid session." }, { status: 401 });
      }

    
    const studentId = student.student_id;

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allRows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });




    let isMonthlyPayments = false;
    let hasStartedMonthly = false; 
    let downPaymentId: number | null = null;
    const academicYearID = await getAcademicYearID();
    


    for (const row of allRows) {
      if (!row || row.length === 0) continue;

      const firstCell = row[0]?.toString().toLowerCase() || "";



      if (!hasStartedMonthly && firstCell.includes("payment schedule")) {
        isMonthlyPayments = true;
        hasStartedMonthly = true; // 🔒 lock it to only trigger once
        console.log("📌 Entered Monthly Payment Section");
        continue;
      }


      if (isMonthlyPayments) {

        const month = row[0];
        const monthlyDue = parseFloat(row[1]?.toString().replace(/,/g, "") || "");
        const date = row[2] || null;
        const remarks = row[4] || null;

        if (!month || isNaN(monthlyDue)) continue;
        if (!month) {
          console.log("⏭️ Skipping row: missing month", row);
          continue;
        }

        if (!downPaymentId) {
          return NextResponse.json({ error: "Down payment must be inserted before monthly payments" }, { status: 400 });
        }
        
        // const siNumber2 = await generateSINumber();
        let siNumber2: string | null = null;
        let amoundPaid = 0;
        if (!isNaN(monthlyDue) && date) {
          siNumber2 = await generateSINumber();
          amoundPaid = monthlyDue;
        }


        await db.insert(MonthsInSoaTable).values({
          student_id: studentId,
          academicYear_id: academicYearID,
          downPaymentId, 
          month,
          monthlyDue: monthlyDue,
          amountPaid: amoundPaid,
          dateOfPayment: date,
          remarks,
          SInumber: siNumber2,
        });


      } else {
      const amount = parseFloat(row[1]?.toString().replace(/,/g, "") || "");
      const date = row[2];
      const remarks = row[4] || null;

      // 🛑 Skip invalid rows (do this BEFORE calling generateSINumber)
      // if (!date || isNaN(amount)) continue;
      if (!date || isNaN(amount)) {
        console.log("⏭️ Skipping invalid downpayment row:", row);
        continue;
      }


      // ✅ Insert down payment only once
      if (!downPaymentId) {
        const siNumber1 = await generateSINumber(); // ✅ only if valid row
        console.log("💰 Inserting down payment row:", row);

        const inserted = await db.insert(downPaymentTable)
          .values({
            student_id: studentId,
            academicYear_id: academicYearID,
            amount,
            downPaymentDate: date,
            SINumberDP: siNumber1,
            remarksDP: remarks,
          })
          .returning({ id: downPaymentTable.donw_id });

        if (inserted.length > 0) {
          downPaymentId = inserted[0].id;
        }
      }
      const [applicant] = await db
        .select({
          firstName: applicantsInformationTable.applicantsFirstName,
          middleName: applicantsInformationTable.applicantsMiddleName,
          lastName: applicantsInformationTable.applicantsLastName,
          suffix: applicantsInformationTable.applicantsSuffix,
        })
        .from(applicantsInformationTable)
        .where(eq(applicantsInformationTable.lrn, inputLrn));

      const fullName = [
        applicant.lastName,
        applicant.firstName,
        applicant.middleName ?? '',
        applicant.suffix ?? '',
      ].filter(Boolean).join(' ');

      // 📝 Insert audit log after successful down payment
      await db.insert(auditTrailsTable).values({
        actionTaken: "Uploaded SOA",
        actionTakenFor: fullName,
        dateOfAction: new Date().toISOString().split("T")[0],
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: academicYearID,
      });

    }
  }
    return NextResponse.json({ success: true, message: "SOA uploaded successfully." });
  }
