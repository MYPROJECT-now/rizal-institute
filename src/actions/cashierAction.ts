"use server"

import { and, eq, or } from "drizzle-orm";
import { db } from "../db/drizzle";
import { AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, educationalBackgroundTable, reservationFeeTable, StudentInfoTable, downPaymentTable, MonthsInSoaTable, MonthlyPayementTable } from "../db/schema";
import { revalidatePath } from "next/cache";


  export const getAllEnrollees_cashier = async () => {
    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
      applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus
    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(or(eq(applicationStatusTable.applicationFormReviewStatus, "Pending"),eq(applicationStatusTable.reservationPaymentStatus, "Pending")))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
  return allEnrollees ;
  };


    export const getAllReservedSlot_cashier = async () => {
    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      aadmissionStatus: AdmissionStatusTable.admissionStatus,
    })
    .from(applicantsInformationTable)
    .where(and(eq(applicationStatusTable.applicationFormReviewStatus, "Reserved"), eq(applicationStatusTable.reservationPaymentStatus, "Reserved") ))
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees ;
  };


    export const acceptStudentsReservationPayment= async (id: number, reservationPaymentStatus: string) => {
    await db
    .update(applicationStatusTable)
    .set({
      reservationPaymentStatus: reservationPaymentStatus,
    })
    .where(eq(applicationStatusTable.applicants_id, id));
    revalidatePath("/");
  };

  export const getApplicantsPayment = async (lrn: string) => {
    const applicantsPayment = await db
    .select({
      reservationReceipt: reservationFeeTable.reservationReceipt,
    })
    .from(applicantsInformationTable)
    .leftJoin(reservationFeeTable, eq(applicantsInformationTable.applicants_id, reservationFeeTable.applicants_id))
    .where(eq(applicantsInformationTable.lrn, lrn));
    console.log("Fetched Enrollees:", applicantsPayment);    
    return applicantsPayment ;
  };


    
  
export const getEnrolledStudents = async () => {
  const enrolledStudents = await db.select({
    id: StudentInfoTable.student_id,
    lrn: StudentInfoTable.lrn,
    LastName: StudentInfoTable.studentLastName,
    FirstName: StudentInfoTable.studentFirstName,
    MiddleName: StudentInfoTable.studentMiddleName,
    Suffix: StudentInfoTable.studentSuffix,
  })
.from(StudentInfoTable)

console.log("Fetched Enrolled Students:", enrolledStudents);
return enrolledStudents;
}


export const getSOAsStudent = async (lrn: string) => {
  console.log("Fetching SOA data for LRN:", lrn);
  
  // Get student information and down payment in one query
  const studentAndDownPayment = await db
    .select({
      student_id: StudentInfoTable.student_id,
      lrn: StudentInfoTable.lrn,
      studentLastName: StudentInfoTable.studentLastName,
      studentFirstName: StudentInfoTable.studentFirstName,
      studentMiddleName: StudentInfoTable.studentMiddleName,
      studentSuffix: StudentInfoTable.studentSuffix,
      amount: downPaymentTable.amount,
      SINumberDP: downPaymentTable.SINumberDP,
      remarksDP: downPaymentTable.remarksDP,
    })
    .from(StudentInfoTable)
    .leftJoin(downPaymentTable, eq(StudentInfoTable.student_id, downPaymentTable.student_id))
    .where(eq(StudentInfoTable.lrn, lrn))
    .limit(1);

  console.log("Student and down payment data:", studentAndDownPayment);

  if (studentAndDownPayment.length === 0) {
    console.log("No student found for LRN:", lrn);
    return [];
  }

  const studentData = studentAndDownPayment[0];

  // Get monthly payments
  const monthlyPayments = await db
    .select({
      month_id: MonthsInSoaTable.month_id,
      month: MonthsInSoaTable.month,
      monthlyDue: MonthsInSoaTable.monthlyDue,
      amountPaid: MonthsInSoaTable.amountPaid,
      dateOfPayment: MonthsInSoaTable.dateOfPayment,
      SInumber: MonthsInSoaTable.SInumber,
      remarks: MonthsInSoaTable.remarks,
    })
    .from(MonthsInSoaTable)
    .where(eq(MonthsInSoaTable.student_id, studentData.student_id));

  console.log("Monthly payments data:", monthlyPayments);



  // Create result array with student info and down payment for each monthly payment
  const result = monthlyPayments.map(monthlyPayment => ({
    month_id: monthlyPayment.month_id,
    student_id: studentData.student_id,
    lrn: studentData.lrn,
    studentLastName: studentData.studentLastName,
    studentFirstName: studentData.studentFirstName,
    studentMiddleName: studentData.studentMiddleName,
    studentSuffix: studentData.studentSuffix,
    amount: studentData.amount || 0,
    SINumberDP: studentData.SINumberDP || "",
    remarksDP: studentData.remarksDP || "",
    month: monthlyPayment.month,
    dateOfPayment: monthlyPayment.dateOfPayment,
    remarks: monthlyPayment.remarks,
    SInumber: monthlyPayment.SInumber,
    monthlyDue: monthlyPayment.monthlyDue,
    amountPaid: monthlyPayment.amountPaid,
  }));

  console.log("Final result:", result);
  return result;
}


export const paymentToVerify = async () => {
  const paymentToVerify = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,  
    amount: MonthlyPayementTable.amount,
    SInumber: MonthlyPayementTable.SInumber,
    proofOfPayment: MonthlyPayementTable.proofOfPayment,
    modeOfPayment: MonthlyPayementTable.modeOfPayment,
    status: MonthlyPayementTable.status,
  })
  .from(MonthlyPayementTable)
  
  return paymentToVerify;
}

// Approve a monthly payment
export const approveMonthlyPayment = async (monthlyPaymentId: number, paidAmount: number) => {
  // Update MonthlyPayementTable status to 'Approved' and set dateOfPayment
  await db.update(MonthlyPayementTable)
    .set({
      status: 'Approved',
      dateOfPayment: new Date().toISOString().split('T')[0],
    })
    .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId));

  // Get the month_id for this payment
  const payment = await db.select({ month_id: MonthlyPayementTable.month_id })
    .from(MonthlyPayementTable)
    .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId));
  if (payment.length > 0) {
    // Update MonthsInSoaTable.amountPaid for this month
    await db.update(MonthsInSoaTable)
      .set({ amountPaid: paidAmount })
      .where(eq(MonthsInSoaTable.month_id, payment[0].month_id));
  }
  revalidatePath('/');
};



// Decline a monthly payment
export const declineMonthlyPayment = async (monthlyPaymentId: number) => {
  await db.update(MonthlyPayementTable)
    .set({ status: 'Declined' })
    .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId));
  revalidatePath('/');
};









// Get all pending monthly payments for approval
export const getPendingPayments = async () => {
  const payments = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
    student_id: MonthlyPayementTable.student_id,
    month_id: MonthlyPayementTable.month_id,
    amount: MonthlyPayementTable.amount,
    status: MonthlyPayementTable.status,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,
    SInumber: MonthlyPayementTable.SInumber,
  })
    .from(MonthlyPayementTable)
    .where(eq(MonthlyPayementTable.status, 'Pending'));
  return payments;
};