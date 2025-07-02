"use server"

import { and, desc, eq, } from "drizzle-orm";
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
      applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
      soaMonthId: MonthsInSoaTable.month_id, // ✅ just select a nullable column
    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))    
    .leftJoin(MonthsInSoaTable, eq(MonthsInSoaTable.month_id, applicationStatusTable.applicants_id))
  
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
      admissionStatus: AdmissionStatusTable.admissionStatus,
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
      downPaymentDate: downPaymentTable.downPaymentDate,
      SINumberDP: downPaymentTable.SINumberDP,
      remarksDP: downPaymentTable.remarksDP,
    })
    .from(StudentInfoTable)
    .leftJoin(MonthsInSoaTable, eq(StudentInfoTable.student_id, MonthsInSoaTable.student_id))
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
    .where(eq(MonthsInSoaTable.student_id, studentData.student_id))
    .orderBy(MonthsInSoaTable.month_id);
    

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
    downPaymentDate: studentData.downPaymentDate || "",
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
    month_id: MonthlyPayementTable.month_id,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,  
    amount: MonthlyPayementTable.amount,
    SInumber: MonthlyPayementTable.SInumber,
    proofOfPayment: MonthlyPayementTable.proofOfPayment,
    modeOfPayment: MonthlyPayementTable.modeOfPayment,
    status: MonthlyPayementTable.status,
  })
  .from(MonthlyPayementTable)
  .leftJoin(MonthsInSoaTable, eq(MonthlyPayementTable.month_id, MonthsInSoaTable.month_id))

  return paymentToVerify;
}




// Get all pending monthly payments for approval
export const getPendingPayments = async () => {
  const payments = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
    month_id: MonthlyPayementTable.month_id,
    student_id: MonthlyPayementTable.student_id,
    amount: MonthlyPayementTable.amount,
    status: MonthlyPayementTable.status,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,
    SInumber: MonthlyPayementTable.SInumber,
  })
    .from(MonthlyPayementTable)
    .where(eq(MonthlyPayementTable.status, 'Pending'));
  return payments;
};




export const acceptPayment = async (monthlyPaymentId: number, month_id: number, amount: number) => {

  const result = await db.select({
    SInumber: MonthlyPayementTable.SInumber,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,
  })
  .from(MonthlyPayementTable)
  .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId))

  const SINumber = result[0].SInumber;
  const dateOfPayment = result[0].dateOfPayment;

  await db.update(MonthlyPayementTable)
    .set({ status: 'Approved' })
    .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId));
  revalidatePath('/');

  await db.update(MonthsInSoaTable)
    .set({ 
      amountPaid: amount, 
      SInumber: SINumber,
      dateOfPayment: dateOfPayment,
    })
    .where(eq(MonthsInSoaTable.month_id, month_id));
};

export const declinePayment = async (monthlyPaymentId: number,) => {
  await db.update(MonthlyPayementTable)
    .set({ status: 'Declined' })
    .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId));
  revalidatePath('/');
};

// Get the count of pending applicants
export const getPendingApplicantsCount = async () => {
  const allEnrollees = await db.select({
    id: applicantsInformationTable.applicants_id,
  })
    .from(applicantsInformationTable)
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(eq(applicationStatusTable.reservationPaymentStatus, "Pending"));
  return allEnrollees.length;
};

// Get the count of reserved slots
export const getReservedSlotCount = async () => {
  const allReserved = await db.select({
    id: applicantsInformationTable.applicants_id,
  })
    .from(applicantsInformationTable)
    .where( eq(applicationStatusTable.reservationPaymentStatus, "Reserved"))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
  return allReserved.length;
};

// Get the count of pending student payments
export const getPendingPaymentsCount = async () => {
  const payments = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
  })
    .from(MonthlyPayementTable)
    .where(eq(MonthlyPayementTable.status, 'Pending'));
  return payments.length;
};

export const getRecentPayments = async () => {
  const recentPayments = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
    student_id: MonthlyPayementTable.student_id,
    lrn: StudentInfoTable.lrn,
    studentLastName: StudentInfoTable.studentLastName,
    studentFirstName: StudentInfoTable.studentFirstName,
    studentMiddleName: StudentInfoTable.studentMiddleName,
    studentSuffix: StudentInfoTable.studentSuffix,
    amount: MonthlyPayementTable.amount,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,
  })
    .from(MonthlyPayementTable)
    .leftJoin(StudentInfoTable, eq(MonthlyPayementTable.student_id, StudentInfoTable.student_id))
    .orderBy(desc(MonthlyPayementTable.dateOfPayment))
    .limit(5);
  return recentPayments;
};


