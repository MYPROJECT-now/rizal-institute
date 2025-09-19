import { db } from '@/src/db/drizzle';
import { and, desc, eq } from 'drizzle-orm';
import { AdmissionStatusTable, applicantsInformationTable, auditTrailsTable, ClerkUserTable, educationalBackgroundTable, GradeLevelTable, guardianAndParentsTable, SectionTable, StudentGradesTable, StudentInfoTable, StudentPerGradeAndSection, SubjectTable } from '@/src/db/schema';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { getAcademicYearID } from '@/src/actions/utils/academicYear';
import { getStaffCredentials } from '@/src/actions/utils/staffID';

// Define Clerk error interface
// interface ClerkError extends Error {
//   status?: number;
//   errors?: unknown[];
// }

// Generate a random password
function generateRandomPassword(length = 12) {
  const charset = "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789@#$&*";
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
}

// Fetch student email
async function getStudentEmail(applicantId: number): Promise<string | null> {
  const result = await db
    .select({ email: applicantsInformationTable.email })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.applicants_id, applicantId))
    .limit(1);

  return result.length > 0 ? result[0].email : null;
}

// Fetch LRN
async function getLRN(applicantId: number): Promise<string> {
  const result = await db
    .select({ lrn: applicantsInformationTable.lrn })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.applicants_id, applicantId))
    .limit(1);

  return result.length > 0 ? result[0].lrn : "N/A";
}

// Fetch student name
async function getStudentName(applicantId: number): Promise<{ lastName: string; firstName: string }> {
  const result = await db
    .select({
      applicantsLastName: applicantsInformationTable.applicantsLastName,
      applicantsFirstName: applicantsInformationTable.applicantsFirstName
    })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.applicants_id, applicantId))
    .limit(1);

  return result.length > 0
    ? { lastName: result[0].applicantsLastName, firstName: result[0].applicantsFirstName }
    : { lastName: "N/A", firstName: "N/A" };
}

