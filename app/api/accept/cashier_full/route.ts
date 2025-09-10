import { db } from '@/src/db/drizzle';
import { eq } from 'drizzle-orm';
import { AdmissionStatusTable, applicantsInformationTable, auditTrailsTable, fullPaymentTable } from '@/src/db/schema';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
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
// async function getStudentEmail(studentId: number): Promise<string | null> {
//   const result = await db
//     .select({ email: applicantsInformationTable.email })
//     .from(applicantsInformationTable)
//     .where(eq(applicantsInformationTable.applicants_id, studentId))
//     .limit(1);

//   return result.length > 0 ? result[0].email : null;
// }

// Function to fetch tracking ID from applicationStatusTable
// async function getTrackingId(studentId: number): Promise<string> {
//   const result = await db
//     .select({ trackingId: applicationStatusTable.trackingId })
//     .from(applicationStatusTable)
//     .where(eq(applicationStatusTable.applicants_id, studentId))
//     .limit(1);

//   return result.length > 0 ? result[0].trackingId : "N/A";
// }

// Function to send reservation email
async function sendReservationEmail(email: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation for Full Payment',
    text: `
    Dear Applicant,

    We are pleased to inform you that your payment was successfully received at Rizal Institute - Canlubang.

    Please wait for registrar to confirm your admission.
    You will be notified once the admission is confirmed along with your credentials for your portal.

    If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

    Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

    Best regards,
    Rizal Institute - Canlubang
    `,
  };

  return transporter.sendMail(mailOptions);
}

// API handler for sending reservation confirmation email
export async function POST(request: Request) {
  try {
    const { studentId,  name } = await request.json();

    if (!studentId) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    const credentials = await getStaffCredentials();
      if (!credentials) {
      return NextResponse.json({ error: "Unauthorized or invalid session." }, { status: 401 });
    }

    const getEmail = await db
      .select({ email: applicantsInformationTable.email })
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.applicants_id, studentId))
      .limit(1);

    const email = getEmail[0]?.email;


    await Promise.all([
      sendReservationEmail(email),
      db.update(AdmissionStatusTable)
        .set({
          confirmationStatus: "Approved",
          dateOfConfirmation: new Date().toISOString().slice(0, 10),
        })
        .where(eq(AdmissionStatusTable.applicants_id, studentId)),
      db.update(fullPaymentTable)
        .set({
            paymentStatus: "Approved",
        }),
      db.insert(auditTrailsTable)
        .values({
        actionTaken: "Full Payment Confirmed",
        actionTakenFor: name,
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })
    ]);

    return NextResponse.json({ message: "Payment Approved" }, { status: 200 });

  } catch (error) {
    console.error("Something went wrong:", error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
