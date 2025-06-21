import { db } from '@/src/db/drizzle';
import { eq } from 'drizzle-orm';
import { applicantsInformationTable, applicationStatusTable } from '@/src/db/schema';
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
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.id, studentId))
    .limit(1);

  return result.length > 0 ? result[0].email : null;
}

// Function to fetch tracking ID from applicationStatusTable
async function getTrackingId(studentId: number): Promise<string> {
  const result = await db
    .select({ trackingId: applicationStatusTable.trackingId })
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.id, studentId))
    .limit(1);

  return result.length > 0 ? result[0].trackingId : "N/A";
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

// API handler for sending reservation confirmation email
export async function POST(request: Request) {
  try {
    const { studentId } = await request.json();

    if (!studentId) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    // Fetch student data to check the status
    const student = await db
      .select()
      .from(applicationStatusTable)
      .where(eq(applicationStatusTable.id, studentId))
      .then((res) => res[0]);

    const applicationStatus = student?.applicationStatus;
    const reservationPaymentStatus = student?.reservationPaymentStatus;

    // Send email only if applicationStatus is "Ongoing"
    if (applicationStatus === "Reserved" && reservationPaymentStatus === "Reserved") {
      const email = await getStudentEmail(studentId);
      const trackingId = await getTrackingId(studentId);

      if (email) {
        await sendReservationEmail(email, trackingId);
        return NextResponse.json({ message: "Reservation confirmation email sent successfully." });
      } else {
        return NextResponse.json({ error: "Student email not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ message: "Application status is not Ongoing, no email sent." });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
