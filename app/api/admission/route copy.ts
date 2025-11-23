// import { db } from '@/src/db/drizzle';
// import { and, desc, eq } from 'drizzle-orm';
// import { AdmissionStatusTable, applicantsInformationTable, auditTrailsTable, ClerkUserTable, GradeLevelTable, guardianAndParentsTable, RoomTable, SectionTable, StudentGradesTable, StudentInfoTable, StudentPerGradeAndSection, studentTypeTable, SubjectTable } from '@/src/db/schema';
// import nodemailer from 'nodemailer';
// import { NextResponse } from 'next/server';
// import { clerkClient } from '@clerk/nextjs/server';
// import { getAcademicYearID } from '@/src/actions/utils/academicYear';
// import { getStaffCredentials } from '@/src/actions/utils/staffID';
// import { getSelectedYear } from '@/src/actions/utils/getSelectedYear';

// // Define Clerk error interface
// // interface ClerkError extends Error {
// //   status?: number;
// //   errors?: unknown[];
// // }

// // Generate a random password
// function generateRandomPassword(length = 12) {
//   const charset = "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789@#$&*";
//   return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
// }

// // Fetch student email
// async function getStudentEmail(applicantId: number): Promise<string | null> {
//   const result = await db
//     .select({ email: applicantsInformationTable.email })
//     .from(applicantsInformationTable)
//     .where(eq(applicantsInformationTable.applicants_id, applicantId))
//     .limit(1);

//   return result.length > 0 ? result[0].email : null;
// }

// // Fetch LRN
// async function getLRN(applicantId: number): Promise<string> {
//   const result = await db
//     .select({ lrn: applicantsInformationTable.lrn })
//     .from(applicantsInformationTable)
//     .where(eq(applicantsInformationTable.applicants_id, applicantId))
//     .limit(1);

//   return result.length > 0 ? result[0].lrn : "N/A";
// }

// // Fetch student name
// async function getStudentName(applicantId: number): Promise<{ lastName: string; firstName: string }> {
//   const result = await db
//     .select({
//       applicantsLastName: applicantsInformationTable.applicantsLastName,
//       applicantsFirstName: applicantsInformationTable.applicantsFirstName
//     })
//     .from(applicantsInformationTable)
//     .where(eq(applicantsInformationTable.applicants_id, applicantId))
//     .limit(1);

//   return result.length > 0
//     ? { lastName: result[0].applicantsLastName, firstName: result[0].applicantsFirstName }
//     : { lastName: "N/A", firstName: "N/A" };
// }


// async function getApplicantInfo
//   (
//     studentId: number, 
//     academicYearID: number
//   ): Promise<{ 
//     applicantId: number;
//     lrn: string;
//     lastName: string; 
//     firstName: string 
//     middleName: string | null;
//     suffix: string|  null;
//     dateOfBirth: Date;
//     age: number;
//     gender: string;
//     religion: string;
//     ip: string | null;
//     house_no_purok: string;
//     barangay: string;
//     city: string;
//     province: string;
//     motherTounge: string;
//     studenType: string | null;
//   }> {

//   const result = await db
//     .select({
//       applicantId: applicantsInformationTable.applicants_id,
//       lrn: applicantsInformationTable.lrn,
//       applicantsLastName: applicantsInformationTable.applicantsLastName,
//       applicantsFirstName: applicantsInformationTable.applicantsFirstName,
//       applicantsMiddleName: applicantsInformationTable.applicantsMiddleName,
//       applicantsSuffix: applicantsInformationTable.applicantsSuffix,
//       dateOfBirth: applicantsInformationTable.dateOfBirth,  
//       age: applicantsInformationTable.age,
//       gender: applicantsInformationTable.gender,
//       religion: applicantsInformationTable.religion,
//       ip: applicantsInformationTable.ip,
//       house_no_purok: applicantsInformationTable.house_no_purok,
//       barangay: applicantsInformationTable.barangay,
//       city: applicantsInformationTable.city,
//       province: applicantsInformationTable.province,
//       motherTounge: applicantsInformationTable.motherTounge,
//       studenType: studentTypeTable.studentType,

