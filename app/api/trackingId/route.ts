import { db } from '@/src/db/drizzle';
import { NextResponse } from 'next/server';
import { applicationStatusTable } from '@/src/db/schema';
import nodemailer from 'nodemailer';


// Random tracking ID generator
function generateRandomTrackingId(length = 12) {
    const charset = "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
  }

  // Email sending function
async function sendEmail(to:string, trackingId: string) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Application for Enrollment in Rizal Institute - Canlubang',
    text: `
    Thank you for submitting your application for enrollment in Rizal Institute - Canlubang. 
    We appreciate your interest in joining our academic community.

    To track the status of your application, please use the following tracking ID: ${trackingId}
    You can use this ID to check on the progress of your application on our website or by contacting our 
    admissions office.
    
    If you have any questions or concerns, please do not hesitate to reach out to us. 
    We look forward to reviewing your application.

    Best regards,
    Rizal Institute - Canlubang Registrar Office
    `,
  };

  return transporter.sendMail(mailOptions);
}

  

  export async function POST(request: Request) {
    const { email } = await request.json();
    const trackingId = generateRandomTrackingId();
    const applicationStatus = 'Pending'; // or some other default status
    const reservationPaymentStatus = 'Pending';

    await db.insert(applicationStatusTable).values({ trackingId, applicationStatus, reservationPaymentStatus, dateOfApplication: new Date().toISOString().slice(0, 10) });
        // Send the email with the password
    await sendEmail(email, trackingId);
    return NextResponse.json({ trackingId });
  }