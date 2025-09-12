"use server"

import { and, desc, eq, like, lte, } from "drizzle-orm";
import { db } from "../db/drizzle";
import { AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, educationalBackgroundTable, reservationFeeTable, StudentInfoTable, downPaymentTable, MonthsInSoaTable, MonthlyPayementTable, AcademicYearTable, StudentGradesTable, GradeLevelTable, additionalInformationTable, auditTrailsTable, fullPaymentTable, tempdownPaymentTable, grantAvailable, BreakDownTable, TempMonthsInSoaTable } from "../db/schema";
import { revalidatePath } from "next/cache";
import { requireStaffAuth } from "./utils/staffAuth";
import { getAcademicYearID, getSelectedAcademicYear } from "./utils/academicYear";
import { getStaffCredentials } from "./utils/staffID";
import nodemailer from 'nodemailer';


  export const getAllEnrollees_cashier = async () => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const selectedAcademicYear = await getSelectedAcademicYear();

    if (!selectedAcademicYear) {
      console.warn("❌ No academic year selected");
      return [];
    }

    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      reservationReceipt: reservationFeeTable.reservationReceipt,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
      applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
      isActive: AcademicYearTable.isActive,
      // soaMonthId: MonthsInSoaTable.month_id, // ✅ just select a nullable column
    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))    
    .leftJoin(reservationFeeTable, eq(applicantsInformationTable.applicants_id, reservationFeeTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(and(
      eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear),
      eq(reservationFeeTable.academicYear_id, selectedAcademicYear),
      eq(applicationStatusTable.academicYear_id, selectedAcademicYear),
    ))
  
    console.log("Fetched Enrollees:", allEnrollees);
    
  return allEnrollees ;
  };


    export const getAllReservedSlot_cashier = async () => {
      await requireStaffAuth(["cashier"]); // gatekeeper

      const selectedAcademicYear = await getSelectedAcademicYear();

      if (!selectedAcademicYear) {
        console.warn("❌ No academic year selected");
        return [];
      }
      const allEnrollees = await db.select({
        id: applicantsInformationTable.applicants_id,
        lrn: applicantsInformationTable.lrn,
        lastName: applicantsInformationTable.applicantsLastName,
        firstName: applicantsInformationTable.applicantsFirstName,
        middleName: applicantsInformationTable.applicantsMiddleName,
        gradeLevel: educationalBackgroundTable.gradeLevel,
        admissionStatus: AdmissionStatusTable.admissionStatus,
        soaMonthId: tempdownPaymentTable.temp_down_id, // ✅ just select a nullable column

      })
      .from(applicantsInformationTable)
      .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
      .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
      .leftJoin(tempdownPaymentTable, eq(applicantsInformationTable.applicants_id, tempdownPaymentTable.applicants_id))
      .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
      .where(and(eq(applicationStatusTable.applicationFormReviewStatus, "Reserved"), eq(applicationStatusTable.reservationPaymentStatus, "Reserved"), eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear)))
    
      console.log("Fetched Enrollees:", allEnrollees);
      
      return allEnrollees;
    };


  export const acceptStudentsReservationPayment= async (id: number, reservationPaymentStatus: string) => {
    
    await requireStaffAuth(["admin"]); // gatekeeper

    await db
    .update(applicationStatusTable)
    .set({
      reservationPaymentStatus: reservationPaymentStatus,
    })
    .where(eq(applicationStatusTable.applicants_id, id));
    revalidatePath("/");
  };

  export const getApplicantsPayment = async (lrn: string) => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const applicantsPayment = await db
    .select({
      reservationAmount: reservationFeeTable.reservationAmount,
      reservationReceipt: reservationFeeTable.reservationReceipt,
    })
    .from(applicantsInformationTable)
    .leftJoin(reservationFeeTable, eq(applicantsInformationTable.applicants_id, reservationFeeTable.applicants_id))
    .where(eq(applicantsInformationTable.lrn, lrn));
    console.log("Fetched Enrollees:", applicantsPayment);    
    return applicantsPayment ;
  };

    export const getFUllPayment = async (lrn: string) => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const applicantsPayment = await db
    .select({
      reservationAmount: fullPaymentTable.payment_amount,
      reservationReceipt: fullPaymentTable.payment_receipt,
    })
    .from(applicantsInformationTable)
    .leftJoin(fullPaymentTable, eq(applicantsInformationTable.applicants_id, fullPaymentTable.applicants_id))
    .where(eq(applicantsInformationTable.lrn, lrn));
    console.log("Fetched Enrollees:", applicantsPayment);    
    return applicantsPayment ;
  };

  export const getDiscountClass = async (lrn: string) => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const discountClass = await db
    .select({
      attainment: additionalInformationTable.AttainmentUponGraduation,
      gpa: additionalInformationTable.ConsistentGPA,
      hasSibling: additionalInformationTable.HasEnrolledSibling,
      reservationAmount: reservationFeeTable.reservationAmount,
      dateOfPayment: reservationFeeTable.dateOfPayment
    })
    .from(additionalInformationTable)
    .leftJoin(applicantsInformationTable, eq(additionalInformationTable.applicants_id, applicantsInformationTable.applicants_id))
    .leftJoin(reservationFeeTable, eq(applicantsInformationTable.applicants_id, reservationFeeTable.applicants_id))
    .where(eq(applicantsInformationTable.lrn, lrn));
    console.log("Fetched Enrollees:", discountClass);    
    return discountClass;
  }

  

    
  