async function getApplicantInfo
  (studentId: number): Promise<{ 
    applicantId: number;
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
      applicantId: applicantsInformationTable.applicants_id,
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
      applicantId: result[0].applicantId,
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
      applicantId: 0,
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

// // API Handler
// export async function POST(request: Request) {
//   try {
//     const { applicantId, name } = await request.json();

//     if (!applicantId) {
//       return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
//     }

//     const email = await getStudentEmail(applicantId);
//     if (!email) {
//       return NextResponse.json({ error: "Student email not found" }, { status: 404 });
//     }

//     const lrn = await getLRN(applicantId);
//     const { firstName, lastName } = await getStudentName(applicantId);
//     const randomPassword = generateRandomPassword();
//     const {
//       middleName,
//       suffix,
//       dateOfBirth,
//       age,
//       gender,
//       fullAddress
//     } = await getApplicantInfo(applicantId);

//     // Create Clerk user
//     const clerk = await clerkClient();
    
//     console.log('Creating Clerk user with:', {
//       username: `RIZAL-${lrn}`,
//       email: email,
//       firstName,
//       lastName
//     });
    
    
//   const credentials = await getStaffCredentials();
//     if (!credentials) {
//       return NextResponse.json({ error: "Unauthorized or invalid session." }, { status: 401 });
//     }
    
    
//     let user;
//     try {
//       user = await clerk.users.createUser({
//         username: `RIZAL-${lrn}`,
//         password: randomPassword,
//         emailAddress: [email],
//         firstName,
//         lastName,
//         publicMetadata: {
//           role: "student",
//         },
//       });
      
//       console.log('Clerk user created successfully:', user.id);
//     } catch (clerkError: unknown) {
//       console.error('Clerk user creation failed:', {
//         error: clerkError instanceof Error ? clerkError.message : 'Unknown error',
//         status: (clerkError as ClerkError)?.status,
//         errors: (clerkError as ClerkError)?.errors
//       });
//       throw clerkError;
//     }

//     // Update admission status
//     await db
//       .update(AdmissionStatusTable)
//       .set({ 
//         admissionStatus: "Enrolled",
//         isActive: true,
//         dateAdmitted: new Date().toISOString().split("T")[0],
//       })
//       .where(eq(AdmissionStatusTable.applicants_id, applicantId));

    
//       const academicYearID = await getAcademicYearID();
      
//     // Insert student info
//     const [insertStudent] = await db
//       .insert(StudentInfoTable)
//       .values({
//         applicants_id: applicantId,
//         lrn,
//         studentFirstName: firstName,
//         studentMiddleName: middleName ?? undefined,
//         studentLastName: lastName,
//         studentSuffix: suffix ?? undefined,
//         fullAddress: fullAddress ?? "",
//         studentGender: gender,
//         studentBirthDate: dateOfBirth.toISOString().split('T')[0],
//         studentAge: age,
//       })
//       .returning({ id: StudentInfoTable.student_id});

//       const student_id = insertStudent.id;

//     // Insert Clerk user reference
//     await db.insert(ClerkUserTable).values({
//       selected_AcademicYear_id: academicYearID,
//       clerkId: user.id,
//       applicants_id: applicantId,
//       student_id: student_id,
//       userType: "student",
//       clerk_username: `RIZAL-${lrn}`,
//       clerk_email: email,
//     });

//     await  db.insert(auditTrailsTable)
//         .values({
//         actionTaken: "Applicant was admitted",
//         actionTakenFor: name,
//         dateOfAction: new Date().toISOString(),
//         username: credentials.clerk_username,
//         usertype: credentials.userType,
//         academicYear_id: await getAcademicYearID(),
//       })

//     // Send admission email
//     await sendAdmissionEmail(email, firstName, lastName, lrn, randomPassword);

//     return NextResponse.json({ 
//       message: "Student was successfully admitted and email sent successfully.",
//       admissionStatus: "Enrolled", });
//   } catch (error: unknown) {
//     console.error("Admission process failed:", error);
//     return NextResponse.json({ 
//       error: "Failed to complete admission process", 
//       details: error instanceof Error ? error.message : 'Unknown error'
//     }, { status: 500 });
//   }
// }


export async function POST(request: Request) {
  try {
    const { applicantId, name } = await request.json();

    if (!applicantId) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    const email = await getStudentEmail(applicantId);
    if (!email) {
      return NextResponse.json({ error: "Student email not found" }, { status: 404 });
    }

    const lrn = await getLRN(applicantId);
    const { firstName, lastName } = await getStudentName(applicantId);
    const randomPassword = generateRandomPassword();
    const {
      middleName,
      suffix,
      dateOfBirth,
      age,
      gender,
      fullAddress
    } = await getApplicantInfo(applicantId);

    const clerk = await clerkClient();
    const credentials = await getStaffCredentials();
    if (!credentials) {
      return NextResponse.json({ error: "Unauthorized or invalid session." }, { status: 401 });
    }

    // Create Clerk user
    const user = await clerk.users.createUser({
      username: `RIZAL-${lrn}`,
      password: randomPassword,
      emailAddress: [email],
      firstName,
      lastName,
      publicMetadata: { role: "student" },
    });

    // Update admission status
    await db.update(AdmissionStatusTable)
      .set({
        admissionStatus: "Enrolled",
        isActive: true,
        dateAdmitted: new Date().toISOString().split("T")[0],
      })
      .where(eq(AdmissionStatusTable.applicants_id, applicantId));

    const academicYearID = await getAcademicYearID();

    // Insert into StudentInfoTable
    const [insertStudent] = await db.insert(StudentInfoTable).values({
      applicants_id: applicantId,
      lrn,
      studentFirstName: firstName,
      studentMiddleName: middleName ?? undefined,
      studentLastName: lastName,
      studentSuffix: suffix ?? undefined,
      fullAddress: fullAddress ?? "",
      studentGender: gender,
      studentBirthDate: dateOfBirth.toISOString().split('T')[0],
      studentAge: age,
    }).returning({ id: StudentInfoTable.student_id });

    const student_id = insertStudent.id;

    // Insert into ClerkUserTable
    await db.insert(ClerkUserTable).values({
      selected_AcademicYear_id: academicYearID,
      clerkId: user.id,
      applicants_id: applicantId,
      student_id: student_id,
      userType: "student",
      clerk_username: `RIZAL-${lrn}`,
      clerk_email: email,
    });

    // Get grade level
    const gradeLevelResult = await db
      .select({ gradeLevel: educationalBackgroundTable.gradeLevel })
      .from(educationalBackgroundTable)
      .where(eq(educationalBackgroundTable.applicants_id, applicantId))
      .limit(1);

    const gradeLevelName = gradeLevelResult[0]?.gradeLevel;
    if (!gradeLevelName) {
      throw new Error("Grade level not found for applicant");
    }

    // Get gradeLevel_id
    const gradeLevelRow = await db
      .select({ id: GradeLevelTable.gradeLevel_id })
      .from(GradeLevelTable)
      .where(eq(GradeLevelTable.gradeLevelName, gradeLevelName))
      .limit(1);

    const gradeLevel_id = gradeLevelRow[0]?.id;
    if (!gradeLevel_id) {
      throw new Error(`Grade level ID not found for "${gradeLevelName}"`);
    }

    // Get all subjects
    const subjects = await db.select().from(SubjectTable);

    // Prepare and insert StudentGrades
    const gradeEntries = subjects.map(subject => ({
      student_id,
      academicYear_id: academicYearID,
      gradeLevel_id,
      subject_id: subject.subject_id,
      finalGrade: null,
      remarks: null,
    }));

    await db.insert(StudentGradesTable).values(gradeEntries);

  
    const sectionData = await db
      .select({
        section_id: SectionTable.section_id,
        sectionName: SectionTable.sectionName,
        limit: SectionTable.limit,
        gradeLevel_id: SectionTable.gradeLevel_id,
      })
      .from(SectionTable)
      .where(
        and(
          eq(SectionTable.gradeLevel_id, gradeLevel_id),
          eq(SectionTable.academicYear_id, academicYearID)
        )
      )
      .orderBy(desc(SectionTable.section_id)) // get the latest section for that grade/year
      .limit(1);

    let newSectionCount = 1;
    const limitCount = 40; // capacity per section test
    // let limitCount = 1;
    const limit = limitCount - 1; // default for a new section
    let section_id = 1;

    if (sectionData.length === 0) {
      // no section yet → create Section 1
      const sectionData2 = await db.insert(SectionTable).values({
        sectionName: "Section " + newSectionCount,
        gradeLevel_id,
        academicYear_id: academicYearID,
        limit: limit,
      }).returning({ section_id: SectionTable.section_id });

      section_id = sectionData2[0].section_id;
    } else {
      const currentSection = sectionData[0];

      // check if current section still has capacity
      if (currentSection.limit > 0) {
        // just decrement the current section's limit
        await db.update(SectionTable)
          .set({ limit: currentSection.limit - 1 })
          .where(eq(SectionTable.section_id, currentSection.section_id))

        section_id = currentSection.section_id;
      } else {
        // full → open a new section
        const match = currentSection.sectionName.match(/Section (\d+)/);
        newSectionCount = match ? parseInt(match[1]) + 1 : 2;

        const sectionData3 = await db.insert(SectionTable).values({
          sectionName: "Section " + newSectionCount,
          gradeLevel_id,
          academicYear_id: academicYearID,
          limit: limit,
        }).returning({ section_id: SectionTable.section_id });

        section_id = sectionData3[0].section_id;
      }
    }

    await db
    .insert(StudentPerGradeAndSection)
    .values({
      student_id,
      academicYear_id: academicYearID,
      gradeLevel_id,
      section_id: section_id, 
    });
    
    // Insert audit trail
    await db.insert(auditTrailsTable).values({
      actionTaken: "Applicant was admitted",
      actionTakenFor: name,
      dateOfAction: new Date().toISOString(),
      username: credentials.clerk_username,
      usertype: credentials.userType,
      academicYear_id: academicYearID,
    });

    // Send Email
    await sendAdmissionEmail(email, firstName, lastName, lrn, randomPassword);

    return NextResponse.json({
      message: "Student was successfully admitted and email sent successfully.",
      admissionStatus: "Enrolled",
    });
  } catch (error: unknown) {
    console.error("Admission process failed:", error);
    return NextResponse.json({
      error: "Failed to complete admission process",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
