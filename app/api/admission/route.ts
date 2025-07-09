import { db } from '@/src/db/drizzle';
import { eq } from 'drizzle-orm';
import { AdmissionStatusTable, applicantsInformationTable, ClerkUserTable, guardianAndParentsTable, StudentInfoTable } from '@/src/db/schema';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { getAcademicYearID } from '@/src/actions/utils/academicYear';

// Define Clerk error interface
interface ClerkError extends Error {
  status?: number;
  errors?: unknown[];
}

// Generate a random password
function generateRandomPassword(length = 12) {
  const charset = "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789@#$&*";
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
}

// Fetch student email
async function getStudentEmail(studentId: number): Promise<string | null> {
  const result = await db
    .select({ email: applicantsInformationTable.email })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.applicants_id, studentId))
    .limit(1);

  return result.length > 0 ? result[0].email : null;
}

// Fetch LRN
async function getLRN(studentId: number): Promise<string> {
  const result = await db
    .select({ lrn: applicantsInformationTable.lrn })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.applicants_id, studentId))
    .limit(1);

  return result.length > 0 ? result[0].lrn : "N/A";
}

// Fetch student name
async function getStudentName(studentId: number): Promise<{ lastName: string; firstName: string }> {
  const result = await db
    .select({
      applicantsLastName: applicantsInformationTable.applicantsLastName,
      applicantsFirstName: applicantsInformationTable.applicantsFirstName
    })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.applicants_id, studentId))
    .limit(1);

  return result.length > 0
    ? { lastName: result[0].applicantsLastName, firstName: result[0].applicantsFirstName }
    : { lastName: "N/A", firstName: "N/A" };
}

async function getApplicantInfo
  (studentId: number): Promise<{ 
    lrn: string;
    lastName: string; 
    firstName: string 
    middleName: string | null;
    suffix: string|  null;
    dateOfBirth: Date;
    age: number;
    gender: string;
    fullAddress: string | null;
  }> {

  const result = await db
    .select({
      lrn: applicantsInformationTable.lrn,
      applicantsLastName: applicantsInformationTable.applicantsLastName,
      applicantsFirstName: applicantsInformationTable.applicantsFirstName,
      applicantsMiddleName: applicantsInformationTable.applicantsMiddleName,
      applicantsSuffix: applicantsInformationTable.applicantsSuffix,
      dateOfBirth: applicantsInformationTable.dateOfBirth,  
      age: applicantsInformationTable.age,
      gender: applicantsInformationTable.gender,
      fullAddress: guardianAndParentsTable.fullAddress,

    })
    .from(applicantsInformationTable)
    .leftJoin(guardianAndParentsTable, eq(applicantsInformationTable.applicants_id, guardianAndParentsTable.applicants_id))
    .where(eq(applicantsInformationTable.applicants_id, studentId))
    .limit(1);

  return result.length > 0
    ? { 
      lrn: result[0].lrn,
      lastName: result[0].applicantsLastName, 
      firstName: result[0].applicantsFirstName,
      middleName: result[0].applicantsMiddleName,
      suffix: result[0].applicantsSuffix,
      dateOfBirth: new Date(result[0].dateOfBirth),
      age: result[0].age,
      gender: result[0].gender,
      fullAddress: result[0].fullAddress,
    }
    : { 
      lrn: "N/A", 
      lastName: "N/A", 
      firstName: "N/A",
      middleName: "N/A",
      suffix: "N/A",
      dateOfBirth: new Date(),
      age: 0,
      gender: "N/A",
      fullAddress: "N/A",};
}

// Send admission email
async function sendAdmissionEmail(
  email: string,
  firstName: string,
  lastName: string,
  lrn: string,
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
    subject: 'Congratulations on Your Successful Admission to Rizal Institute - Canlubang',
    text: `
    Dear ${firstName} ${lastName},

    We are pleased to inform you that your admission to Rizal Institute - Canlubang has been successfully confirmed.

    Congratulations on this achievement! We are thrilled to welcome you to our community.

    To access our online portal, please use the following credentials:
    Username: RIZAL-${lrn}
    Temporary Password: ${password}

    Please note that this is a temporary password and we strongly advise you to change it as soon as possible for security reasons.

    If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

    Next Steps:

    - Change your password as soon as possible.
    - Explore our online portal to access important information and resources.
    - Contact our office for any further inquiries.

    Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

    Best regards,
    Rizal Institute - Canlubang Registrar Office
    `,
  };

  await transporter.sendMail(mailOptions);
}

// API Handler
export async function POST(request: Request) {
  try {
    const { studentId } = await request.json();

    if (!studentId) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    const email = await getStudentEmail(studentId);
    if (!email) {
      return NextResponse.json({ error: "Student email not found" }, { status: 404 });
    }

    const lrn = await getLRN(studentId);
    const { firstName, lastName } = await getStudentName(studentId);
    const randomPassword = generateRandomPassword();
    const {
      middleName,
      suffix,
      dateOfBirth,
      age,
      gender,
      fullAddress
    } = await getApplicantInfo(studentId);

    // Create Clerk user
    const clerk = await clerkClient();
    
    console.log('Creating Clerk user with:', {
      username: `RIZAL-${lrn}`,
      email: email,
      firstName,
      lastName
    });
    
    let user;
    try {
      user = await clerk.users.createUser({
        username: `RIZAL-${lrn}`,
        password: randomPassword,
        emailAddress: [email],
        firstName,
        lastName,
        publicMetadata: {
          role: "student",
        }
      });
      
      console.log('Clerk user created successfully:', user.id);
    } catch (clerkError: unknown) {
      console.error('Clerk user creation failed:', {
        error: clerkError instanceof Error ? clerkError.message : 'Unknown error',
        status: (clerkError as ClerkError)?.status,
        errors: (clerkError as ClerkError)?.errors
      });
      throw clerkError;
    }

    // Update admission status
    await db
      .update(AdmissionStatusTable)
      .set({ 
        admissionStatus: "Enrolled",
        isActive: true,
        dateAdmitted: new Date().toISOString().split("T")[0],
      })
      .where(eq(AdmissionStatusTable.applicants_id, studentId));

    
      const academicYearID = await getAcademicYearID();
      
    // Insert student info
    await db
      .insert(StudentInfoTable)
      .values({
        applicants_id: studentId,
        academicYear_id: academicYearID,
        lrn,
        studentFirstName: firstName,
        studentMiddleName: middleName ?? undefined,
        studentLastName: lastName,
        studentSuffix: suffix ?? undefined,
        fullAddress: fullAddress ?? "",
        studentGender: gender,
        studentBirthDate: dateOfBirth.toISOString().split('T')[0],
        studentAge: age,
      });

    // Insert Clerk user reference
    await db.insert(ClerkUserTable).values({
      selected_AcademicYear_id: academicYearID,
      clerkId: user.id,
      applicants_id: studentId,
      userType: "student",
      clerk_username: `RIZAL-${lrn}`,
      clerk_email: email,
    });

    // Send admission email
    await sendAdmissionEmail(email, firstName, lastName, lrn, randomPassword);

    return NextResponse.json({ 
      message: "Student was successfully admitted and email sent successfully.",
      admissionStatus: "Enrolled", });
  } catch (error: unknown) {
    console.error("Admission process failed:", error);
    return NextResponse.json({ 
      error: "Failed to complete admission process", 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
