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
  StudentInfoTable,
  EnrollmentStatusTable,
  TempMonthsInSoaTable,
  tempdownPaymentTable,
  downPaymentTable,
  MonthsInSoaTable,
  fullPaymentTable,
  BreakDownTable,
  AcademicYearTable,
} from "../db/schema";
import { and, eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import { ReservationFee, StudentUpdateData } from "../type/reApplication/re_applicationType";
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

    tracking ID: ${trackingId}

    To track the status of your application, please use the following tracking ID: ${trackingId}
    You can use this ID to check on the progress of your application on our website or by contacting our 
    admissions office.
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
        hasForm137: !!form137
      }),
      db.insert(reservationFeeTable).values({
        applicants_id: applicantId,
        academicYear_id: academicYearID,
        mop,
        reservationReceipt,
        reservationAmount,
        dateOfPayment: new Date().toISOString().slice(0, 10),
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
          .where(
              eq(applicationStatusTable.trackingId, trackingId),
            )
          .limit(1);

        if (result.length > 0) {
                console.log("Reservation ID:", result[0].hasPaidReservation);
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
                studentType: educationalBackgroundTable.studentType,
                prevSchool: educationalBackgroundTable.prevSchool,
                schoolAddress: educationalBackgroundTable.schoolAddress,

                birthCert: documentsTable.birthCert,
                reportCard: documentsTable.reportCard,
                goodMoral: documentsTable.goodMoral,
                idPic: documentsTable.idPic,
                studentExitForm: documentsTable.studentExitForm,
                form137: documentsTable.form137,

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
  const applicantID = await db
    .select({ applicants_id: applicationStatusTable.applicants_id })
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.trackingId, trackingId))
    .limit(1);

  const getTotalTuition = await db
    .select({ total: BreakDownTable.totalTuitionFee})
    .from(BreakDownTable)
    .where(eq(BreakDownTable.applicants_id, applicantID[0].applicants_id))

  const MonthlyDues = await db
    .select({ 
      month: TempMonthsInSoaTable.temp_month,
      monthlyDues: TempMonthsInSoaTable.temp_monthlyDue
     })
    .from(TempMonthsInSoaTable)
    .where(eq(TempMonthsInSoaTable.applicants_id, applicantID[0].applicants_id))

  const Down = await db
  .select({
    amount: tempdownPaymentTable.amount,
  })
  .from(tempdownPaymentTable)
  .where(eq(tempdownPaymentTable.applicants_id, applicantID[0].applicants_id))

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
  })
  .from(BreakDownTable)
  .where(eq(BreakDownTable.applicants_id, applicantID[0].applicants_id))
  
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


export const full_payment = async (trackingId: string, pm: string, DownPayment: number, totalTuition: number, mop: string, uploadReservationReceipt: string) => {
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

  await db
  .insert(downPaymentTable)
  .values({
    applicants_id: getApplicantsID[0].applicants_id,
    temp_down_id: getTemptDetails[0].temp_down_id,
    amount: DownPayment,
    paymentMethod: pm,
    academicYear_id: await getAcademicYearID(),
    downPaymentDate: new Date().toISOString().slice(0, 10),
    SINumber: getTemptDetails[0].SINumber,
  });

  await db
  .insert(fullPaymentTable)
  .values({
    applicants_id: getApplicantsID[0].applicants_id,
    payment_amount: totalTuition,
    payment_receipt: uploadReservationReceipt,
    paymentMethod: mop,
    paymentStatus: "Pending",
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
      form137,

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
        studentExitForm,
        form137,
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



export const enrollOldStudent = async (
    lrn: string,
    gradeLevel: string,
    mop: string,
    reservationReceipt: string,
    reservationAmount: number,
) => {
  const getStudentID = await db
  .select({
    applicants_id: applicantsInformationTable.applicants_id
  })
  .from(applicantsInformationTable)
  .where(eq(applicantsInformationTable.lrn, lrn)).limit(1); 

  const studentID = getStudentID[0]?.applicants_id;
  const trackingId = generateRandomTrackingId();
  const academicYearID = await getAcademicYearID();

  const getEmail = await db
  .select({
    email: applicantsInformationTable.email
  })
  .from(applicantsInformationTable)
  .where(eq(applicantsInformationTable.applicants_id, studentID)).limit(1); 

  const email = getEmail[0]?.email;

  await db
  .insert(reservationFeeTable)
  .values({
    applicants_id: studentID,
    mop,
    reservationReceipt,
    reservationAmount,
    dateOfPayment: new Date().toISOString().slice(0, 10),
    academicYear_id: academicYearID,
  });



      await db
      .insert(applicationStatusTable)
      .values({
      applicants_id: studentID,
      academicYear_id: academicYearID,
      trackingId: trackingId,
      applicationFormReviewStatus: 'Pending',
      reservationPaymentStatus: 'Pending',
      dateOfApplication: new Date().toISOString().slice(0, 10),
    });

    await db.insert(AdmissionStatusTable).values({
      applicants_id: studentID,
      academicYear_id: academicYearID,
      admissionStatus: 'Pending',
      confirmationStatus: 'Pending',
      dateOfAdmission: new Date().toISOString().slice(0, 10),
    });

    await db.update(educationalBackgroundTable)
    .set({
      gradeLevel: gradeLevel,
      studentType: 'Old Student',
    })
    .where(eq(educationalBackgroundTable.applicants_id, studentID));

        
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
await sendReservationEmail(email, trackingId);
}




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
