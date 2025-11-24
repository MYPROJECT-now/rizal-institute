import { db } from '@/src/db/drizzle';
import { eq } from 'drizzle-orm';
import { 
  AdmissionStatusTable,
  applicantsInformationTable, 
  auditTrailsTable,
  downPaymentTable,
  enrollmentPayment, 

} from '@/src/db/schema';

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

// Fetch student email
async function getStudentEmail(lrn: number): Promise<string | null> {
  const result = await db
    .select({ email: applicantsInformationTable.email })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.lrn, String(lrn)))
    .limit(1);

  return result.length > 0 ? result[0].email : null;
}

async function getStudentID(lrn: number): Promise<number | null> {
  const result = await db
    .select({ applicants_id: applicantsInformationTable.applicants_id })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.lrn, String(lrn)))
    .limit(1);

  return result.length > 0 ? result[0].applicants_id : null;
}


// Email sender
async function sendReservationEmail(email: string, name: string) {
  const mailOptions = {
    from: process.env.Email_USER,
    to: email,
    subject: "Confirmation of Reserved Slot – Rizal Institute Canlubang",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: white; border-radius: 10px; padding: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <div style="text-align:center; margin-bottom: 20px;">
              <h2 style="color:#1a4d2e; margin:0; font-size:22px;">Reserved Slot Confirmed</h2>
          </div>

          <p style="font-size:15px; color:#333;">
            Dear <strong>${name}</strong>,
            <br><br>
            We are pleased to inform you that your payment has been 
            <strong>successfully verified</strong>.
          </p>

          <p style="font-size:14px; color:#555;">
            Your <strong>slot is now officially secured</strong>.  
            Our registrar will review and admit your application next.  
            Once admitted, you will receive another email containing your 
            <strong>student credentials and next steps</strong>.
          </p>

          <div style="text-align:center; margin: 25px 0;">
            <span style="display:inline-block; padding: 12px 20px; background:#1a4d2e; color:white; border-radius:8px; font-size:16px;">
              Thank you for choosing Rizal Institute - Canlubang
            </span>
          </div>

          <p style="font-size:14px; color:#555;">
            If you have any questions or concerns, feel free to contact our office.
          </p>

          <hr style="margin:25px 0; border:0; border-top:1px solid #e0e0e0;">

          <p style="font-size:12px; color:#777; text-align:center;">
            This is an automated message. Please do not reply.<br/>
            Rizal Institute - Canlubang © 2025
          </p>
        </div>
      </div>
    `,
    // attachments: [
    //   {
    //     filename: "logo.png",
    //     path: process.cwd() + "/public/logo.png",
    //     cid: "schoollogo",
    //   },
    // ],
  };

  return transporter.sendMail(mailOptions);
}


export async function POST(request: Request) {
  try {
    const { lrn, name } = await request.json();

    if (!lrn) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    const staff = await getStaffCredentials();
    if (!staff) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const SINumber = await generateSINumber();

    const applicants_id = await getStudentID(lrn);
    if (!applicants_id) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    // Run DB updates
    const [email, ] = await Promise.all([
      getStudentEmail(lrn),
      
      db.insert(auditTrailsTable).values({
        actionTaken: "Reservation Payment Confirmed",
        actionTakenFor: name,
        dateOfAction: new Date().toISOString(),
        username: staff.clerk_username,
        usertype: staff.userType,
        academicYear_id: await getAcademicYearID(),
      }),

      db.update(downPaymentTable)
        .set({
          SINumber: SINumber
        })
        .where(eq(downPaymentTable.applicants_id, applicants_id)),

      db.update(enrollmentPayment)
        .set({
          status: "Approved"
        })
        .where(eq(enrollmentPayment.applicants_id, applicants_id)),
      
      db.update(AdmissionStatusTable)
        .set({
          confirmationStatus: "Approved"
        })
        .where(eq(AdmissionStatusTable.applicants_id, applicants_id)),
    ]);

    if (!email) {
      return NextResponse.json({ error: "Email not found." }, { status: 404 });
    }


    await sendReservationEmail(email, name);


    return NextResponse.json({
      message: "Reservation payment accepted.",
      // reservationPaymentStatus: "Reserved",
      // dateApprovedByCashier,
    });

  } catch (error) {
    console.error("Error in reservation acceptance:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