export const getEnrolledStudents = async () => {
  await requireStaffAuth(["cashier"]); // gatekeeper
    const selectedAcademicYear = await getSelectedAcademicYear();

    if (!selectedAcademicYear) {
      console.warn("❌ No academic year selected");
      return [];
    }

  const enrolledStudents = await db
    .selectDistinctOn([StudentInfoTable.lrn], {
    lrn: StudentInfoTable.lrn,
    studentLastName: StudentInfoTable.studentLastName,
    studentFirstName: StudentInfoTable.studentFirstName,
    studentMiddleName: StudentInfoTable.studentMiddleName,
    studentSuffix: StudentInfoTable.studentSuffix,
    gradeLevelName: GradeLevelTable.gradeLevelName,
  })
  .from(StudentInfoTable)
  .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
  .leftJoin(StudentGradesTable, eq(StudentInfoTable.student_id, StudentGradesTable.student_id))
  .leftJoin(GradeLevelTable, eq(StudentGradesTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
  .where(eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear));

console.log("Fetched Enrolled Students:", enrolledStudents);
return enrolledStudents;
}


export const getSOAsStudent = async (lrn: string) => {
  await requireStaffAuth(["cashier"]); // gatekeeper

  console.log("Fetching SOA data for LRN:", lrn);
  
  // Get student information and down payment in one query
  const studentAndDownPayment = await db
    .select({
      student_id: StudentInfoTable.applicants_id,
      lrn: StudentInfoTable.lrn,
      studentLastName: StudentInfoTable.studentLastName,
      studentFirstName: StudentInfoTable.studentFirstName,
      studentMiddleName: StudentInfoTable.studentMiddleName,
      studentSuffix: StudentInfoTable.studentSuffix,
      amount: downPaymentTable.amount,
      downPaymentDate: downPaymentTable.downPaymentDate,
      SINumberDP: downPaymentTable.SINumberDP,
      remarksDP: downPaymentTable.remarksDP,
      paymentMethod: downPaymentTable.paymentMethod
    })
    .from(StudentInfoTable)
    .leftJoin(MonthsInSoaTable, eq(StudentInfoTable.applicants_id, MonthsInSoaTable.applicants_id))
    .leftJoin(downPaymentTable, eq(StudentInfoTable.applicants_id, downPaymentTable.applicants_id))
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
    .where(eq(MonthsInSoaTable.applicants_id, studentData.student_id ?? 0))
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
    paymentMethod: studentData.paymentMethod || "",
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

  export const updateSoa = async ( month_id: number, month: string, monthlyDue: number) => {
    await db
      .update(MonthsInSoaTable)
      .set({ month: month, monthlyDue: monthlyDue })
      .where(eq(MonthsInSoaTable.month_id, month_id));
  }




export const paymentToVerify = async () => {
  await requireStaffAuth(["cashier"]); // gatekeeper

  const paymentToVerify = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
    month_id: MonthlyPayementTable.month_id,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,  
    amount: MonthlyPayementTable.amount,
    SInumber: MonthlyPayementTable.SInumber,
    proofOfPayment: MonthlyPayementTable.proofOfPayment,
    modeOfPayment: MonthlyPayementTable.modeOfPayment,
    status: MonthlyPayementTable.status,
    isActive: AcademicYearTable.isActive,
    lrn: StudentInfoTable.lrn,

  })
  .from(MonthlyPayementTable)
  .leftJoin(MonthsInSoaTable, eq(MonthlyPayementTable.month_id, MonthsInSoaTable.month_id))
  .leftJoin(AcademicYearTable, eq(MonthlyPayementTable.academicYear_id, AcademicYearTable.academicYear_id))
  .leftJoin(StudentInfoTable, eq(MonthlyPayementTable.student_id, StudentInfoTable.student_id))

  

  return paymentToVerify;
}