//     })
//     .from(applicantsInformationTable)
//     .leftJoin(guardianAndParentsTable, eq(applicantsInformationTable.applicants_id, guardianAndParentsTable.applicants_id))
//     .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
//     .where(and(
//       eq(applicantsInformationTable.applicants_id, studentId),
//       eq(studentTypeTable.academicYear_id, academicYearID)
//     ))
//     .limit(1);

//   return result.length > 0
//     ? { 
//       applicantId: result[0].applicantId,
//       lrn: result[0].lrn,
//       lastName: result[0].applicantsLastName, 
//       firstName: result[0].applicantsFirstName,
//       middleName: result[0].applicantsMiddleName,
//       suffix: result[0].applicantsSuffix,
//       dateOfBirth: new Date(result[0].dateOfBirth),
//       age: result[0].age,
//       gender: result[0].gender,
//       religion: result[0].religion,
//       ip: result[0].ip,
//       house_no_purok: result[0].house_no_purok,
//       barangay: result[0].barangay,
//       city: result[0].city,
//       province: result[0].province,
//       motherTounge: result[0].motherTounge,
//       studenType: result[0].studenType
//     }
//     : { 
//       applicantId: 0,
//       lrn: "N/A", 
//       lastName: "N/A", 
//       firstName: "N/A",
//       middleName: "N/A",
//       suffix: "N/A",
//       dateOfBirth: new Date(),
//       age: 0,
//       gender: "N/A",
//       religion: "N/A",
//       ip: "N/A",
//       house_no_purok: "N/A",
//       barangay: "N/A",
//       city: "N/A",
//       province: "N/A",
//       motherTounge: "N/A",
//       studenType: "N/A" 
//   };
// }

// // Send admission email


// async function sendAdmissionEmail(
//   email: string,
//   firstName: string,
//   lastName: string,
//   lrn: string,
//   password: string
// ) {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER!,
//       pass: process.env.EMAIL_PASS!,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Congratulations on Your Successful Admission to Rizal Institute - Canlubang',
//     text: `
//     Dear ${firstName} ${lastName},

//     We are pleased to inform you that your admission to Rizal Institute - Canlubang has been successfully confirmed.

//     Congratulations on this achievement! We are thrilled to welcome you to our community.

//     To access our online portal, please use the following credentials:
//     Username: RIZAL-${lrn}
//     Temporary Password: ${password}

//     Please note that this is a temporary password and we strongly advise you to change it as soon as possible for security reasons.

//     If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

//     Next Steps:

//     - Change your password as soon as possible.
//     - Explore our online portal to access important information and resources.
//     - Contact our office for any further inquiries.

//     Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

//     Best regards,
//     Rizal Institute - Canlubang Registrar Office
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// }

// async function sendAdmissionEmailOldStudent(
//   email: string,
//   firstName: string,
//   lastName: string
// ) {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER!,
//       pass: process.env.EMAIL_PASS!,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Welcome Back to Rizal Institute - Canlubang!',
//     text: `
//     Dear ${firstName} ${lastName},

//     We are pleased to inform you that your admission to Rizal Institute - Canlubang has been successfully confirmed.

//     Welcome back! We are delighted to have you continue your academic journey with us this school year.

//     As a returning student, you may continue using your existing account to access our online portal for updates, schedules, and other important announcements.

//     Thank you for your continued trust in Rizal Institute - Canlubang. We look forward to another successful year together!

//     Best regards,
//     Rizal Institute - Canlubang Registrar Office
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// }



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
    
//     const selectedYear = await getSelectedYear();
//     if (!selectedYear) {
//       return NextResponse.json({ error: "No selected academic year found." }, { status: 400 });
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
//       studenType,
//       religion,
//       ip,
//       house_no_purok,
//       barangay,
//       city,
//       province,
//       motherTounge
//     } = await getApplicantInfo(applicantId, selectedYear);

//     const clerk = await clerkClient();
//     const credentials = await getStaffCredentials();
//     if (!credentials) {
//       return NextResponse.json({ error: "Unauthorized or invalid session." }, { status: 401 });
//     }
    
//       let userId: string | null = null;

