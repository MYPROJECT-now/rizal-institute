"use server";

import { db } from "../db/drizzle";
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
  StudentInfoTable,
  EnrollmentStatusTable,
  TempMonthsInSoaTable,
  tempdownPaymentTable,
  downPaymentTable,
  MonthsInSoaTable,
  fullPaymentTable,
  BreakDownTable,
  AcademicYearTable,
  studentTypeTable,
  StudentGradesTable,
  additionalInformationTable,
} from "../db/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import { ReservationFee, StudentUpdateData } from "../type/reApplication/re_applicationType";
import { getAcademicYearID } from "./utils/academicYear";
import dns from "dns/promises";


// Generate random tracking ID
function generateRandomTrackingId(length = 12) {
  const charset = "0123456789";
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
}

// Send email with tracking ID
async function sendEmail(to: string, trackingId: string, hasReservationReceipt: boolean,) {
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

    tracking ID: ${trackingId}

    To track the status of your application, please use the following tracking ID: ${trackingId}
    You can use this ID to check on the progress of your application on our website or by contacting our 
    registrar office.
  `;

  let additionalContent = '';
  
  if (!hasReservationReceipt) {
    additionalContent = `
    IMPORTANT: To secure your spot, please complete the reservation fee payment of atleast ₱500.00.
    You can make the payment in two ways:
    a) Online Payment:
       - Use your tracking ID to access the payment section on our website
       - Go to website and click the button track application
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
  // if (!hasDocuments) {
  //   additionalContent += `
    
  //   REMINDER: Required Documents
  //   Please submit the following documents in person at our registrar's office:
  //   - PSA Birth Certificate
  //   - Report Card
  //   - Good Moral Certificate
  //   - 2x2 ID Picture
  //   - form 137

  //   Additionally, 
  //   please submit the following documents if from private school:
  //   - CACPRISAA Student Exit Clearance

  //   please submit the following documents if you are incoming Grade 7 student:
  //   - Income Tax Return

  //   `;
  // }

  const closingContent = `
    REMINDER: Required Documents
      Please submit the following documents in person at our registrar's office:
      - PSA Birth Certificate
      - Report Card
      - Good Moral Certificate
      - 2x2 ID Picture
      - form 137

      Additionally, Please submit the following documents 
      
      if from private school:
      - CACPRISAA Student Exit Clearance

      if you are incoming Grade 7 student:
      - Parent's Income Tax Return

      if you are a transferee that is already ESC Grantee:
      - ECS Certificate

    Disregard this reminder if you have already submitted the required documents.

    If you have any questions or concerns, please do not hesitate to reach out to us. 
    We look forward to reviewing your application.

    Best regards,
    Rizal Institute - Canlubang 
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Application for Enrollment in Rizal Institute - Canlubang',
    text: `${baseEmailContent}\n${additionalContent}\n${closingContent}`,
  };

  await transporter.sendMail(mailOptions);
}

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

  gradeLevel: string,
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

  mop: string,
  reservationReceipt: string,
  reservationAmount: string,

  attainmentUponGraduation: string,
  // consistentGPA: string;
  hasEnrolledSibling: string,
  siblingName: string,
  escGrantee: string,
) => {

  
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
    gradeLevel,
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
  
  const insertReservation = db.insert(reservationFeeTable).values({
    applicants_id: applicantId,
    academicYear_id: academicYearID,
    mop,
    reservationReceipt,
    reservationAmount: Number(reservationAmount),
    dateOfPayment: new Date().toISOString().slice(0, 10),
  });

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
    gradeToEnroll: gradeLevel,
    student_case: 'REGULAR'
  });

  await Promise.all([
    insertGuardian, 
    insertEducational, 
    insertDocument, 
    insertReservation, 
    insertDiscount, 
    insertApplicationStatus, 
    insertAdmissionStatus, 
    insertStudentType
  ]);
  
  const hasReservationReceipt = !!reservationReceipt;
  await sendEmail(email, trackingId, hasReservationReceipt);


  
  

  
}

export const verifyEmail = async (email: string) => {
  
  const existing = await db.select().from(applicantsInformationTable).where(eq(applicantsInformationTable.email, email)).limit(1);
  if (existing.length > 0) {
    throw new Error("This email is already in use. Please use another email.");
  }

    const domain = email.split("@")[1];
  try {
    const mxRecords = await dns.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      throw new Error("The email is invalid and cannot receive mail. Please check for typos.");
    }
  } catch {
      throw new Error("The email is invalid and cannot receive mail. Please check for typos.");
  }

  // ✅ If all checks pass
  return { success: true };
};

export const verifyLrn = async (lrn: string) => {
  const existing = await db.select().from(StudentInfoTable).where(eq(StudentInfoTable.lrn, lrn)).limit(1);
  if (existing.length > 0) {
    throw new Error("You have already enrolled.");
  }
};



export const getStatusByTrackingId = async (trackingId: string) => {
  const academicYearID = await getAcademicYearID();
  if (!academicYearID) return null;
  try {
    const result = await db
      .select({
        applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
        reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
        regRemarks: Registrar_remaks_table.reg_remarks,
        cashierRemarks: Cashier_remaks_table.cashier_remarks,
        regDate: Registrar_remaks_table.dateOfRemarks,
        cashierDate: Cashier_remaks_table.dateOfRemarks,
        resolved_reg_remarks: Registrar_remaks_table.resolved_reg_remarks,
        resolved_cashier_remarks: Cashier_remaks_table.resolved_cashier_remarks,
        confirmationStatus: AdmissionStatusTable.confirmationStatus,
        admissionStatus: AdmissionStatusTable.admissionStatus,
        hasPaidReservation: reservationFeeTable.reservationReceipt, // NULL if no payment
        hasTemptMonthly: TempMonthsInSoaTable.temp_month_id,
        paymentStatus: fullPaymentTable.paymentStatus,


      })
      .from(applicationStatusTable)
      .leftJoin(Registrar_remaks_table,eq(applicationStatusTable.applicants_id, Registrar_remaks_table.applicants_id))
      .leftJoin(Cashier_remaks_table,eq(applicationStatusTable.applicants_id, Cashier_remaks_table.applicants_id))
      .leftJoin(AdmissionStatusTable,eq(applicationStatusTable.applicants_id, AdmissionStatusTable.applicants_id))
      .leftJoin(reservationFeeTable,eq(applicationStatusTable.applicants_id, reservationFeeTable.applicants_id))
      .leftJoin(TempMonthsInSoaTable,eq(applicationStatusTable.applicants_id, TempMonthsInSoaTable.applicants_id))
      .leftJoin(fullPaymentTable,eq(applicationStatusTable.applicants_id, fullPaymentTable.applicants_id))
      .where(and(
        eq(applicationStatusTable.trackingId, trackingId),
        eq(applicationStatusTable.academicYear_id, academicYearID),
        eq(AdmissionStatusTable.academicYear_id, academicYearID),
        eq(reservationFeeTable.academicYear_id, academicYearID),

      ))
      .limit(1);

    console.log(result);
    if (result.length > 0) {
      console.log("Reservation ID:", result[0].hasPaidReservation);
      return result[0];
    } else {
      console.log("No status found for tracking ID:", trackingId);
      return null; 
    }
  } catch (error) {
    console.error("Failed to get status:", error);
    throw new Error("Failed to fetch application status");
  }
};


export const getAdmissionStatus = async (trackingId: string) => {
  const academicYearID = await getAcademicYearID();
  if (!academicYearID) return null;

  const status = await db
    .select({
      applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
      hasPaidReservation: reservationFeeTable.reservationReceipt,
      hasTemptMonthly: TempMonthsInSoaTable.temp_month_id,
      confirmationStatus: AdmissionStatusTable.confirmationStatus,
      paymentStatus: fullPaymentTable.paymentStatus,

    })
    .from(applicationStatusTable)
    .leftJoin(reservationFeeTable, eq(applicationStatusTable.applicants_id, reservationFeeTable.applicants_id))
    .leftJoin(TempMonthsInSoaTable, eq(applicationStatusTable.applicants_id, TempMonthsInSoaTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicationStatusTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(fullPaymentTable, eq(applicationStatusTable.applicants_id, fullPaymentTable.applicants_id))
    .where(and(
      eq(applicationStatusTable.trackingId, trackingId),
      eq(applicationStatusTable.academicYear_id, academicYearID),
      eq(reservationFeeTable.academicYear_id, academicYearID),
      eq(TempMonthsInSoaTable.academicYear_id, academicYearID),
      eq(AdmissionStatusTable.academicYear_id, academicYearID),
      eq(fullPaymentTable.academicYear_id, academicYearID)
    ))
    .limit(1);

  console.log(status);
  return status;
}


export const getApplicationRemarks = async (trackingId: string) => {
  const academicYearID = await getAcademicYearID();
  if (!academicYearID) return null;

  const remarks = await db
    .select({
      regRemarks: Registrar_remaks_table.reg_remarks,
      cashierRemarks: Cashier_remaks_table.cashier_remarks,
      regDate: Registrar_remaks_table.dateOfRemarks,
      cashierDate: Cashier_remaks_table.dateOfRemarks,
  })
  .from(applicationStatusTable)
  .leftJoin(Registrar_remaks_table, eq(applicationStatusTable.applicants_id, Registrar_remaks_table.applicants_id) )
  .leftJoin(Cashier_remaks_table,eq(applicationStatusTable.applicants_id, Cashier_remaks_table.applicants_id))
  .where(and(
    eq(applicationStatusTable.trackingId, trackingId),
    eq(Registrar_remaks_table.resolved_reg_remarks, false),
    eq(Cashier_remaks_table.resolved_cashier_remarks, false),
    eq(Registrar_remaks_table.academicYear_id, academicYearID),
    eq(Cashier_remaks_table.academicYear_id, academicYearID),
    eq(applicationStatusTable.academicYear_id, academicYearID),
  ))

  return remarks;
}
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
                religion: applicantsInformationTable.religion,
                ip: applicantsInformationTable.ip,
                house_no_purok: applicantsInformationTable.house_no_purok,
                barangay: applicantsInformationTable.barangay,
                city: applicantsInformationTable.city,
                province: applicantsInformationTable.province,
                motherTounge: applicantsInformationTable.motherTounge,
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
                relationship: guardianAndParentsTable.relationship,

                gradeLevel: educationalBackgroundTable.gradeLevel,
                schoolYear: educationalBackgroundTable.schoolYear,
                schoolType: educationalBackgroundTable.schoolType,
                studentType: educationalBackgroundTable.studentType,
                prevSchool: educationalBackgroundTable.prevSchool,
                schoolAddress: educationalBackgroundTable.schoolAddress,

                birthCert: documentsTable.birthCert,
                reportCard: documentsTable.reportCard,
                goodMoral: documentsTable.goodMoral,
                idPic: documentsTable.idPic,
                studentExitForm: documentsTable.studentExitForm,
                form137: documentsTable.form137,
                itr: documentsTable.itr,
                escCert: documentsTable.escCert,

                mop: reservationFeeTable.mop,
                reservationAmount: reservationFeeTable.reservationAmount,
                reservationReceipt: reservationFeeTable.reservationReceipt,

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
            .innerJoin(reservationFeeTable, eq(applicantsInformationTable.applicants_id, reservationFeeTable.applicants_id))
            .leftJoin(Registrar_remaks_table, and(eq(applicantsInformationTable.applicants_id, Registrar_remaks_table.applicants_id), eq(Registrar_remaks_table.resolved_reg_remarks, false)))
            .leftJoin(Cashier_remaks_table, and(eq(applicantsInformationTable.applicants_id, Cashier_remaks_table.applicants_id), eq(Cashier_remaks_table.resolved_cashier_remarks, false)))
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

  export const getFullPaymentDataByTrackingId = async (trackingId: string) => {
    try {
        const student = await db
            .select({

                mop: fullPaymentTable.paymentMethod,
                reservationAmount: fullPaymentTable.payment_amount,
                reservationReceipt: fullPaymentTable.payment_receipt,

                cashierRemarks: Cashier_remaks_table.cashier_remarks,
                regRemarks: Registrar_remaks_table.reg_remarks,
                cashierDate: Cashier_remaks_table.dateOfRemarks,
                regDate: Registrar_remaks_table.dateOfRemarks,
            })
            .from(fullPaymentTable)
            .leftJoin(Cashier_remaks_table, and(eq(fullPaymentTable.applicants_id, Cashier_remaks_table.applicants_id), eq(Cashier_remaks_table.resolved_cashier_remarks, false)))
            .leftJoin(Registrar_remaks_table, eq(fullPaymentTable.applicants_id, Registrar_remaks_table.applicants_id))
            .leftJoin(applicationStatusTable, eq(fullPaymentTable.applicants_id, applicationStatusTable.applicants_id))
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



export const getPaymentMethodData = async (trackingId: string) => {

  const acadID = await db
  .select({academicYear_id: AcademicYearTable.academicYear_id})
  .from(AcademicYearTable)
  .where(eq(AcademicYearTable.isActive, true))
  
  const activeAcadID = acadID[0]?.academicYear_id ?? 1;

  const applicantID = await db
    .select({ applicants_id: applicationStatusTable.applicants_id })
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.trackingId, trackingId))
    .limit(1);

  const getTotalTuition = await db
    .select({ total: BreakDownTable.totalTuitionFee})
    .from(BreakDownTable)
    .where(and(
      eq(BreakDownTable.applicants_id, applicantID[0].applicants_id),
      eq(BreakDownTable.academicYear_id, activeAcadID)
    ))

  const MonthlyDues = await db
    .select({ 
      month: TempMonthsInSoaTable.temp_month,
      monthlyDues: TempMonthsInSoaTable.temp_monthlyDue
     })
    .from(TempMonthsInSoaTable)
    .where(and(
      eq(TempMonthsInSoaTable.applicants_id, applicantID[0].applicants_id),
      eq(TempMonthsInSoaTable.academicYear_id, activeAcadID)  
    ))
    .orderBy(asc(TempMonthsInSoaTable.temp_month_id))

  const Down = await db
  .select({
    amount: tempdownPaymentTable.amount,
  })
  .from(tempdownPaymentTable)
  .where(and(
    eq(tempdownPaymentTable.applicants_id, applicantID[0].applicants_id),
    eq(tempdownPaymentTable.academicYear_id,  activeAcadID)
  ))

  const breakDown = await db
  .select({
    miscellaneous: BreakDownTable.miscellaneous,
    academic_discount: BreakDownTable.academic_discount,
    academic_discount_amount: BreakDownTable.academic_discount_amount,
    withSibling: BreakDownTable.withSibling,
    withSibling_amount: BreakDownTable.withSibling_amount,
    other_fees: BreakDownTable.other_fees,
    other_discount: BreakDownTable.other_discount,
    escGrant: BreakDownTable.escGrant,
    tuitionFee: BreakDownTable.tuitionFee,
    pastTuition: BreakDownTable.remainingTuitionFee
  })
  .from(BreakDownTable)
  .where(and(
    eq(BreakDownTable.applicants_id, applicantID[0].applicants_id),
    eq(BreakDownTable.academicYear_id, activeAcadID)))
  
  console.log(MonthlyDues)
  return{ 
    totalTuitionFee: getTotalTuition[0]?.total ?? 0, 
    MonthlyDues, 
    downPayment: Down[0]?.amount ?? 0,
    
    miscellaneous: breakDown[0]?.miscellaneous ?? 0,
    academic_discount: breakDown[0]?.academic_discount ?? "",
    academic_discount_amount: breakDown[0]?.academic_discount_amount ?? 0,
    withSibling: breakDown[0]?.withSibling ?? "",
    withSibling_amount: breakDown[0]?.withSibling_amount ?? 0,
    other_fees: breakDown[0]?.other_fees ?? 0,
    other_discount: breakDown[0]?.other_discount ?? 0,
    escGrant: breakDown[0]?.escGrant ?? 0,
    tuitionFee: breakDown[0]?.tuitionFee ?? 0,
    pastTuition: breakDown[0]?.pastTuition ?? 0,
  }
}


export const installments = async (trackingId: string, pm: string, DownPayment: number, monthlyDues: { month: string; monthlyDues: number }[] ) => {
  const getApplicantsID = await db
    .select({ applicants_id: applicationStatusTable.applicants_id })
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.trackingId, trackingId))
    .limit(1);

  const getTemptDetails = await db
    .select({ temp_down_id: tempdownPaymentTable.temp_down_id, SINumber: tempdownPaymentTable.SINumber, paymentMethod: tempdownPaymentTable.paymentMethod })
    .from(tempdownPaymentTable)
    .where(eq(tempdownPaymentTable.applicants_id, getApplicantsID[0].applicants_id))
    .limit(1);

  const tempMonthID = await db
    .select({ temp_month_id: TempMonthsInSoaTable.temp_month_id })
    .from(TempMonthsInSoaTable)
    .where(eq(TempMonthsInSoaTable.applicants_id, getApplicantsID[0].applicants_id))

  const downPayment = await db
  .insert(downPaymentTable)
  .values({
    applicants_id: getApplicantsID[0].applicants_id,
    temp_down_id: getTemptDetails[0].temp_down_id,
    amount: DownPayment,
    paymentMethod: pm,
    academicYear_id: await getAcademicYearID(),
    downPaymentDate: new Date().toISOString().slice(0, 10),
    SINumber: getTemptDetails[0].SINumber,
  })
  .returning({ donw_id: downPaymentTable.donw_id });
  
  await db
  .update(AdmissionStatusTable)
  .set({
    confirmationStatus: "Aprroved",
    dateOfConfirmation: new Date().toISOString().slice(0, 10),
  })
  .where(eq(AdmissionStatusTable.applicants_id, getApplicantsID[0].applicants_id));

  const downId =  downPayment[0].donw_id;
  for (const due of monthlyDues) {
    await db
    .insert(MonthsInSoaTable)
    .values({
      temp_month_id: tempMonthID[0].temp_month_id,
      downPaymentId: downId,
      applicants_id: getApplicantsID[0].applicants_id,
      academicYear_id: await getAcademicYearID(),
      month: due.month,
      monthlyDue: due.monthlyDues,
    });
  }
  return { success: true, message: "Payment method updated successfully" }
}


export const full_payment = async (trackingId: string, pm: string, DownPayment: number, totalTuition: number, mop: string, uploadReservationReceipt: string, monthlyDues: { month: string; monthlyDues: number }[] ) => {
  const getApplicantsID = await db
    .select({ applicants_id: applicationStatusTable.applicants_id })
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.trackingId, trackingId))
    .limit(1);

  const getTemptDetails = await db
    .select({ temp_down_id: tempdownPaymentTable.temp_down_id, SINumber: tempdownPaymentTable.SINumber,})
    .from(tempdownPaymentTable)
    .where(eq(tempdownPaymentTable.applicants_id, getApplicantsID[0].applicants_id))
    .limit(1);

  const tempMonthID = await db
    .select({ temp_month_id: TempMonthsInSoaTable.temp_month_id })
    .from(TempMonthsInSoaTable)
    .where(eq(TempMonthsInSoaTable.applicants_id, getApplicantsID[0].applicants_id))

  const downPayment = await db
  .insert(downPaymentTable)
  .values({
    applicants_id: getApplicantsID[0].applicants_id,
    temp_down_id: getTemptDetails[0].temp_down_id,
    amount: DownPayment,
    paymentMethod: pm,
    academicYear_id: await getAcademicYearID(),
    downPaymentDate: new Date().toISOString().slice(0, 10),
    SINumber: getTemptDetails[0].SINumber,
  })
  .returning({ donw_id: downPaymentTable.donw_id });

  const downId =  downPayment[0].donw_id;
  for (const due of monthlyDues) {
    await db
    .insert(MonthsInSoaTable)
    .values({
      temp_month_id: tempMonthID[0].temp_month_id,
      downPaymentId: downId,
      applicants_id: getApplicantsID[0].applicants_id,
      academicYear_id: await getAcademicYearID(),
      month: due.month,
      monthlyDue: due.monthlyDues,
    });
  }


  await db
  .insert(fullPaymentTable)
  .values({
    applicants_id: getApplicantsID[0].applicants_id,
    payment_amount: totalTuition,
    payment_receipt: uploadReservationReceipt,
    paymentMethod: mop,
    paymentStatus: "Pending",
    academicYear_id: await getAcademicYearID(),
  })

  return { success: true, message: "Payment method updated successfully" }
  
}



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
      religion,
      ip,
      house_no_purok,
      barangay,
      city,
      province,
      motherTongue,
      mobileNumber,
      email,

      guardiansFirstName,
      guardiansMiddleName,
      guardiansLastName,
      guardiansSuffix,
      emergencyContact,
      emergencyEmail,
      relationship,

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
      itr,
      escCert,

      mop,
      reservationAmount,
      reservationReceipt,

      trackingId
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
        religion,
        ip,
        house_no_purok,
        barangay,
        city,
        province,
        motherTounge: motherTongue,
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
        emergencyContact,
        emergencyEmail,
        relationship,
      })
      .where(eq(guardianAndParentsTable.applicants_id, updatedStudent[0]?.applicants_id))
      .returning();

    const updatedEducationalBackground = await db
      .update(educationalBackgroundTable)
      .set({
        prevSchool,
        studentType,
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
        studentExitForm,
        form137,
        itr,
        escCert,
      })
      .where(eq(documentsTable.applicants_id, updatedStudent[0]?.applicants_id))
      .returning();

    const updatedReservationFee = await db
      .update(reservationFeeTable)
      .set({
        mop,
        reservationAmount,
        reservationReceipt,
      })
    .returning();
    
    // Get current application status
    const currentStatus = await db
      .select({
        applicationStatus: applicationStatusTable.applicationFormReviewStatus,
        reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus
      })
      .from(applicationStatusTable)
      .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id))
      .limit(1);

    // Only update status to Pending if it was previously Declined
    if (currentStatus[0]?.applicationStatus === "Declined" ) {
      await db
        .update(applicationStatusTable)
        .set({
          applicationFormReviewStatus: "Pending",
          dateOfApplication: new Date().toISOString().slice(0, 10),
        })
        .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id));
    } else if (currentStatus[0]?.reservationPaymentStatus === "Declined") {
        await db
          .update(applicationStatusTable)
          .set({
            dateOfApplication: new Date().toISOString().slice(0, 10),
            reservationPaymentStatus: "Pending"
          })
          .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id));
    } else {
      await db
        .update(applicationStatusTable)
        .set({
          applicationFormReviewStatus: "Pending",
          dateOfApplication: new Date().toISOString().slice(0, 10),
          reservationPaymentStatus: "Pending"
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

    
    // Function to send reservation email
    async function sendReservationEmail(email: string, trackingId: string) {

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
        subject: 'RE-Application Confirmation at Rizal Institute - Canlubang',
        text: `
        Dear Applicant,

        This is a confirmation that you have successfully re-apply at Rizal Institute - Canlubang.

        Tracking ID: ${trackingId}

        To track the status of your application, please use the following tracking ID: ${trackingId}
        You can use this ID to check on the progress of your application on our website or by contacting our 
        admissions office.

        If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

        Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

        Best regards,
        Rizal Institute - Canlubang
        `,
      };

      return transporter.sendMail(mailOptions);
    }


    await sendReservationEmail(email, trackingId);

    return {
      student: updatedStudent[0],
      guardian: updatedGuardian[0],
      educationalBackground: updatedEducationalBackground[0],
      document: updatedDocument[0],
      reservationFee: updatedReservationFee[0],
    };
  } catch (error) {
    console.error("Error updating student data:", error);
    throw new Error("Failed to update student and guardian data.");
  }
};



export const lateReservationFee = async (trackingId: string, updatedData: ReservationFee) => {
  try {
    // Extract student and guardian data separately
    const {

      mop,
      reservationAmount,
      reservationReceipt,
    } = updatedData;

    const getApplicantsId = await db
      .select({
          applicants_id: applicationStatusTable.applicants_id
      })
      .from(applicationStatusTable)
      .where(eq(applicationStatusTable.trackingId, trackingId))

    const id = getApplicantsId[0].applicants_id;

    const getEmail = await db
      .select({
          email: applicantsInformationTable.email
      })
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.applicants_id, id))

    const email = getEmail[0].email;

    const updatedReservationFee = await db
      .update(reservationFeeTable)
      .set({
        mop,
        reservationAmount,
        reservationReceipt,
      })
      .where(eq(reservationFeeTable.applicants_id, id))
    .returning();
    
    
// Function to send reservation email
async function sendReservationEmail(email: string, trackingId: string) {

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
    subject: 'Reservation Payment at Rizal Institute - Canlubang',
    text: `
    Dear Applicant,

    This is a confirmation that you have successfullt made a reservation payment for a slot at Rizal Institute - Canlubang.

    Tracking ID: ${trackingId}

    The cashier will promptly verify your payment. Once verified, you will receive a confirmation email.

    To track the status of your application, please use the following tracking ID: ${trackingId}
    You can use this ID to check on the progress of your application on our website or by contacting our 
    admissions office.

    If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

    Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

    Best regards,
    Rizal Institute - Canlubang
    `,
  };

  return transporter.sendMail(mailOptions);
}

await sendReservationEmail(email, trackingId);
    // // Get current application status
    // const currentStatus = await db
    //   .select({
    //     applicationStatus: applicationStatusTable.applicationFormReviewStatus
    //   })
    //   .from(applicationStatusTable)
    //   .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id))
    //   .limit(1);

    // // Only update status to Pending if it was previously Declined
    // if (currentStatus[0]?.applicationStatus === "Declined") {
    //   await db
    //     .update(applicationStatusTable)
    //     .set({
    //       applicationFormReviewStatus: "Pending",
    //       dateOfApplication: new Date().toISOString().slice(0, 10)
    //     })
    //     .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id));
    // }

    // // Update resolution status for both registrar and cashier remarks
    // await db
    //   .update(Registrar_remaks_table)
    //   .set({
    //     resolved_reg_remarks: true
    //   })
    //   .where(eq(Registrar_remaks_table.applicants_id, updatedStudent[0]?.applicants_id));

    // await db
    //   .update(Cashier_remaks_table)
    //   .set({
    //     resolved_cashier_remarks: true
    //   })
    //   .where(eq(Cashier_remaks_table.applicants_id, updatedStudent[0]?.applicants_id));

    return {
      // student: updatedStudent[0],
      // guardian: updatedGuardian[0],
      // educationalBackground: updatedEducationalBackground[0],
      // document: updatedDocument[0],
      reservationFee: updatedReservationFee[0],
    };
  } catch (error) {
    console.error("Error updating student data:", error);
    throw new Error("Failed to update student and guardian data.");
  }
};


export const tuitionFeeRePayment = async (trackingId: string, updatedData: ReservationFee) => {
  try {
    // Extract student and guardian data separately
    const {

      mop,
      reservationAmount,
      reservationReceipt,
    } = updatedData;

    const getApplicantsId = await db
      .select({
          applicants_id: applicationStatusTable.applicants_id
      })
      .from(applicationStatusTable)
      .where(eq(applicationStatusTable.trackingId, trackingId))

    const id = getApplicantsId[0].applicants_id;

    const getEmail = await db
      .select({
          email: applicantsInformationTable.email
      })
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.applicants_id, id))

    const email = getEmail[0].email;

    const updatedReservationFee = await db
      .update(fullPaymentTable)
      .set({
        paymentMethod: mop,
        payment_amount: reservationAmount,
        payment_receipt: reservationReceipt,
        paymentStatus: "Pending",
      })
      .where(eq(fullPaymentTable.applicants_id, id))
    .returning();
    
    
// Function to send reservation email
async function sendReservationEmail(email: string, trackingId: string) {

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
    subject: 'TUition Fee RE-Payment at Rizal Institute - Canlubang',
    text: `
    Dear Applicant,

    This is a confirmation that you have successfully made tuition re-payment for a slot at Rizal Institute - Canlubang.
    
    The cashier will promptly verify your payment. Once verified, you will receive a confirmation email.

    Tracking ID: ${trackingId}

    To track the status of your application, please use the following tracking ID: ${trackingId}
    You can use this ID to check on the progress of your application on our website or by contacting our 
    admissions office.

    If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

    Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

    Best regards,
    Rizal Institute - Canlubang
    `,
  };

  return transporter.sendMail(mailOptions);
}

await sendReservationEmail(email, trackingId);
    // // Get current application status
    // const currentStatus = await db
    //   .select({
    //     applicationStatus: applicationStatusTable.applicationFormReviewStatus
    //   })
    //   .from(applicationStatusTable)
    //   .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id))
    //   .limit(1);

    // // Only update status to Pending if it was previously Declined
    // if (currentStatus[0]?.applicationStatus === "Declined") {
    //   await db
    //     .update(applicationStatusTable)
    //     .set({
    //       applicationFormReviewStatus: "Pending",
    //       dateOfApplication: new Date().toISOString().slice(0, 10)
    //     })
    //     .where(eq(applicationStatusTable.applicants_id, updatedStudent[0]?.applicants_id));
    // }

    // // Update resolution status for both registrar and cashier remarks
    // await db
    //   .update(Registrar_remaks_table)
    //   .set({
    //     resolved_reg_remarks: true
    //   })
    //   .where(eq(Registrar_remaks_table.applicants_id, updatedStudent[0]?.applicants_id));

    await db
      .update(Cashier_remaks_table)
      .set({
        resolved_cashier_remarks: true
      })
      .where(and(
        eq(Cashier_remaks_table.applicants_id, id),
        eq(Cashier_remaks_table.resolved_cashier_remarks, false)
        ));

    return {
      // student: updatedStudent[0],
      // guardian: updatedGuardian[0],
      // educationalBackground: updatedEducationalBackground[0],
      // document: updatedDocument[0],
      reservationFee: updatedReservationFee[0],
    };
  } catch (error) {
    console.error("Error updating student data:", error);
    throw new Error("Failed to update student and guardian data.");
  }
};

export const checkGrades = async (lrn: string) => {
  const acad_id = await getAcademicYearID();
  if (!acad_id) return false;

  const prevAcad = acad_id - 1;

  const gradeCheck = await db
    .select({
      finalGrade: StudentGradesTable.finalGrade,
    })
    .from(StudentGradesTable)
    .leftJoin(
      StudentInfoTable,
      eq(StudentGradesTable.student_id, StudentInfoTable.student_id)
    )
    .where(
      and(
        eq(StudentInfoTable.lrn, lrn),
        eq(StudentGradesTable.academicYear_id, prevAcad)
      )
    );

  // If no grades → treat as incomplete
  if (gradeCheck.length === 0) return false;

  // Check if any finalGrade is null
  const hasMissing = gradeCheck.some((g) => g.finalGrade === null);

  return !hasMissing; // true = all good, false = missing grades
};


export const checkLRN = async (lrn: string) => {
  try {
    // Check in applicants table
    const applicantExists = await db
      .select()
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, lrn))
      .limit(1);

    if (applicantExists.length > 0) return true;

    // Check in students table
    const studentExists = await db
      .select()
      .from(StudentInfoTable)
      .where(eq(StudentInfoTable.lrn, lrn))
      .limit(1);

    return studentExists.length > 0;
  } catch (error) {
    console.error("Error checking LRN:", error);
    throw error;
  }
};

export const getPromotion = async (lrn: string) => {
  const academicYear = await db
  .select({
    academicYear_id: studentTypeTable.academicYear_id
  })
  .from(applicantsInformationTable)
  .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
  .where(eq(applicantsInformationTable.lrn, lrn))
  .limit(1);

if (!academicYear[0]?.academicYear_id) {
  return [];
}
  const allGrades = await db
  .select({
    remarks: StudentGradesTable.remarks,
  })
  .from(StudentGradesTable)
  .leftJoin(StudentInfoTable, eq(StudentGradesTable.student_id, StudentInfoTable.student_id))
  .where(and(
    eq(StudentGradesTable.academicYear_id, academicYear[0]?.academicYear_id),
    eq(StudentInfoTable.lrn, lrn))
  );
    
  const failedCount = allGrades.filter(g => g.remarks === "FAILED").length;

  let promotionStatus = "";

  if (failedCount === 0) {
    promotionStatus = "PROMOTED";
  } else if (failedCount <= 2) {
    promotionStatus = "SUMMER";
  } else {
    promotionStatus = "RETAINED";
  }

  await db
    .update(studentTypeTable)
    .set({
      promotion: promotionStatus,
    })
    .where(eq(studentTypeTable.academicYear_id, academicYear[0]?.academicYear_id));

  return;
}

export const oldStudentEnrollment = async (lrn: string) => {
  const getGrade = await db
  .select({
    gradeToEnroll: studentTypeTable.gradeToEnroll,
    promotion: studentTypeTable.promotion
  })
  .from(applicantsInformationTable)
  .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
  .where(eq(applicantsInformationTable.lrn, lrn))
  .orderBy(desc(studentTypeTable.studentType_id)) 
  .limit(1);

  return getGrade[0];
}


export const OldStudentEnrollment = async (
  lrn: string,
  mop: string, 
  reservationReceipt: string, 
  reservationAmount: number,
  gradeLevel: string,
  promotion: string,
) => {
  
  const getapplicantId = await db
  .select({
    applicants_id: applicantsInformationTable.applicants_id
  })
  .from(applicantsInformationTable)
  .where(eq(applicantsInformationTable.lrn, lrn)).limit(1);



  const applicantId = getapplicantId[0]?.applicants_id;
  const academicYearID = await getAcademicYearID();

  
  const getEmail = await db
  .select({
    email: applicantsInformationTable.email
  })
  .from(applicantsInformationTable)
  .where(eq(applicantsInformationTable.applicants_id, applicantId))
  .limit(1); 

  const email = getEmail[0]?.email;
  async function OldStudentEmail(email: string, trackingId: string) {

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
      subject: 'Application Confirmation at Rizal Institute - Canlubang',
      text: `
      Dear Applicant,

      We appreciate your interest in returning to our institution.
      This is a confirmation that we have received your application for re-admission to Rizal Institute - Canlubang.

      Tracking ID: ${trackingId}

      To track the status of your application, please use the following tracking ID: ${trackingId}
      You can use this ID to check on the progress of your application on our website or by contacting our 
      admissions office.

      If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

      Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

      Best regards,
      Rizal Institute - Canlubang
      `,
    };

    return transporter.sendMail(mailOptions);
  }

  await db.insert(reservationFeeTable).values({
    applicants_id: applicantId,
    academicYear_id: academicYearID,
    mop,
    reservationReceipt,
    reservationAmount,
    dateOfPayment: new Date().toISOString().slice(0, 10),
  })
  const trackingId = generateRandomTrackingId();
  await db.insert(applicationStatusTable).values({
    applicants_id: applicantId,
    academicYear_id: academicYearID,
    trackingId,
    applicationFormReviewStatus: 'Reserved',
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
  await db.insert(studentTypeTable).values({
    applicants_id: applicantId,
    academicYear_id: academicYearID,
    studentType : "Old Student",
    gradeToEnroll: gradeLevel,
    student_case: promotion === "PROMOTED" ? "REGULAR" : "REPEATER",
  });

  await OldStudentEmail(email, trackingId);

}



// export const enrollOldStudent = async (
//     lrn: string,
//     gradeLevel: string,
//     mop: string,
//     reservationReceipt: string,
//     reservationAmount: number,
// ) => {
//   const getStudentID = await db
//   .select({
//     applicants_id: applicantsInformationTable.applicants_id
//   })
//   .from(applicantsInformationTable)
//   .where(eq(applicantsInformationTable.lrn, lrn)).limit(1); 

//   const studentID = getStudentID[0]?.applicants_id;
//   const trackingId = generateRandomTrackingId();
//   const academicYearID = await getAcademicYearID();

//   const getEmail = await db
//   .select({
//     email: applicantsInformationTable.email
//   })
//   .from(applicantsInformationTable)
//   .where(eq(applicantsInformationTable.applicants_id, studentID)).limit(1); 

//   const email = getEmail[0]?.email;

//   await db
//   .insert(reservationFeeTable)
//   .values({
//     applicants_id: studentID,
//     mop,
//     reservationReceipt,
//     reservationAmount,
//     dateOfPayment: new Date().toISOString().slice(0, 10),
//     academicYear_id: academicYearID,
//   });


//   await db
//     .insert(applicationStatusTable)
//     .values({
//     applicants_id: studentID,
//     academicYear_id: academicYearID,
//     trackingId: trackingId,
//     applicationFormReviewStatus: 'Pending',
//     reservationPaymentStatus: 'Pending',
//     dateOfApplication: new Date().toISOString().slice(0, 10),
//   });

//   await db.insert(AdmissionStatusTable).values({
//     applicants_id: studentID,
//     academicYear_id: academicYearID,
//     admissionStatus: 'Pending',
//     confirmationStatus: 'Pending',
//     dateOfAdmission: new Date().toISOString().slice(0, 10),
//   });

//   await db.update(educationalBackgroundTable)
//   .set({
//     gradeLevel: gradeLevel,
//     studentType: 'Old Student',
//   })
//   .where(eq(educationalBackgroundTable.applicants_id, studentID));

        
// // Function to send reservation email
// async function sendReservationEmail(email: string, trackingId: string) {

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
//     subject: 'Application Confirmation at Rizal Institute - Canlubang',
//     text: `
//     Dear Applicant,

//     We appreciate your interest in returning to our institution.
//     This is a confirmation that we have received your application for re-admission to Rizal Institute - Canlubang.

//     Tracking ID: ${trackingId}

//     To track the status of your application, please use the following tracking ID: ${trackingId}
//     You can use this ID to check on the progress of your application on our website or by contacting our 
//     admissions office.

//     If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.

//     Thank you for choosing Rizal Institute - Canlubang. We look forward to seeing you soon!

//     Best regards,
//     Rizal Institute - Canlubang
//     `,
//   };

//   return transporter.sendMail(mailOptions);
// }
// await sendReservationEmail(email, trackingId);
// }




//server action for getting the status of enrollment period
export const nottice = async () => {

  const notice = await db
    .select({
      enrollment_period: EnrollmentStatusTable.enrollment_period,
      enrollment_start_date: EnrollmentStatusTable.enrollment_start_date,
      enrollment_end_date: EnrollmentStatusTable.enrollment_end_date,
      isActive: EnrollmentStatusTable.isActive,
    })
    .from(EnrollmentStatusTable)
    .leftJoin(AcademicYearTable, eq(EnrollmentStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(eq(AcademicYearTable.isActive, true))
    .limit(1);

  console.log(notice);
  return notice;
};
