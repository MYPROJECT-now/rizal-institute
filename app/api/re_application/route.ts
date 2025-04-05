import { db } from '@/src/db/drizzle';
import { NextResponse } from 'next/server';
import { applicationStatusTable } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';

// Email sending function
async function sendEmail(to: string, trackingId: string) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Re-Application for Enrollment - Rizal Institute - Canlubang',
    text: `
    Your re-application has been received. Your tracking ID remains: ${trackingId}
    
    You can check the status of your application on our website.

    Best regards,  
    Rizal Institute - Canlubang Registrar Office
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  try {
    const { localTrackingId, email } = await request.json();

    // Ensure tracking ID exists
    if (!localTrackingId) {
      return NextResponse.json({ error: 'Tracking ID is required' }, { status: 400 });
    }

    // Update application status and date
    await db.update(applicationStatusTable)
      .set({ 
        applicationStatus: 'Pending', 
        dateOfApplication: new Date().toISOString().slice(0, 10) 
      })
      .where(eq(applicationStatusTable.trackingId, localTrackingId));

    // Send confirmation email
    await sendEmail(email, localTrackingId);

    return NextResponse.json({ trackingId: localTrackingId, applicationStatus: 'Pending' });

  } catch (error) {
    console.error('Error in re-application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