// Get all pending monthly payments for approval
export const getPendingPayments = async () => {
  await requireStaffAuth(["cashier"]); // gatekeeper


  const payments = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
    month_id: MonthlyPayementTable.month_id,
    student_id: MonthlyPayementTable.student_id,
    amount: MonthlyPayementTable.amount,
    status: MonthlyPayementTable.status,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,
    SInumber: MonthlyPayementTable.SInumber,
    lrn: StudentInfoTable.lrn
  })
    .from(MonthlyPayementTable)
    .leftJoin(StudentInfoTable, eq(MonthlyPayementTable.student_id, StudentInfoTable.student_id))
    .where(eq(MonthlyPayementTable.status, 'Pending'));
  return payments;
};




export const acceptPayment = async (monthlyPaymentId: number, month_id: number, amount: number, lrn: string) => {
  await requireStaffAuth(["cashier"]);

  const result = await db.select({
    SInumber: MonthlyPayementTable.SInumber,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,
  })
  .from(MonthlyPayementTable)
  .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId))

  const SINumber = result[0].SInumber;
  const dateOfPayment = result[0].dateOfPayment;

  const credentials = await getStaffCredentials();
     
  if (!credentials) return null;

  const username = credentials?.clerk_username;
  const userType = credentials?.userType;

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

    await db
      .insert(auditTrailsTable)
      .values({
       username: username,
       usertype: userType,
       actionTaken: "Payment Accepted",
       dateOfAction: new Date().toISOString(),
       actionTakenFor: lrn,
       academicYear_id: await getAcademicYearID(),
      }) ;
};

export const declinePayment = async (monthlyPaymentId: number, lrn: string) => {
  await requireStaffAuth(["cashier"]);

  const credentials = await getStaffCredentials();
     
  if (!credentials) return null;

  const username = credentials?.clerk_username;
  const userType = credentials?.userType;
  await db.update(MonthlyPayementTable)
    .set({ status: 'Declined' })
    .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId));
  revalidatePath('/');

  await db
    .insert(auditTrailsTable)
    .values({
      username: username,
      usertype: userType,
      actionTaken: "Payment Declined",
      dateOfAction: new Date().toISOString(),
      actionTakenFor: lrn,
      academicYear_id: await getAcademicYearID(),
    }) ;
};

// Get the count of pending applicants
export const getPendingApplicantsCount = async () => {
  await requireStaffAuth(["cashier"]); // gatekeeper


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
  await requireStaffAuth(["cashier"]); // gatekeeper

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
  await requireStaffAuth(["cashier"]); // gatekeeper

  const payments = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
  })
    .from(MonthlyPayementTable)
    .where(eq(MonthlyPayementTable.status, 'Pending'));
  return payments.length;
};

