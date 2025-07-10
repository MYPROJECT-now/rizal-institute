"use server";

import { db } from "../db/drizzle";
import { revalidatePath } from "next/cache";
import {
  applicantsInformationTable,
  documentsTable,
  educationalBackgroundTable,
  guardianAndParentsTable,
  reservationFeeTable,
  applicationStatusTable,
  AdmissionStatusTable,
  Registrar_remaks_table,
  Cashier_remaks_table,
  additionalInformationTable,
} from "../db/schema";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import { StudentUpdateData } from "../type/reApplication/re_applicationType";
import { getAcademicYearID } from "./utils/academicYear";

// Generate random tracking ID
function generateRandomTrackingId(length = 12) {
  const charset = "0123456789";
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
}

// Send email with tracking ID
async function sendEmail(to: string, trackingId: string, hasReservationReceipt: boolean, hasDocuments: boolean) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const baseEmailContent = `
    Thank you for submitting your application for enrollment in Rizal Institute - Canlubang. 
    We appreciate your interest in joining our academic community.

    To track the status of your application, please use the following tracking ID: ${trackingId}
    You can use this ID to check on the progress of your application on our website or by contacting our 
    admissions office.
  `;

  let additionalContent = '';
  
  if (!hasReservationReceipt) {
    additionalContent = `
    IMPORTANT: To secure your spot, please complete the reservation fee payment of ₱500.00.
    You can make the payment in two ways:
    a) Online Payment:
       - Use your tracking ID to access the payment section on our website
       - Follow the payment instructions provided
    b) In-Person Payment:
       - Visit our cashier's office
       - Pay the reservation fee directly

    Your application will not be processed until the reservation fee is paid.
    `;
  } else {
    additionalContent = `
    Your application has been successfully submitted.
    `;
  }

  // Add document reminder regardless of payment status
  if (!hasDocuments) {
    additionalContent += `
    
    REMINDER: Required Documents
    Please submit the following documents in person at our registrar's office:
    - PSA Birth Certificate
    - Report Card
    - Good Moral Certificate
    - 2x2 ID Picture
    - form 137

    Additionally, please submit the following documents if from private school:
    - CACPRISAA Student Exit Clearance

    `;
  }

  const closingContent = `
    If you have any questions or concerns, please do not hesitate to reach out to us. 
    We look forward to reviewing your application.

    Best regards,
    Rizal Institute - Canlubang Registrar Office
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Application for Enrollment in Rizal Institute - Canlubang',
    text: `${baseEmailContent}\n${additionalContent}\n${closingContent}`,
  };

  await transporter.sendMail(mailOptions);
}

export const addNewApplicant = async (formData: {
  applicantsLastName: string;
  applicantsFirstName: string;
  applicantsMiddleName: string;
  applicantsSuffix: string;
  dateOfBirth: Date;
  age: number;
  gender: string;
  mobileNumber: string;
  email: string;
  lrn: string;
  trackingId?: string;

  guardiansLastName: string;
  guardiansFirstName: string;
  guardiansMiddleName: string;
  guardiansSuffix: string;
  emergencyContact: string;
  emergencyEmail: string;
  fullAddress: string;

  gradeLevel: string;
  studentType: string;
  schoolYear: string;
  schoolType: string;
  prevSchool: string;
  schoolAddress: string;

  birthCert: string;
  reportCard: string;
  goodMoral: string;
  idPic: string;
  studentExitForm: string;
  form137: string;

  mop: string;
  reservationReceipt: string;
  reservationAmount: number;

  attainmentUponGraduation: string;
  consistentGPA: string;
  hasEnrolledSibling: string;
}) => {
  const {
    applicantsLastName,
    applicantsFirstName,
    applicantsMiddleName,
    applicantsSuffix,
    dateOfBirth,
    age,
    gender,
    mobileNumber,
    email,
    lrn,
    // trackingId,

    guardiansLastName,
    guardiansFirstName,
    guardiansMiddleName,
    guardiansSuffix,
    emergencyContact,
    emergencyEmail,
    fullAddress,

    gradeLevel,
    studentType,
    schoolYear,
    schoolType,
    prevSchool,
    schoolAddress,

    birthCert,
    reportCard,
    goodMoral,
    idPic,
    studentExitForm,
    form137,

    mop,
    reservationReceipt,
    reservationAmount,

    attainmentUponGraduation,
    consistentGPA,
    hasEnrolledSibling,
  } = formData;



  const existingEmail = await db
    .select()
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.email, email))
    .limit(1);

  if (existingEmail.length > 0) {
    throw new Error("This email in use. Please use another email.");
  }

  const existing = await db.select().from(applicantsInformationTable).where(eq(applicantsInformationTable.lrn, lrn)).limit(1);
  if (existing.length > 0) {
    throw new Error("This LRN has already submitted an application.");
  }

   const academicYearID = await getAcademicYearID();


  const [insertedApplicant] = await db.insert(applicantsInformationTable).values({
    // academicYear_id: academicYearID,
    applicantsLastName,
    applicantsFirstName,
    applicantsMiddleName,
    applicantsSuffix,
    dateOfBirth: dateOfBirth.toISOString().split("T")[0],
    age,
    gender,
    mobileNumber,
    email,
    lrn
  }).returning({ id: applicantsInformationTable.applicants_id });

  const applicantId = insertedApplicant.id;

  try {
    await Promise.all([
      db.insert(guardianAndParentsTable).values({
        applicants_id: applicantId,
        guardiansLastName,
        guardiansFirstName,
        guardiansMiddleName,
        guardiansSuffix,
        emergencyContact,
        emergencyEmail,
        fullAddress
      }),
      db.insert(educationalBackgroundTable).values({
        applicants_id: applicantId,
        gradeLevel,
        schoolYear,
        studentType,
        schoolType,
        prevSchool,
        schoolAddress
      }),
      db.insert(documentsTable).values({
        applicants_id: applicantId,
        birthCert,
        reportCard,
        goodMoral,
        idPic,
        studentExitForm,
        form137,
      }),
      db.insert(reservationFeeTable).values({
        applicants_id: applicantId,
        academicYear_id: academicYearID,
        mop,
        reservationReceipt,
        reservationAmount
      }),
      db.insert(additionalInformationTable).values({
        applicants_id: applicantId,
        AttainmentUponGraduation: attainmentUponGraduation,
        ConsistentGPA: consistentGPA,
        HasEnrolledSibling: hasEnrolledSibling
      })
    ]);

    const trackingId = generateRandomTrackingId();
    await db.insert(applicationStatusTable).values({
      applicants_id: applicantId,
      academicYear_id: academicYearID,
      trackingId,
      applicationFormReviewStatus: 'Pending',
      reservationPaymentStatus: 'Pending',
      dateOfApplication: new Date().toISOString().slice(0, 10),
    });

    await db.insert(AdmissionStatusTable).values({
      applicants_id: applicantId,
      academicYear_id: academicYearID,
      admissionStatus: 'Pending',
      confirmationStatus: 'Pending',
      dateOfAdmission: new Date().toISOString().slice(0, 10),
    });

    // Check if reservation receipt and documents are provided
    const hasReservationReceipt = !!reservationReceipt;
    const hasDocuments = !!(birthCert && reportCard && goodMoral && idPic && studentExitForm);
    await sendEmail(email, trackingId, hasReservationReceipt, hasDocuments);

    revalidatePath("/");
    revalidatePath("/enrollment");

    return { success: true, trackingId };
  } catch (err) {
    await db.delete(applicantsInformationTable).where(eq(applicantsInformationTable.applicants_id, applicantId));
    throw new Error("Application failed. All partial data has been removed.");
    console.error(err);
  }
};


export const verifyEmail = async (email: string) => {
  const existing = await db.select().from(applicantsInformationTable).where(eq(applicantsInformationTable.email, email)).limit(1);
  if (existing.length > 0) {
    throw new Error("This email is already in use. Please use another email.");
  }
};

export const verifyLrn = async (lrn: string) => {
  const existing = await db.select().from(applicantsInformationTable).where(eq(applicantsInformationTable.lrn, lrn)).limit(1);
  if (existing.length > 0) {
    throw new Error("This LRN is already in use. Please use another LRN.");
  }
};



    export const getStatusByTrackingId = async (trackingId: string) => {
      try {
        const result = await db
          .select({
            applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
            reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
            regRemarks: Registrar_remaks_table.reg_remarks,
            cashierRemarks: Cashier_remaks_table.cashier_remarks,
            regDate: Registrar_remaks_table.dateOfRemarks,
            cashierDate: Cashier_remaks_table.dateOfRemarks,
            confirmationStatus: AdmissionStatusTable.confirmationStatus,
          })
          .from(applicationStatusTable)
          .leftJoin(Registrar_remaks_table,eq(applicationStatusTable.applicants_id, Registrar_remaks_table.applicants_id))
          .leftJoin(Cashier_remaks_table,eq(applicationStatusTable.applicants_id, Cashier_remaks_table.applicants_id))
          .leftJoin(AdmissionStatusTable,eq(applicationStatusTable.applicants_id, AdmissionStatusTable.applicants_id))
          .where(eq(applicationStatusTable.trackingId, trackingId))
          .limit(1);

        if (result.length > 0) {
          return result[0];
        } else {
          return null; // No match found
        }
      } catch (error) {
        console.error("Failed to get status:", error);
        throw new Error("Failed to fetch application status");
      }
    };

export const acceptAdmission = async (trackingId: string) => {
  const applicant = await db
    .select({ applicants_id: applicationStatusTable.applicants_id })
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.trackingId, trackingId))
    .then((res) => res[0]);


  const result = await db
    .update(AdmissionStatusTable)
    .set({
      confirmationStatus: 'Confirmed',
      dateOfConfirmation: new Date().toISOString().split("T")[0],
    })
    .where(eq(AdmissionStatusTable.applicants_id, applicant.applicants_id));

  return {success: result.rowCount > 0,};
};

  // reapplication
  export const getStudentDataByTrackingId = async (trackingId: string) => {
    try {
        const student = await db
            .select({
                applicantsFirstName: applicantsInformationTable.applicantsFirstName,
                applicantsMiddleName: applicantsInformationTable.applicantsMiddleName,
                applicantsLastName: applicantsInformationTable.applicantsLastName,
                applicantsSuffix: applicantsInformationTable.applicantsSuffix,
                dateOfBirth: applicantsInformationTable.dateOfBirth,
                age: applicantsInformationTable.age,
                gender: applicantsInformationTable.gender,
                mobileNumber: applicantsInformationTable.mobileNumber,
                email: applicantsInformationTable.email,
                lrn: applicantsInformationTable.lrn,

                guardiansFirstName: guardianAndParentsTable.guardiansFirstName,
                guardiansMiddleName: guardianAndParentsTable.guardiansMiddleName,
                guardiansLastName: guardianAndParentsTable.guardiansLastName,
                guardiansSuffix: guardianAndParentsTable.guardiansSuffix,
                emergencyContact: guardianAndParentsTable.emergencyContact,
                emergencyEmail: guardianAndParentsTable.emergencyEmail,
                fullAddress: guardianAndParentsTable.fullAddress,

                gradeLevel: educationalBackgroundTable.gradeLevel,
                schoolYear: educationalBackgroundTable.schoolYear,
                schoolType: educationalBackgroundTable.schoolType,
                prevSchool: educationalBackgroundTable.prevSchool,
                schoolAddress: educationalBackgroundTable.schoolAddress,

                birthCert: documentsTable.birthCert,
                reportCard: documentsTable.reportCard,
                goodMoral: documentsTable.goodMoral,
                idPic: documentsTable.idPic,
                studentExitForm: documentsTable.studentExitForm,

                regRemarks: Registrar_remaks_table.reg_remarks,
                cashierRemarks: Cashier_remaks_table.cashier_remarks,
                regDate: Registrar_remaks_table.dateOfRemarks,
                cashierDate: Cashier_remaks_table.dateOfRemarks
            })
            .from(applicantsInformationTable)
            .innerJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
            .innerJoin(guardianAndParentsTable, eq(applicantsInformationTable.applicants_id, guardianAndParentsTable.applicants_id))
            .innerJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
            .innerJoin(documentsTable, eq(applicantsInformationTable.applicants_id, documentsTable.applicants_id))
            .leftJoin(Registrar_remaks_table, eq(applicantsInformationTable.applicants_id, Registrar_remaks_table.applicants_id))
            .leftJoin(Cashier_remaks_table, eq(applicantsInformationTable.applicants_id, Cashier_remaks_table.applicants_id))
            .where(eq(applicationStatusTable.trackingId, trackingId))
            .limit(1);

        if (student.length === 0) {
            throw new Error("No student data found.");
        }

        return student[0];
    } catch (error) {
        console.error("Error fetching student data:", error);
        throw error;
    }
};



export const updateStudentData = async (lrn: string, updatedData: StudentUpdateData) => {
  try {
    // Extract student and guardian data separately
    const {
      applicantsFirstName,
      applicantsMiddleName,
      applicantsLastName,
      applicantsSuffix,
      dateOfBirth,
      age,
      gender,
      mobileNumber,
      email,

      guardiansFirstName,
      guardiansMiddleName,
      guardiansLastName,
      guardiansSuffix,
      emergencyContact,
      emergencyEmail,
      fullAddress,

      gradeLevel,
      schoolYear,
      schoolType,
      prevSchool,
      schoolAddress,

      birthCert,
      reportCard,
      goodMoral,
      idPic,
      studentExitForm,
    } = updatedData;

    // Update studentsInformationTable
    const updatedStudent = await db
      .update(applicantsInformationTable)
      .set({
        applicantsFirstName,
        applicantsMiddleName,
        applicantsLastName,
        applicantsSuffix,
        dateOfBirth,
        age,
        gender,
        mobileNumber,
        email,
      })
      .where(eq(applicantsInformationTable.lrn, lrn))
      .returning();

    const updatedGuardian = await db
      .update(guardianAndParentsTable)
      .set({
        guardiansFirstName,
        guardiansMiddleName,
        guardiansLastName,
        guardiansSuffix,
        fullAddress,
        emergencyContact,
        emergencyEmail,
      })
      .where(eq(guardianAndParentsTable.applicants_id, updatedStudent[0]?.applicants_id))
      .returning();

    const updatedEducationalBackground = await db
      .update(educationalBackgroundTable)
      .set({
        prevSchool,
        schoolAddress,
        schoolType,
        gradeLevel,
        schoolYear,
      })
      .where(eq(educationalBackgroundTable.applicants_id, updatedStudent[0]?.applicants_id))
      .returning();

    const updatedDocument = await db
      .update(documentsTable)
      .set({
        birthCert,
        reportCard,
        goodMoral,
        idPic,
        studentExitForm
      })
      .where(eq(documentsTable.applicants_id, updatedStudent[0]?.applicants_id))
      .returning();

    // Get current application status
    const currentStatus = await db
      .select({
        applicationStatus: applicationStatusTable.applicationFormReviewStatus
      })
      .from(applicationStatusTable)
      .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id))
      .limit(1);

    // Only update status to Pending if it was previously Declined
    if (currentStatus[0]?.applicationStatus === "Declined") {
      await db
        .update(applicationStatusTable)
        .set({
          applicationFormReviewStatus: "Pending",
          dateOfApplication: new Date().toISOString().slice(0, 10)
        })
        .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id));
    }

    // Update resolution status for both registrar and cashier remarks
    await db
      .update(Registrar_remaks_table)
      .set({
        resolved_reg_remarks: true
      })
      .where(eq(Registrar_remaks_table.applicants_id, updatedStudent[0]?.applicants_id));

    await db
      .update(Cashier_remaks_table)
      .set({
        resolved_cashier_remarks: true
      })
      .where(eq(Cashier_remaks_table.applicants_id, updatedStudent[0]?.applicants_id));

    return {
      student: updatedStudent[0],
      guardian: updatedGuardian[0],
      educationalBackground: updatedEducationalBackground[0],
      document: updatedDocument[0]
    };
  } catch (error) {
    console.error("Error updating student data:", error);
    throw new Error("Failed to update student and guardian data.");
  }
};