//     // Create Clerk user
//     if (studenType !== "Old Student") {
//       const user = await clerk.users.createUser({
//         username: `RIZAL-${lrn}`,
//         password: randomPassword,
//         emailAddress: [email],
//         firstName,
//         lastName,
//         publicMetadata: { role: "student" },
//       });
      
//       userId = user.id;

//     }

//     // Update admission status
//     await db.update(AdmissionStatusTable)
//       .set({
//         admissionStatus: "Enrolled",
//         isActive: true,
//         dateAdmitted: new Date().toISOString().split("T")[0],
//       })
//       .where(eq(AdmissionStatusTable.applicants_id, applicantId));

//     const academicYearID = await getAcademicYearID();
  
    
//     let student_id: number | null = null;

//     // Insert into StudentInfoTable
//     if (studenType !== "Old Student") {
//       const [insertStudent] = await db.insert(StudentInfoTable).values({
//       applicants_id: applicantId,
//       lrn,
//       studentFirstName: firstName,
//       studentMiddleName: middleName ?? undefined,
//       studentLastName: lastName,
//       studentSuffix: suffix ?? undefined,
//       studentGender: gender,
//       studentBirthDate: dateOfBirth.toISOString().split('T')[0],
//       studentAge: age,
//       religion,
//       ip: ip ?? undefined,
//       house_no_purok,
//       barangay,
//       city,
//       province,
//       motherTounge,

//     }).returning({ id: StudentInfoTable.student_id });

//     student_id = insertStudent.id;
//     }
    
//     if (studenType === "Old Student") {
//       const getStudentID = await db
//       .select({ student_id: StudentInfoTable.student_id })
//       .from(StudentInfoTable)
//       .where(eq(StudentInfoTable.lrn, lrn));
      
//       student_id = getStudentID[0]?.student_id ?? null;

//     }
    
//     if (!student_id) {
//       throw new Error("student_id is null before ClerkUserTable insertion");
//     }

//     // Insert into ClerkUserTable
//     if (studenType !== "Old Student" && userId) {
//       await db.insert(ClerkUserTable).values({
//         selected_AcademicYear_id: academicYearID,
//         clerkId: userId,
//         applicants_id: applicantId,
//         student_id: student_id,
//         userType: "student",
//         clerk_username: `RIZAL-${lrn}`,
//         clerk_email: email,
//       });
// }
//     // await db.insert(ClerkUserTable).values({
//     //   selected_AcademicYear_id: academicYearID,
//     //   clerkId: user.id,
//     //   applicants_id: applicantId,
//     //   student_id: student_id,
//     //   userType: "student",
//     //   clerk_username: `RIZAL-${lrn}`,
//     //   clerk_email: email,
//     // });

//     // Get grade level
//     const gradeLevelResult = await db
//       .select({ gradeLevel: studentTypeTable.gradeToEnroll })
//       .from(studentTypeTable)
//       .where(and(
//         eq(studentTypeTable.applicants_id, applicantId),
//         eq(studentTypeTable.academicYear_id, selectedYear)
//         ))
//       .limit(1);

//     const gradeLevelName = gradeLevelResult[0]?.gradeLevel;
//     if (!gradeLevelName) {
//       throw new Error("Grade level not found for applicant");
//     }

//     // Get gradeLevel_id
//     const gradeLevelRow = await db
//       .select({ id: GradeLevelTable.gradeLevel_id })
//       .from(GradeLevelTable)
//       .where(eq(GradeLevelTable.gradeLevelName, gradeLevelName))
//       .limit(1);

//     const gradeLevel_id = gradeLevelRow[0]?.id;
//     if (!gradeLevel_id) {
//       throw new Error(`Grade level ID not found for "${gradeLevelName}"`);
//     }

//     // Get all subjects
//     const subjects = await db.select().from(SubjectTable);

//     // Prepare and insert StudentGrades
//     const gradeEntries = subjects.map(subject => ({
//       student_id,
//       academicYear_id: academicYearID,
//       gradeLevel_id,
//       subject_id: subject.subject_id,
//       finalGrade: null,
//       remarks: null,
//     }));

