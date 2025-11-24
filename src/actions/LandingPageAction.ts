"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { additionalInformationTable, AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, documentsTable, educationalBackgroundTable, EmailVerification, guardianAndParentsTable, studentTypeTable, TuitionComp } from "../db/schema";
import nodemailer from "nodemailer";
import { getAcademicYearID } from "./utils/academicYear";


export async function getTuitionByGrade(grade: string) {
  const result = await db
    .select()
    .from(TuitionComp)
    .where(eq(TuitionComp.gradelevel, grade))
    .orderBy(desc(TuitionComp.academicYear_id))
    .limit(1);

  return result.length ? result[0] : null;
}

export const verifyPIN = async (email: string, pin: number) => {
    const latest = await db
        .select({
            emailVerification_id: EmailVerification.emailVerification_id,
            isActive: EmailVerification.isActive,
            code: EmailVerification.code,
            dateSent: EmailVerification.dateSent
        })
        .from(EmailVerification)
        .where(and(
            eq(EmailVerification.email, email),
            eq(EmailVerification.isActive, true),
        ))
        .orderBy(desc(EmailVerification.emailVerification_id))
        .limit(1);

    // If no active code exists
    if (!latest || latest.length === 0) {
        return {
            success: false,
            message: "No verification code found."
        };
    }

    const record = latest[0];

    // Check if PIN matches
    if (record.code !== pin) {
        return {
            success: false,
            message: "Incorrect PIN."
        };
    }

    // Check expiration (10 minutes)
    const sentTime = new Date(record.dateSent).getTime();
    const now = Date.now();
    const diffMinutes = (now - sentTime) / (1000 * 60);

    if (diffMinutes > 10) {
        return {
            success: false,
            message: "PIN expired. Please request a new one."
        };
    }

    // If valid → deactivate old code
    await db
        .update(EmailVerification)
        .set({ isActive: false })
        .where(eq(EmailVerification.emailVerification_id, record.emailVerification_id));

    return {
        success: true,
        message: "PIN verified successfully."
    };
};


