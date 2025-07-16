import { db } from '@/src/db/drizzle';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { applicantsInformationTable, applicationStatusTable, auditTrailsTable, Registrar_remaks_table } from '@/src/db/schema';
import nodemailer from 'nodemailer';
import { getAcademicYearID } from '@/src/actions/utils/academicYear';
import { getStaffCredentials } from '@/src/actions/utils/staffID';

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

// Function to send decline email
async function sendDeclineEmail(email: string, trackingId: string, remarks: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Enrollment Application Declined - Rizal Institute',
    text: `
    Dear Applicant,

    We regret to inform you that your application for enrollment at Rizal Institute - Canlubang has been declined.

    Tracking ID: ${trackingId}

    Remarks: ${remarks}

    Use the tracking ID provided to re-apply for enrollment on our website.
    Please comply with the note in the remarks section.

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
    const { studentId, remarks, fullName } = await request.json();

    if (!studentId || !remarks.trim()) {
      return NextResponse.json({ error: "Missing student ID or remarks" }, { status: 400 });
    }

    // Fetch student email
    const email = await getStudentEmail(studentId);
    if (!email) {
      return NextResponse.json({ error: "Student email not found" }, { status: 404 });
    }

    const credentials = await getStaffCredentials();
      if (!credentials) {
      return NextResponse.json({ error: "Unauthorized or invalid session." }, { status: 401 });
    }
    // Fetch tracking ID
    const trackingId = await getTrackingId(studentId);

    // Update student's status to "Declined"
    await db
      .update(applicationStatusTable)
      .set({ applicationFormReviewStatus: "Declined" })
      .where(eq(applicationStatusTable.applicants_id, studentId));

    const academicYearID = await getAcademicYearID();
    
    await db
      .insert(Registrar_remaks_table)
      .values({ 
        applicants_id: studentId, 
        academicYear_id: academicYearID,
        reg_remarks: remarks, 
        dateOfRemarks: new Date().toISOString() });

    await  db.insert(auditTrailsTable)
        .values({
        actionTaken: "Declined Documents and Information",
        actionTakenFor: fullName,
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })

    // Send decline email
    await sendDeclineEmail(email, trackingId, remarks);

    return NextResponse.json({ message: "Application declined and email sent successfully." });
  } catch (error) {
    console.error("Error processing decline:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