//     await db.insert(StudentGradesTable).values(gradeEntries);

  
//     const sectionData = await db
//       .select({
//         section_id: SectionTable.section_id,
//         sectionName: SectionTable.sectionName,
//         limit: SectionTable.limit,
//         // gradeLevel_id: SectionTable.gradeLevel_id,
//       })
//       .from(SectionTable)
//       .where(
//         and(
//           eq(SectionTable.gradeLevel_id, gradeLevel_id),
//           eq(SectionTable.academicYear_id, academicYearID)
//         )
//       )
//       .orderBy(desc(SectionTable.section_id)) // get the latest section for that grade/year
//       .limit(1);


//     let newSectionCount = 1;
//     const limitCount = 25; // capacity per section test
//     // let limitCount = 1;
//     const limit = limitCount - 1; 
//     let section_id = 1;

//     // ROOM ASSIGNMENT LOGIC
//     const rooms = await db.select({ room_id: RoomTable.room_id }).from(RoomTable).orderBy(RoomTable.room_id);
//     const assignedRooms = await db
//       .select({ room_id: SectionTable.room_id })
//       .from(SectionTable)
//       .where(eq(SectionTable.academicYear_id, academicYearID));

//     const assignedRoomIds = assignedRooms.map(r => r.room_id);
//     const availableRooms = rooms.filter(r => !assignedRoomIds.includes(r.room_id));
//     const assignedRoom = availableRooms.length > 0 ? availableRooms[0] : null;

//     if (!assignedRoom) {
//       throw new Error("No available rooms left for this academic year.");
//     }

//     if (sectionData.length === 0) {
//       // no section yet → create Section 1
      
//       const sectionData2 = await db.insert(SectionTable).values({
//         sectionName: "Section " + newSectionCount,
//         gradeLevel_id,
//         academicYear_id: academicYearID,
//         limit: limit,
//         room_id: assignedRoom.room_id,
//       }).returning({ section_id: SectionTable.section_id });

//       section_id = sectionData2[0].section_id;
//     } else {
//       const currentSection = sectionData[0];

//       // check if current section still has capacity
//       if (currentSection.limit > 0) {
//         // just decrement the current section's limit
//         await db.update(SectionTable)
//           .set({ limit: currentSection.limit - 1 })
//           .where(eq(SectionTable.section_id, currentSection.section_id))

//         section_id = currentSection.section_id;
//       } else {
//         // full → open a new section
//         const match = currentSection.sectionName.match(/Section (\d+)/);
//         newSectionCount = match ? parseInt(match[1]) + 1 : 2;

//         const sectionData3 = await db.insert(SectionTable).values({
//           sectionName: "Section " + newSectionCount,
//           gradeLevel_id,
//           academicYear_id: academicYearID,
//           limit: limit,
//           room_id: assignedRoom.room_id,
//         }).returning({ section_id: SectionTable.section_id });

//         section_id = sectionData3[0].section_id;
//       }
//     }

//     await db
//     .insert(StudentPerGradeAndSection)
//     .values({
//       student_id,
//       academicYear_id: academicYearID,
//       gradeLevel_id,
//       section_id: section_id, 
//     });
    
//     // Insert audit trail
//     await db.insert(auditTrailsTable).values({
//       actionTaken: "Applicant was admitted",
//       actionTakenFor: name,
//       dateOfAction: new Date().toISOString(),
//       username: credentials.clerk_username,
//       usertype: credentials.userType,
//       academicYear_id: academicYearID,
//     });

//     // Send Email
//     if(studenType !== "Old Student"){
//       await sendAdmissionEmail(email, firstName, lastName, lrn, randomPassword);
//     } else {
//       await sendAdmissionEmailOldStudent(email, firstName, lastName );

//     }

//     return NextResponse.json({
//       message: "Student was successfully admitted and email sent successfully.",
//       admissionStatus: "Enrolled",
//     });
//   } catch (error: unknown) {
//     console.error("Admission process failed:", error);
//     return NextResponse.json({
//       error: "Failed to complete admission process",
//       details: error instanceof Error ? error.message : "Unknown error"
//     }, { status: 500 });
//   }
// }
