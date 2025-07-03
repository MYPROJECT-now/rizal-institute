// import { NextRequest, NextResponse } from "next/server";
// import * as XLSX from "xlsx";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { applicantsInformationTable, downPaymentTable, MonthsInSoaTable } from "@/src/db/schema";
// import { eq } from "drizzle-orm";

// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle(sql);

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;
//   const inputLrn = formData.get("lrn") as string;

//   if (!file || !inputLrn) {
//     return NextResponse.json({ error: "Missing file or LRN" }, { status: 400 });
//   }

//   // Validate LRN against database
//   const [student] = await db
//     .select()
//     .from(applicantsInformationTable)
//     .where(eq(applicantsInformationTable.lrn, inputLrn));

//   if (!student) {
//     return NextResponse.json({ error: "Student with this LRN not found." }, { status: 404 });
//   }

//   const applicantId = student.applicants_id;

//   // Parse Excel - read raw rows as arrays, including header and all data rows
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const workbook = XLSX.read(buffer, { type: "buffer" });
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];

//   // Get all rows as arrays (header row + data rows)
//   const allRows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//   let isMonthlyPayments = false;
//   let isFirstPayment = true;

//   for (const row of allRows) {
//     // Defensive: skip empty rows
//     if (!row || row.length === 0) continue;

//     // Detect start of monthly payments section by a special row text
//     const firstCell = row[0]?.toString().toLowerCase() || "";

//     if (firstCell.includes("payment schedule")) {
//       isMonthlyPayments = true;
//       continue; // skip this row (title row)
//     }

//     if (isMonthlyPayments) {
//       // Monthly payments: expect [month, amount, date?, si number?, remarks?]
//       const month = row[0];
//       const amount = parseFloat(row[1]?.toString().replace(/,/g, "") || "");
//       const date = row[2] || null;
//       const remarks = row[4] || null;
//       const siNumber = row[3] || null;

//       if (!month || isNaN(amount)) continue;

//       await db.insert(MonthsInSoaTable).values({
//         applicants_id: applicantId,
//         month,
//         amount,
//         dateOfPayment: date,
//         remarks,
//         SInumber: siNumber,
//       });
//     } else {
//       // Before monthly payments: downpayment or installment scheme
//       // Expected: [installment scheme, amount, date, si number, remarks]
//       // const installmentScheme = row[0];
//       const amount = parseFloat(row[1]?.toString().replace(/,/g, "") || "");
//       const date = row[2];
//       const remarks = row[4] || null;
//       const siNumber = row[3] || null;

//       // Validate: must have valid date and amount for downpayment
//       if (!date || isNaN(amount)) continue;

//       if (isFirstPayment) {
//         await db.insert(downPaymentTable).values({
//           applicants_id: applicantId,
//           amount,
//           SINumberDP: siNumber,
//           remarksDP: remarks,
//         });
//         isFirstPayment = false;
//       }
//     }
//   }

//   return NextResponse.json({ success: true });
// }
