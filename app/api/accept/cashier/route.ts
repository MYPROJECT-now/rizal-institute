import { db } from '@/src/db/drizzle';
import { eq } from 'drizzle-orm';
import { applicantsInformationTable, applicationStatusTable, auditTrailsTable, ReceiptInfoTable, reservationFeeTable } from '@/src/db/schema';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { getStaffCredentials } from '@/src/actions/utils/staffID';
import { getAcademicYearID } from '@/src/actions/utils/academicYear';
import { generateSINumber } from '@/src/actions/utils/SI_Number_counter';

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to fetch student email from guardianAndParentsTable
async function getStudentEmail(studentId: number): Promise<string | null> {
  const result = await db
    .select({ email: applicantsInformationTable.email })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.applicants_id, studentId))
    .limit(1);

  return result.length > 0 ? result[0].email : null;
}


async function sendReservationEmail(email: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation of Reservation at Rizal Institute - Canlubang',
    text: `
    Dear Applicant,

    We are pleased to inform you that your reservation for a slot at Rizal Institute - Canlubang has been successfully confirmed.

    Your spot has been secured, and we look forward to welcoming you to our community. 
    
    Our cashier is now calculating your tuition. You will be notified once the it is calculated.
    After that you can either choose to pay in full or pay in installments.
    You can do that by going on the website, click the track application button, enter you tracking ID, and then select your payment method.


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

    // Get applicationStatus first
    const applicationFormReviewStatusResult = await db
      .select({ applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus })
      .from(applicationStatusTable)
      .where(eq(applicationStatusTable.applicants_id, studentId))
      .limit(1);

    const applicationFormReviewStatus = applicationFormReviewStatusResult[0].applicationFormReviewStatus || null;
    const credentials = await getStaffCredentials();
      if (!credentials) {
      return NextResponse.json({ error: "Unauthorized or invalid session." }, { status: 401 });
    }

    const SINumber = await generateSINumber();
    // Run DB actions in parallel
    const [email, updateResult] = await Promise.all([
      getStudentEmail(studentId),
      // getTrackingId(studentId),
      db.update(applicationStatusTable)
        .set({ 
          reservationPaymentStatus: "Reserved",
          dateApprovedByCashier: new Date().toISOString(),
        })
        .where(eq(applicationStatusTable.applicants_id, studentId)),
      db.insert(auditTrailsTable)
        .values({
        actionTaken: "Reservation Payment Confirmed",
        actionTakenFor: name,
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      }),
      db.update(reservationFeeTable)
        .set({
          SINumber: SINumber
        })
      .where(eq(applicationStatusTable.applicants_id, studentId)),
      db.update(ReceiptInfoTable)
        .set({
          latestSINumber: SINumber
        })
    ]);

    if (!email) {
      return NextResponse.json({ error: "Student email not found" }, { status: 404 });
    }

    if (updateResult.rowCount === 0) {
      return NextResponse.json({ error: "Failed to update application status." }, { status: 500 });
    }

    const dateApprovedByCashier = new Date().toISOString().split('T')[0];;

    // ✅ Only send email if cashier confirmed the reservation
    if (applicationFormReviewStatus === "Reserved") {
      await sendReservationEmail(email);
      return NextResponse.json({
        message: "Reservation Payment was approved and confirmation email sent successfully.",
        reservationPaymentStatus: "Reserved",
        dateApprovedByCashier: dateApprovedByCashier,
      });
    }

    // ❌ Do not send email if pending
    return NextResponse.json({
      message: "Reservation Payement was accepted successfully.",
      reservationPaymentStatus: "Reserved",
      dateApprovedByCashier: dateApprovedByCashier,
    });

  } catch (error) {
    console.error("Error in reservation flow:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
