
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { getAcademicYearID } from '@/src/actions/utils/academicYear';
import { auditTrailsTable, ClerkUserTable, staffClerkUserTable, StudentInfoTable } from '@/src/db/schema';
import { db } from '@/src/db/drizzle';
import { eq } from 'drizzle-orm';



// Generate a random password
function generateRandomPassword(length = 12) {
  const charset = "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789@#$&*";
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
}


// Send admission email
async function sendAdmissionEmail(
  email: string,
  username: string,
  password: string
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
    subject: 'Congratulations on Your Account was created succesfully',
    text: `
    Dear ${username},

    We are pleased to inform you that your account at Rizal Institute - Canlubang has been successfully created.
    
    We are thrilled to welcome you to our community.

    To access our online portal, please use the following credentials:
    Username: RIZAL-${username}
    Temporary Password: ${password}

    Please note that this is a temporary password and we strongly advise you to change it as soon as possible for security reasons.

    Best regards,
    Rizal Institute - Canlubang Admin Office
    `,
  };

  await transporter.sendMail(mailOptions);
}

// API Handler
export async function POST(request: Request) {
  try {
    const { role, username, email } = await request.json();
    const randomPassword = generateRandomPassword();
    const clerk = await clerkClient();


    // 1. Create Clerk user
    const user = await clerk.users.createUser({
      username: `RIZAL-${username}`,
      password: randomPassword,
      emailAddress: [email],
      firstName: username,
      publicMetadata: {
        role: role,
      },
    });

    const academicYearID = await getAcademicYearID();

    // 2. Insert into DB (simulated transaction)
    try {
      if (role === "student") {
        const getStudentId = await db
          .select({
            student_id: StudentInfoTable.student_id,
            applicants_id: StudentInfoTable.applicants_id
          })
          .from(StudentInfoTable)
          .where(eq(StudentInfoTable.lrn, username))
          .limit(1);
          
          const studentId = getStudentId[0]?.student_id ?? 0;
          const applicantsId = getStudentId[0]?.applicants_id ?? 0;


        await db.insert(ClerkUserTable).values({
          selected_AcademicYear_id: academicYearID,
          student_id: studentId,
          applicants_id: applicantsId,
          clerkId: user.id,
          userType: role,
          clerk_username: username,
          clerk_email: email,
        });
      } else {
        await db.insert(staffClerkUserTable).values({
          selected_AcademicYear_id: academicYearID,
          clerkId: user.id,
          userType: role,
          clerk_username: `RIZAL-${username}`,
          clerk_email: email,
        });
      }
    } catch (dbError) {
      // If DB insert fails, delete the Clerk user to avoid orphaned record
      await clerk.users.deleteUser(user.id);
      throw dbError;
    }

    // 3. Send Email
    try {
      await sendAdmissionEmail(email, username, randomPassword);
    } catch (emailError) {
      // If email fails, also rollback user + db manually
      await clerk.users.deleteUser(user.id);

      // Delete from DB
      if (role === "student") {
        await db.delete(ClerkUserTable).where(eq(ClerkUserTable.clerkId, user.id));
      } else {
        await db.delete(staffClerkUserTable).where(eq(staffClerkUserTable.clerkId, user.id));
      }

      throw emailError;
    }

    await db
      .insert(auditTrailsTable)
      .values({
        username: username,
        usertype: role,
        actionTaken: "Account Created",
        dateOfAction: new Date().toISOString(),
        actionTakenFor: username,
        academicYear_id: await getAcademicYearID(),
    });

    return NextResponse.json({
      message: "Account was successfully created and the email was sent successfully.",
    });

  } catch (error: unknown) {
    console.error("Admission process failed:", error);
    return NextResponse.json({
      error: "Failed to complete admission process",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
