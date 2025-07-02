import { db } from '@/src/db/drizzle';
import { eq } from 'drizzle-orm';
import { applicantsInformationTable, applicationStatusTable, reservationFeeTable } from '@/src/db/schema';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

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

// Function to fetch tracking ID from applicationStatusTable
async function getTrackingId(studentId: number): Promise<string> {
  const result = await db
    .select({ trackingId: applicationStatusTable.trackingId })
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.applicants_id, studentId))
    .limit(1);

  return result.length > 0 ? result[0].trackingId : "N/A";
}

// Function to check if reservation fee is paid
async function checkReservationFee(studentId: number): Promise<boolean> {
  const result = await db
    .select()
    .from(reservationFeeTable)
    .where(eq(reservationFeeTable.applicants_id, studentId))
    .limit(1);

  return result.length > 0 && result[0].reservationReceipt !== null;
}

// Function to send reservation email
async function sendReservationEmail(email: string, trackingId: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation of Reservation at Rizal Institute - Canlubang',
    text: `
    Dear Applicant,

    We are pleased to inform you that your reservation for a slot at Rizal Institute - Canlubang has been successfully confirmed.

    Tracking ID: ${trackingId}

    Your spot has been secured, and we look forward to welcoming you to our community. 
    To complete your enrollment, please wait for the statement of account from our cashier. 
    You may choose to make a full payment or a down payment to secure your place.

    If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

    Next Steps:

    Wait for the statement of account from our cashier.
    Use the tracking ID to complete you payment.
    Make a full payment or down payment to secure your enrollment
    Contact our office for any further inquiries

    Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

    Best regards,
    Rizal Institute - Canlubang Registrar Office
    `,
  };

  return transporter.sendMail(mailOptions);
}

// Function to send reservation fee reminder email
async function sendReservationFeeReminderEmail(email: string, trackingId: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Important: Reservation Fee Required - Rizal Institute - Canlubang',
    text: `
    Dear Applicant,

    We would like to inform you that your application at Rizal Institute - Canlubang requires a reservation fee to be processed and secured.

    Tracking ID: ${trackingId}

    Important Notice:
    - Your application will not be processed or secured until the reservation fee is paid
    - Please use the tracking ID above to access the payment section on our website
    - The reservation fee is required to secure your slot in the institution

    Next Steps:
    1. Visit our website and use your tracking ID to access the payment section
    2. Complete the reservation fee payment
    3. Keep the payment receipt for your records
    4. Once payment is confirmed, you will receive a confirmation email

    If you have any questions or concerns, please do not hesitate to contact our office. We are here to assist you.

    Best regards,
    Rizal Institute - Canlubang Registrar Office
    `,
  };

  return transporter.sendMail(mailOptions);
}




export async function POST(request: Request) {
  try {
    const { studentId } = await request.json();

    if (!studentId) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    // Run all necessary DB actions in parallel — one fails, all fail
    const [email, trackingId, hasReservationFee, updateResult] = await Promise.all([
      getStudentEmail(studentId),
      getTrackingId(studentId),
      checkReservationFee(studentId),
      db.update(applicationStatusTable)
        .set({ applicationFormReviewStatus: "Reserved" })
        .where(eq(applicationStatusTable.applicants_id, studentId)),
    ]);

    // Check update result
    if (!email) {
      return NextResponse.json({ error: "Student email not found" }, { status: 404 });
    }

    if (updateResult.rowCount === 0) {
      return NextResponse.json({ error: "Failed to update application status." }, { status: 500 });
    }

    // Now send the appropriate email
    if (hasReservationFee) {
      await sendReservationEmail(email, trackingId);
      return NextResponse.json({ message: "Reservation confirmation email sent successfully." });
    } else {
      await sendReservationFeeReminderEmail(email, trackingId);
      return NextResponse.json({ message: "Reservation fee reminder email sent successfully." });
    }

  } catch (error) {
    console.error("Error in reservation flow:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