export const getRecentPayments = async () => {
  await requireStaffAuth(["cashier"]); // gatekeeper
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


  export const getTotal = async () => {
    // get current month and match in db to get the id
    const today = new Date();
    const currentMonth = today.toLocaleString("default", { month: "long"});
    console.log("Current month:", currentMonth);

    const currentMonthRow = await db
      .select({ month_id: MonthsInSoaTable.month_id, month: MonthsInSoaTable.month })
      .from(MonthsInSoaTable)
      .where(
        and(
          like(MonthsInSoaTable.month, `${currentMonth}%`),
          eq(MonthsInSoaTable.academicYear_id, 1)
        )
      )


    if (currentMonthRow.length === 0) {
      console.warn("No current month found in DB, returning empty chart data.");
      return[];
    }

      const currentMonthId = currentMonthRow[0].month_id;
      console.log("Current month ID:", currentMonthId);

    // fetch all month up to the current month
    const subquery = db
    .select({
      applicants_id: StudentInfoTable.applicants_id,
      student_id: StudentGradesTable.student_id,
      gradeLevel_id: StudentGradesTable.gradeLevel_id,
    })
    .from(StudentGradesTable)
    .leftJoin(StudentInfoTable, eq(StudentGradesTable.student_id, StudentInfoTable.student_id))
    .groupBy(StudentGradesTable.student_id, StudentGradesTable.gradeLevel_id, StudentInfoTable.applicants_id)
    .as("gradeLevels");

    const monthsUpToCurrent = await db
    .select({
      applicants_id: MonthsInSoaTable.applicants_id,
      gradeLevel_id : subquery.gradeLevel_id,
      monthlyDue: MonthsInSoaTable.monthlyDue,
      amountPaid: MonthsInSoaTable.amountPaid,
    })
    .from(MonthsInSoaTable)
    .leftJoin(subquery, eq(MonthsInSoaTable.applicants_id, subquery.applicants_id))
    .where(
      and(
        lte(MonthsInSoaTable.month_id, currentMonthId),
        eq(MonthsInSoaTable.academicYear_id, 1)
      )
    );

    console.log("🧾 Months data (up to current):", monthsUpToCurrent);


    // get the the totals per student
    const studentMap = new Map();

    for (const row of monthsUpToCurrent) {
      const sid = row.applicants_id;

      if(!studentMap.has(sid)) {
        studentMap.set(sid, {
          gradeLevel_id: row.gradeLevel_id, 
          totalDue: 0,
          totalPaid: 0
        })
      }
      
      const data = studentMap.get(sid);
      data.totalDue += row.monthlyDue;
      data.totalPaid += row.amountPaid;
    }

    console.log("aggregate total per student:", [...studentMap.entries()]);

    // count the totals per grade level

    // type statusType = "uptoDate" | "late" | "none";

    type GradeLevelStatus = {
      uptoDate: number;
      late: number;
      none: number;
    }

    const resultPerGradeLevel: Record<number, GradeLevelStatus> = {}

    for (const  [,data] of studentMap.entries()) {
      const { gradeLevel_id, totalDue, totalPaid } = data;
      let status: "uptoDate" | "late" | "none";
      
      if (totalPaid === 0) status= "none";
      else if(totalPaid >= totalDue) status = "uptoDate";
      else status = "late"; 

      if(!resultPerGradeLevel[gradeLevel_id]) {
        resultPerGradeLevel[gradeLevel_id] = {
          uptoDate: 0,
          late: 0,
          none: 0
        }
      }

      resultPerGradeLevel[gradeLevel_id][status] ++;
    }

    console.log( "final result per gradelevel:", resultPerGradeLevel);
    
    // return the result
    const gradeLevels = await db
    .select({
        gradeLevel_id: GradeLevelTable.gradeLevel_id,
        gradeLevelName: GradeLevelTable.gradeLevelName,
      })
      .from(GradeLevelTable);

    const gradeLevelMap = new Map<number, string>();
    gradeLevels.forEach((g) => gradeLevelMap.set(g.gradeLevel_id, g.gradeLevelName));

    const chartData = Object.entries(resultPerGradeLevel).map(
    ([gradeLevelIdStr, counts]) => {
        const gradeLevelId = Number(gradeLevelIdStr);
        const gradeLevelName = gradeLevelMap.get(gradeLevelId) ?? `Unknown (${gradeLevelId})`;

        return {
          gradeLevel: gradeLevelName, // ✅ proper label
          upToDate: counts.uptoDate,
          late: counts.late,
          none: counts.none,
        };
      }
    );

    console.log("📈 Chart Data:", chartData);
    return chartData;

  }

export const getTotalperMonth = async () => {

  const year = await getSelectedAcademicYear();

  if (!year) {
    console.warn("❌ No academic year selected");
    return [];
    
  }
  // Get current date
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  console.log("Current month:", currentMonth);

  // Get current month_id from DB
  const currentMonthRow = await db
    .select({
      month_id: MonthsInSoaTable.month_id,
      month: MonthsInSoaTable.month,
    })
    .from(MonthsInSoaTable)
    .where(
      and(
        like(MonthsInSoaTable.month, `${currentMonth}%`),
        eq(MonthsInSoaTable.academicYear_id, year)
      )
    );

  if (currentMonthRow.length === 0) {
    console.warn("No current month found in DB, returning empty chart data.");
    return[];
  }

  const currentMonthId = currentMonthRow[0].month_id;
  console.log("Current month ID:", currentMonthId);

  // Fetch all months up to current month
  const monthsUpToCurrent = await db
    .select({
      amountPaid: MonthsInSoaTable.amountPaid,
      month: MonthsInSoaTable.month,
    })
    .from(MonthsInSoaTable)
    .where(
      and(
        lte(MonthsInSoaTable.month_id, currentMonthId),
        eq(MonthsInSoaTable.academicYear_id, 1)
      )
    );

  // Aggregate total paid per "Month Year"
  const monthlyTotalMap = new Map<string, number>();

  for (const row of monthsUpToCurrent) {
    const parsedDate = new Date(row.month); // e.g., "July 5, 2025"
    if (isNaN(parsedDate.getTime())) continue;

    const key = parsedDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    }); // e.g., "July 2025"

    if (!monthlyTotalMap.has(key)) {
      monthlyTotalMap.set(key, 0);
    }

    monthlyTotalMap.set(key, monthlyTotalMap.get(key)! + row.amountPaid);
  }

  // Sort and format
  const result = [...monthlyTotalMap.entries()]
    .map(([month, totalPaid]) => ({
      month,
      totalPaid,
      sortKey: new Date(`${month} 1`).getTime(),
    }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ month, totalPaid }) => ({ month, totalPaid }));

  console.log("📊 Total Paid Per Month (up to current):", result);
  return result;
};


