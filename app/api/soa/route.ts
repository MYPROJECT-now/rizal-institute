  import { NextRequest, NextResponse } from "next/server";
  import * as XLSX from "xlsx";
  import { drizzle } from "drizzle-orm/neon-http";
  import { neon } from "@neondatabase/serverless";
  import {  applicantsInformationTable, applicationStatusTable, auditTrailsTable, tempdownPaymentTable, TempMonthsInSoaTable } from "@/src/db/schema";
  import { eq } from "drizzle-orm";
  import { getAcademicYearID } from "@/src/actions/utils/academicYear";
  import { getStaffCredentials } from "@/src/actions/utils/staffID";
  import nodemailer from 'nodemailer';
  

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  async function sendAdmissionEmail(
    email: string,  
    firstName: string,
    lastName: string,
    totalMonthlyDue: number,
    trackingId: string,
  ) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation of Payment Method at Rizal Institute - Canlubang',
      text: `
      Dear ${firstName} ${lastName},

      Your total tuition fee is: ₱${totalMonthlyDue.toFixed(2)}

      tracking ID: ${trackingId}

      You may choose to pay either in full or in installments.

      Next Steps:

      Visit our website and enter your tracking ID: ${trackingId}.

      Select your preferred payment option: full payment or installment plan.

      If you opt to pay in full, please provide your payment receipt.

      Wait for confirmation from the Registrar's Office. Once verified, you will receive a confirmation email along with your portal credentials.
  
      If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.
  
      Best regards,
      Rizal Institute - Canlubang Registrar Office
      `,
    };
  
    await transporter.sendMail(mailOptions);
  }

  export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const inputLrn = formData.get("lrn") as string;

    if (!file || !inputLrn) {
      return NextResponse.json({ success: false, error: "Missing file or LRN" }, { status: 400 });
    }

    const [student] = await db
      .select()
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, inputLrn));

    if (!student) {
      console.log("❌ No student found for LRN:", inputLrn);
      return NextResponse.json({ success: false, error: "No student found with this LRN" });
    }
      const credentials = await getStaffCredentials();
        if (!credentials) {
        return NextResponse.json({ success: false, error: "Unauthorized or invalid session." }, { status: 401 });
      }

    
    // const studentId = student.student_id;
    let applicantId = student.applicants_id;

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allRows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });




    let isMonthlyPayments = false;
    let hasStartedMonthly = false; 
    let downPaymentId: number | null = null;
    const academicYearID = await getAcademicYearID();
    let totalMonthlyDue = 0;


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
        // const remarks = row[4] || null;

        if (!month || isNaN(monthlyDue)) continue;
        if (!month) {
          console.log("⏭️ Skipping row: missing month", row);
          continue;
        }

        totalMonthlyDue += monthlyDue;

        if (!downPaymentId) {
          return NextResponse.json({ error: "Down payment must be inserted before monthly payments" }, { status: 400 });
        }
        
        // const siNumber2 = await generateSINumber();
        // let siNumber2: string | null = null;
        // let amoundPaid = 0;
        if (!isNaN(monthlyDue) && date) {
          // siNumber2 = await generateSINumber();
          // amoundPaid = monthlyDue;
        }

        if(!applicantId){
          applicantId = 1;
        }

        await db.insert(TempMonthsInSoaTable).values({
          applicants_id: applicantId,
          academicYear_id: academicYearID,
          temp_month: month,
          temp_monthlyDue: monthlyDue,
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
        // const siNumber1 = await generateSINumber(); // ✅ only if valid row
        console.log("💰 Inserting down payment row:", row);

        const inserted = await db.insert(tempdownPaymentTable)
          .values({
            applicants_id: applicantId,
            academicYear_id: academicYearID,
            amount,
            downPaymentDate: date,
            remarksDP: remarks,
          })
          .returning({ id: tempdownPaymentTable.temp_down_id });

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
        const info = await db
        .select({
          firstName: applicantsInformationTable.applicantsFirstName,
          lastName: applicantsInformationTable.applicantsLastName,
          email: applicantsInformationTable.email,
          trackingId: applicationStatusTable.trackingId,
        })
        .from(applicantsInformationTable)
        .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
        .where(eq(applicantsInformationTable.lrn, inputLrn))
        .limit(1);

        const email = info[0].email;
        const firstName = info[0].firstName;
        const lastName = info[0].lastName;
        let trackingId = info[0].trackingId;

        if (!trackingId) {
          trackingId = "1111";
        }


      await sendAdmissionEmail(email, firstName, lastName, totalMonthlyDue, trackingId );
    return NextResponse.json({ success: true, message: "SOA uploaded successfully." });
  }
