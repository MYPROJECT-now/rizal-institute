import { db } from '@/src/db/drizzle';
import { NextResponse } from 'next/server';
import {eq } from 'drizzle-orm';
import { applicantsInformationTable, auditTrailsTable, MonthlyPayementTable } from '@/src/db/schema';
import nodemailer from 'nodemailer';
import { getStaffCredentials } from '@/src/actions/utils/staffID';
import { getAcademicYearID } from '@/src/actions/utils/academicYear';

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to fetch student email from guardianAndParentsTable
async function getStudentEmail(lrn: string): Promise<string | null> {
  const result = await db
    .select({ email: applicantsInformationTable.email })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.lrn, lrn))
    .limit(1);

  return result.length > 0 ? result[0].email : null;
}



// Function to send decline email
async function sendDeclineEmail(email: string,  remarks: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Monthly Tuition Payment Declined - Rizal Institute',
    text: `
    Dear Student,

    We regret to inform you that your payment for this months tuition at Rizal Institute - Canlubang has been declined.

    Remarks: ${remarks}
    Please refer to the remarks above for more details regarding the decline.

    If you have any further inquiries, feel free to contact our office.

    Best regards,
    Rizal Institute - Canlubang Registrar Office
    `,
  };

  return transporter.sendMail(mailOptions);
}

// API handler for declining an application
export async function POST(request: Request) {
  try {
    const { lrn, month_id, remarks } = await request.json();

    if (!lrn || !remarks.trim()) {
      return NextResponse.json({ error: "Missing student ID or remarks" }, { status: 400 });
    }

    // Fetch student email
    const email = await getStudentEmail(lrn);
    if (!email) {
      return NextResponse.json({ error: "Student email not found" }, { status: 404 });
    }

    // Fetch tracking ID
    const credentials = await getStaffCredentials();
      if (!credentials) {
      return NextResponse.json({ error: "Unauthorized or invalid session." }, { status: 401 });
    }

    // Update student's status to "Declined"
    await db.update(MonthlyPayementTable)
    .set({ status: 'Declined' })
    .where(eq(MonthlyPayementTable.month_id, month_id));


    await db
      .insert(auditTrailsTable)
      .values({
        username: credentials.clerk_username,
        usertype: credentials.userType,
        actionTaken: "Payment Declined",
        dateOfAction: new Date().toISOString(),
        actionTakenFor: lrn,
        academicYear_id: await getAcademicYearID(),
    });

        
    // Send decline email
    await sendDeclineEmail(email, remarks);

    return NextResponse.json({ message: "Monthly payment declined and email sent successfully." });
  } catch (error) {
    console.error("Error processing decline:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