export const getItsPayment = async (selectedID: number) => {
  await requireStaffAuth(["cashier"]); // gatekeeper

  const paymentReceipt = await db.select({
    amount: MonthlyPayementTable.amount,
    proofOfPayment: MonthlyPayementTable.proofOfPayment,
  })
    .from(MonthlyPayementTable)
    .where(eq(MonthlyPayementTable.monthlyPayment_id, selectedID ));
  return paymentReceipt;
} 

export const sendReceipt = async (selectedID: number, SInumber: string, ) => {
  await requireStaffAuth(["cashier"]); // gatekeeper

  const data = await db
  .select({
    amount: MonthlyPayementTable.amount,
    month_id: MonthlyPayementTable.month_id,
  })
  .from(MonthlyPayementTable)
  .where(eq(MonthlyPayementTable.monthlyPayment_id, selectedID));

  const month_id = data[0].month_id;
  const amount = data[0].amount;

  if (!month_id || !amount) {
    console.warn("❌ No month_id or amount found for payment");
    return;
  }

  await db
    .update(MonthlyPayementTable)
    .set({ 
      SInumber: SInumber,
      dateOfVerification: new Date().toLocaleDateString(),
      status: "Approved",
     })
    .where(eq(MonthlyPayementTable.monthlyPayment_id, selectedID ));


    await db
    .update(MonthsInSoaTable)
    .set({ 
      amountPaid: amount
         })
    .where(eq(MonthsInSoaTable.month_id, month_id ));
  return;
}


  export const getFullPayments = async () => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const selectedAcademicYear = await getSelectedAcademicYear();

    if (!selectedAcademicYear) {
      console.warn("❌ No academic year selected");
      return [];
    }

    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      payment_amount: fullPaymentTable.payment_amount,
      payment_receipt: fullPaymentTable.payment_receipt,
      payment_status: fullPaymentTable.paymentStatus,
      paymentMethod: fullPaymentTable.paymentMethod,
      isActive: AcademicYearTable.isActive,
      // soaMonthId: MonthsInSoaTable.month_id, // ✅ just select a nullable column
    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(downPaymentTable, eq(applicantsInformationTable.applicants_id, downPaymentTable.applicants_id))
    .leftJoin(fullPaymentTable, eq(applicantsInformationTable.applicants_id, fullPaymentTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(eq(downPaymentTable.paymentMethod, "full_payment"))

    console.log("Fetched Enrollees:", allEnrollees);
    
  return allEnrollees ;
  };

  export const getESC = async () => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const selectedAcademicYear = await getSelectedAcademicYear();

    if (!selectedAcademicYear) {
      console.warn("❌ No academic year selected");
      return [];
    }

    const grant = await db.select({
      grantAvailable: grantAvailable.grantAvailable,
    })
    .from(grantAvailable)
    .where(eq(grantAvailable.academicYear_id, selectedAcademicYear));

    return grant.length > 0 ? grant[0].grantAvailable : 0;
  }

  export const addGrant = async (grant: number) => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const currentYear = await getAcademicYearID();

    await db
    .insert(grantAvailable)
    .values({
      grantAvailable: grant,
      academicYear_id: currentYear ?? 0,
    });

    return { message: "Grant Added" };
  }



  export const addBreakDown = async (
    lrn: string,
    tuition: number,
    miscellaneous: number,
    acad: string,
    sibling: string,
    other_discount: number,
    other_fees: number,
  ) => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const currentYear = await getAcademicYearID();

    const getLrn = await db
      .select({
        id: applicantsInformationTable.applicants_id,
      })
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, lrn));

    if (!getLrn) {
      console.warn("❌ No lrn found");
      return {message: "no lrn found"};
    }

    // let esc = 10;

    const escValue = await db
      .select({
        grantAvailable: grantAvailable.grantAvailable,
      })
      .from(grantAvailable)
      .where(eq(grantAvailable.academicYear_id, currentYear));

    let grant = 0;
    if (escValue[0].grantAvailable > 0) {
      grant = 9000;
    } else if (escValue[0].grantAvailable < 0) {
      grant = 0;
    }

    // --- Step 1: base tuition
    const base = tuition + miscellaneous - grant;
    console.log("Step 1 – Base (tuition + misc - grant):", base);


    // --- Step 2: academic discount
    let acadDiscount = 0;
    if (acad === "With Honor") {
      acadDiscount = Math.ceil(base * 0.20);
    } else if (acad === "With High Honor") {
      acadDiscount = Math.ceil(base * 0.50);
    } else if (acad === "With Highest Honor") {
      acadDiscount = Math.ceil(base * 0.75);
    }
    console.log("Step 2 – Academic Discount:", acadDiscount);

    let net = base - acadDiscount;

    // --- Step 3: sibling discount
    const siblingDiscount = sibling === "yes" ? 500 : 0;
    console.log("Step 3 – Sibling Discount:", siblingDiscount);
    net -= siblingDiscount;

    // --- Step 4: other discount
    const otherDisc = other_discount ?? 0;
    console.log("Step 4 – Other Discount:", otherDisc);
    net -= otherDisc;

    // --- Step 5: add other fees
    const finalPayable = net + (other_fees ?? 0);
    console.log("Step 5 – After Adding Other Fees:", finalPayable);

    
    const getStartandEnd = await db
      .select({
        start: AcademicYearTable.academicYearStart,
        end: AcademicYearTable.academicYearEnd,
      })
      .from(AcademicYearTable)
      .where(eq(AcademicYearTable.isActive, true));

    const startDate = new Date(getStartandEnd[0].start);
    const endDate = new Date(getStartandEnd[0].end);

    const months: string[] = [];
    const current =  new Date(startDate);

    while(current <= endDate) {
      const monthName = current.toLocaleString("default", { month: "long" });
      const year = current.getFullYear();
      months.push(`${monthName} ${year}`);

      current.setMonth(current.getMonth() + 1);
    }

    const getDOwnPayment = await db
      .select({
        reservationAmount: reservationFeeTable.reservationAmount,
        dateOfPayment: reservationFeeTable.dateOfPayment
    })
    .from(reservationFeeTable)
    .where(eq(reservationFeeTable.applicants_id, getLrn[0].id));

    await db
      .insert(tempdownPaymentTable)
      .values({
        amount: getDOwnPayment[0].reservationAmount,
        applicants_id: getLrn[0].id,
        downPaymentDate: getDOwnPayment[0].dateOfPayment,
        academicYear_id: currentYear ?? 0,
      });
      
    let totalFee = 0;
    totalFee = finalPayable - getDOwnPayment[0].reservationAmount;
    console.log("Total Fee less down payment:", totalFee);

    const totalMonths = months.length;
    // const monthlyDues = totalFee / totalMonths;

    // --- distribute evenly with integers ---
    const baseDue = Math.floor(totalFee / totalMonths);
    const remainder = totalFee % totalMonths;

    const monthRows =  months.map((m, index) => ({
      applicants_id: getLrn[0].id,
      academicYear_id: currentYear ?? 0,
      temp_month: m,
      // temp_monthlyDue: monthlyDues,
      temp_monthlyDue: baseDue + (index < remainder ? 1 : 0),
    }))

  await db
    .insert(BreakDownTable)
    .values({
      applicants_id: getLrn[0].id,
      academicYear_id: currentYear ?? 0,
      tuitionFee: tuition,
      miscellaneous: miscellaneous,
      academic_discount: acad,
      academic_discount_amount: acadDiscount,
      withSibling: sibling,
      withSibling_amount: siblingDiscount,
      other_fees: other_fees,
      other_discount: other_discount,
      totalTuitionFee: totalFee,
      escGrant: grant,
    });

    if (escValue[0].grantAvailable > 0) {
      await db
      .update(grantAvailable)
      .set({
        grantAvailable: escValue[0].grantAvailable - 1,
      })
      .where(eq(grantAvailable.academicYear_id, currentYear));
    }

  await db
  .insert(TempMonthsInSoaTable)
  .values(monthRows);

  async function sendAdmissionEmail(
    email: string,  
    firstName: string,
    lastName: string,
    trackingId: string,
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
      subject: 'Confirmation of Payment Method at Rizal Institute - Canlubang',
      text: `
      Dear ${firstName} ${lastName},

      Your total remaining tuition fee comes to amounting: ₱${totalFee.toFixed(2)}.
      Your downpayment of: ₱${getDOwnPayment[0].reservationAmount.toFixed(2)} was already reduced from your tuition fee to pay.

      tracking ID: ${trackingId}

      You may choose to pay either in full or in installments.

      Next Steps:

      Visit our website and enter your tracking ID: ${trackingId}.

      Select your preferred payment option: full payment or installment plan.

      If you opt to pay in full, please provide your payment receipt.

      Wait for confirmation from the Registrar's Office. Once verified, you will receive a confirmation email along with your portal credentials.
  
      If you have any questions or concerns, please do not hesitate to contact our office. We are more than happy to assist you.
  
      Best regards,
      Rizal Institute - Canlubang Registrar Office
      `,
    };
  
    await transporter.sendMail(mailOptions);
  }

  const getEmailInfo = await db
  .select({
    email: applicantsInformationTable.email,
    firstName: applicantsInformationTable.applicantsFirstName,
    lastName: applicantsInformationTable.applicantsLastName,
    trackingId: applicationStatusTable.trackingId
  })
  .from(applicantsInformationTable)
  .leftJoin(applicationStatusTable, eq(applicationStatusTable.applicants_id, applicantsInformationTable.applicants_id))
  .where(eq(applicantsInformationTable.lrn, lrn));

  const email = getEmailInfo[0].email;
  const firstName = getEmailInfo[0].firstName;
  const lastName = getEmailInfo[0].lastName;
  const trackingId = getEmailInfo[0]?.trackingId ?? "";

  await sendAdmissionEmail(email, firstName, lastName, trackingId );


  const credentials = await getStaffCredentials();
  if (!credentials) return {message: "User not found."};

  const username = credentials?.clerk_username;
  const userType = credentials?.userType;


  await db
    .insert(auditTrailsTable)
    .values({
      username: username,
      usertype: userType,
      actionTaken: "Tuition Fee Added",
      dateOfAction: new Date().toISOString(),
      actionTakenFor: lrn,
      academicYear_id: await getAcademicYearID(),
    });


  return { message: "Tuition Fee Added Successfully" };
}