export const addNewApplicants = async (
    applicantsLastName: string,
    applicantsFirstName: string,
    applicantsMiddleName: string,
    applicantsSuffix: string,
    dateOfBirth: Date,
    age: number,
    gender: string,
    religion: string,
    motherTounge: string,
    ip: string,
    house_no_purok: string,
    barangay: string,
    city: string,
    province: string,
    mobileNumber: string,
    email: string,
    lrn: string,

    guardiansLastName: string,
    guardiansFirstName: string,
    guardiansMiddleName: string,
    guardiansSuffix: string,
    emergencyContact: string,
    emergencyEmail: string,
    relationship: string,

    gradeToEnroll: string,
    studentType: string,
    schoolYear: string,
    schoolType: string,
    prevSchool: string,
    schoolAddress: string,

    birthCert: string,
    reportCard: string,
    goodMoral: string,
    idPic: string,
    studentExitForm: string,
    form137: string,
    itr: string,
    escCert: string,


    attainmentUponGraduation: string,
    // consistentGPA: string;
    hasEnrolledSibling: string,
    siblingName: string,
    escGrantee: string,
 ) => {

    function generateRandomTrackingId(length = 12) {
    const charset = "0123456789";
    return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    }


    // Send email with tracking ID
    async function sendEmail(to: string, trackingId: string) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
        },
    });

    const baseEmailContent = `
    Thank you for submitting your application for enrollment in Rizal Institute - Canlubang.
    We appreciate your interest in joining our academic community.

    Tracking ID: ${trackingId}

    To track your application status, please use the following tracking ID: ${trackingId}.
    `;

    const closingContent = `
        <p><strong>Required Documents:</strong></p>
        <ul>
        <li>PSA Birth Certificate</li>
        <li>Report Card</li>
        <li>Good Moral Certificate</li>
        <li>2x2 ID Picture</li>
        <li>Form 137</li>
        <li>ESC Certificate (if transferee ESC grantee)</li>
        <li>CACPRISAA Student Exit Clearance (if from private school)</li>
        <li>Parents Income Tax Return (incoming Grade 7 only)</li>
        </ul>
    `;

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
        <div style="max-width:650px; margin:0 auto; background:white; padding:25px; border-radius:8px;">
            
            <div style="text-align:center; margin-bottom:20px;">
            <h2 style="margin:0; color:#333;">Rizal Institute - Canlubang</h2>
            <p style="margin:0; color:#777;">Application Confirmation</p>
            </div>

            <p>Thank you for submitting your application for enrollment at Rizal Institute - Canlubang.</p>
            <p>We appreciate your interest in joining our academic community.</p>

            <div style="
            background:#eef5ff;
            border:1px solid #c7dafc;
            padding:16px;
            border-radius:10px;
            text-align:center;
            margin:25px 0;
            ">
            <p style="margin:0; font-size:14px; color:#444;">Your Tracking ID</p>
            <p style="
                margin:8px 0 0 0;
                font-size:28px;
                font-weight:bold;
                color:#0a3ea1;
                letter-spacing:3px;
            ">
                ${trackingId}
            </p>
            </div>

            <p>You can use this tracking ID to check your application progress on our website.</p>

            ${closingContent}

            <div style="text-align:center; margin-top:30px; padding-top:15px; border-top:1px solid #ddd; color:#777; font-size:12px;">
            <p style="margin:0;">This is an automated email. Please do not reply.</p>
            <p style="margin:0;">Rizal Institute - Canlubang © ${new Date().getFullYear()}</p>
            </div>

        </div>
        </div>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Application for Enrollment - Rizal Institute Canlubang",
        text: `${baseEmailContent}\n\n${closingContent}`,
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
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
    religion,
    motherTounge,
    ip,
    house_no_purok,
    barangay,
    city,
    province,
    mobileNumber,
    email,
    lrn
  }).returning({ id: applicantsInformationTable.applicants_id });

  const applicantId = insertedApplicant.id;


  const insertGuardian = db.insert(guardianAndParentsTable).values({
    applicants_id: applicantId,
    guardiansLastName,
    guardiansFirstName,
    guardiansMiddleName,
    guardiansSuffix,
    emergencyContact,
    emergencyEmail,
    relationship,
  });

  const insertEducational = db.insert(educationalBackgroundTable).values({
    applicants_id: applicantId,
    gradeLevel: gradeToEnroll,
    studentType,
    schoolYear,
    schoolType,
    prevSchool,
    schoolAddress,
  });

  const insertDocument = db.insert(documentsTable).values({
    applicants_id: applicantId,
    birthCert,
    hasBirth: !!birthCert,
    reportCard,
    hasReportCard: !!reportCard,
    goodMoral,
    hasGoodMoral: !!goodMoral,
    idPic,
    hasIdPic: !!idPic,
    studentExitForm,
    hasExitForm: !!studentExitForm,
    form137,
    hasForm137: !!form137,
    itr,
    hasTIR: !!itr,
    escCert,
    hasEscCertificate: !!escCert
  });
  
//   const insertReservation = db.insert(reservationFeeTable).values({
//     applicants_id: applicantId,
//     academicYear_id: academicYearID,
//     mop,
//     reservationReceipt,
//     reservationAmount: Number(reservationAmount),
//     dateOfPayment: new Date().toISOString().slice(0, 10),
//   });

  const insertDiscount = db.insert(additionalInformationTable).values({
    applicants_id: applicantId,
    AttainmentUponGraduation: attainmentUponGraduation,
    HasEnrolledSibling: hasEnrolledSibling,
    siblingName: siblingName,
    escGrantee: escGrantee
  })

  const trackingId = generateRandomTrackingId();
  const insertApplicationStatus = db.insert(applicationStatusTable).values({
    applicants_id: applicantId,
    academicYear_id: academicYearID,
    trackingId,
    applicationFormReviewStatus: 'Pending',
    reservationPaymentStatus: 'Pending',
    dateOfApplication: new Date().toISOString().slice(0, 10),
  });

  const insertAdmissionStatus =  db.insert(AdmissionStatusTable).values({
    applicants_id: applicantId,
    academicYear_id: academicYearID,
    admissionStatus: 'Pending',
    confirmationStatus: 'Pending',
    dateOfAdmission: new Date().toISOString().slice(0, 10),
  });

  const insertStudentType = db.insert(studentTypeTable).values({
    applicants_id: applicantId,
    academicYear_id: academicYearID,
    studentType,
    gradeToEnroll,
    student_case: 'REGULAR'
  });

  await Promise.all([
    insertGuardian, 
    insertEducational, 
    insertDocument, 
    insertDiscount, 
    insertApplicationStatus, 
    insertAdmissionStatus, 
    insertStudentType
  ]);
  
  await sendEmail(email, trackingId);
};
