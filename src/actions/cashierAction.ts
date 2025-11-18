"use server"

import { and, asc, desc, eq, ilike, sql, } from "drizzle-orm";
import { db } from "../db/drizzle";
import { AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, reservationFeeTable, StudentInfoTable, downPaymentTable, MonthsInSoaTable, MonthlyPayementTable, AcademicYearTable, StudentGradesTable, GradeLevelTable, additionalInformationTable, auditTrailsTable, fullPaymentTable, tempdownPaymentTable, grantAvailable, BreakDownTable, TempMonthsInSoaTable, staffClerkUserTable, ReceiptInfoTable, studentTypeTable, documentsTable, ESCGranteeTable, SubjectTable,  } from "../db/schema";
import { revalidatePath } from "next/cache";
import { requireStaffAuth } from "./utils/staffAuth";
import { getAcademicYearID, getSelectedAcademicYear } from "./utils/academicYear";
import { getStaffCredentials } from "./utils/staffID";
import nodemailer from 'nodemailer';
import { getSelectedYear } from "./utils/getSelectedYear";
import { auth } from "@clerk/nextjs/server";
import { generateSINumber } from "./utils/SI_Number_counter";

// dashboard

export const getPendingApplicantsCount = async (selectedYear: number) => {
  const allEnrollees = await db.select({
    id: applicantsInformationTable.applicants_id,
  })
    .from(applicantsInformationTable)
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(and(
      eq(applicationStatusTable.reservationPaymentStatus, "Pending"),
      eq(applicationStatusTable.academicYear_id, selectedYear),
));
  return allEnrollees.length;
};

export const getReservedSlotCount = async (selectedYear: number) => {

  const allReserved = await db.select({
    id: applicantsInformationTable.applicants_id,
  })
    .from(applicantsInformationTable)
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(and(
      eq(applicationStatusTable.academicYear_id, selectedYear),
      eq(applicationStatusTable.reservationPaymentStatus, "Reserved"),
    ))
  return allReserved.length;
};

export const getPendingFullPaymentsCount = async (selectedYear: number) => {

  const payments = await db.select({
    fullpayment_id: fullPaymentTable.payment_id,
  })
    .from(fullPaymentTable)
    .where(and(
      eq(fullPaymentTable.academicYear_id, selectedYear), 
      eq(fullPaymentTable.paymentStatus, 'Pending'),
    ))
  return payments.length;
};

export const getPendingMonthlyPaymentsCount = async (selectedYear: number) => {

  const payments = await db.select({
    month_id: MonthlyPayementTable.monthlyPayment_id,
  })
    .from(MonthlyPayementTable)
    .where(and(
      eq(MonthlyPayementTable.academicYear_id, selectedYear), 
      eq(MonthlyPayementTable.status, 'Pending'),
    ))
  return payments.length;
  
};
// graph
// export const getTotalperMontha = async () => {

//   const selectedYear = await getSelectedYear();
//   if(!selectedYear) return [];

//   // Get current date
//   const today = new Date();
//   const currentMonth = today.toLocaleString("default", { month: "long" });
//   console.log("Current month:", currentMonth);

//   // Get current month_id from DB
//   const currentMonthRow = await db
//     .select({
//       month_id: MonthsInSoaTable.month_id,
//       month: MonthsInSoaTable.month,
//     })
//     .from(MonthsInSoaTable)
//     .where(
//       and(
//         like(MonthsInSoaTable.month, `${currentMonth}%`),
//         eq(MonthsInSoaTable.academicYear_id, selectedYear)
//       )
//     );

//   if (currentMonthRow.length === 0) {
//     console.warn("No current month found in DB, returning empty chart data.");
//     return[];
//   }

//   const currentMonthId = currentMonthRow[0].month_id;
//   console.log("Current month ID:", currentMonthId);

//   // Fetch all months up to current month
//   const monthsUpToCurrent = await db
//     .select({
//       amountPaid: MonthsInSoaTable.amountPaid,
//       month: MonthsInSoaTable.month,
//     })
//     .from(MonthsInSoaTable)
//     .where(
//       and(
//         lte(MonthsInSoaTable.month_id, currentMonthId),
//         eq(MonthsInSoaTable.academicYear_id, 1)
//       )
//     );

//   // Aggregate total paid per "Month Year"
//   const monthlyTotalMap = new Map<string, number>();

//   for (const row of monthsUpToCurrent) {
//     const parsedDate = new Date(row.month); // e.g., "July 5, 2025"
//     if (isNaN(parsedDate.getTime())) continue;

//     const key = parsedDate.toLocaleString("default", {
//       month: "long",
//       year: "numeric",
//     }); // e.g., "July 2025"

//     if (!monthlyTotalMap.has(key)) {
//       monthlyTotalMap.set(key, 0);
//     }

//     monthlyTotalMap.set(key, monthlyTotalMap.get(key)! + row.amountPaid);
//   }


//   // Sort and format
//   const result = [...monthlyTotalMap.entries()]
//     .map(([month, totalPaid]) => ({
//       month,
//       totalPaid,
//       sortKey: new Date(`${month} 1`).getTime(),
//     }))
//     .sort((a, b) => a.sortKey - b.sortKey)
//     .map(({ month, totalPaid }) => ({ month, totalPaid }));

//   console.log("📊 Total Paid Per Month (up to current):", result);
//   return result;
// };


export const getTotalperMonth = async () => {
  const selectedYear = await getSelectedYear();
  if (!selectedYear) return [];

  // Fetch all months for the academic year
  const allMonths = await db
    .select({
      month_id: MonthsInSoaTable.month_id,
      month: MonthsInSoaTable.month,
      amountPaid: MonthsInSoaTable.amountPaid,
    })
    .from(MonthsInSoaTable)
    .where(eq(MonthsInSoaTable.academicYear_id, selectedYear));

  // Aggregate totals (month → sum of amountPaid)
  const monthlyTotalMap = new Map<string, number>();

  for (const row of allMonths) {
    const parsedDate = new Date(row.month); // e.g. "July 5, 2025"
    if (isNaN(parsedDate.getTime())) continue;

    const key = parsedDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    monthlyTotalMap.set(key, (monthlyTotalMap.get(key) ?? 0) + (row.amountPaid ?? 0));
  }

  // Format result with ALL months (even if total = 0)
  const result = allMonths
    .map((row) => {
      const parsedDate = new Date(row.month);
      const key = parsedDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      return {
        month: key,
        totalPaid: monthlyTotalMap.get(key) ?? 0,
        sortKey: parsedDate.getTime(),
      };
    })
    // remove duplicates if MonthsInSoaTable has multiple rows per month
    .reduce((acc, curr) => {
      if (!acc.some((m) => m.month === curr.month)) acc.push(curr);
      return acc;
    }, [] as { month: string; totalPaid: number; sortKey: number }[])
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ month, totalPaid }) => ({ month, totalPaid }));

  return result;
};


// export const getTotalperMonth = async () => {
//   const selectedYear = await getSelectedYear();
//   if (!selectedYear) return [];

//   const data = await db
//     .select({
//       month_id: MonthsInSoaTable.month_id,
//       month: MonthsInSoaTable.month,
//       totalPaid: sql<number>`COALESCE(SUM(${MonthsInSoaTable.amountPaid}), 0)`,
//     })
//     .from(MonthsInSoaTable)
//     .where(eq(MonthsInSoaTable.academicYear_id, selectedYear))
//     .groupBy(MonthsInSoaTable.month_id, MonthsInSoaTable.month)
//     .orderBy(MonthsInSoaTable.month_id);

//   return data.map((row) => ({
//     month: row.month,
//     totalPaid: row.totalPaid ?? 0,
//   }));
// };


  export const getTotal = async () => {
    const selectedYear = await getSelectedYear();
    if (!selectedYear) return [];
    // get current month and match in db to get the id
    // const today = new Date();
    // const currentMonth = today.toLocaleString("default", { month: "long"});
    // console.log("Current month:", currentMonth);

    const currentMonthRow = await db
      .select({ month_id: MonthsInSoaTable.month_id, month: MonthsInSoaTable.month })
      .from(MonthsInSoaTable)
    .where(
      and(
        sql`TO_DATE('01 ' || ${MonthsInSoaTable.month}, 'DD Month YYYY') <= CURRENT_DATE`,
        eq(MonthsInSoaTable.academicYear_id, selectedYear)
      )
    );


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
    .where(eq(StudentGradesTable.academicYear_id, selectedYear))
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
      sql`TO_DATE('01 ' || ${MonthsInSoaTable.month}, 'DD Month YYYY') <= CURRENT_DATE`,
      eq(MonthsInSoaTable.academicYear_id, selectedYear)
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


  export const paymentScheme = async () => {

    const selectedYear = await getSelectedYear();
    if (!selectedYear) return [];

    const paymentScheme = await db
    .select({
        paymentMethod: downPaymentTable.paymentMethod,
      })
      .from(downPaymentTable)
      .where(eq(downPaymentTable.academicYear_id, selectedYear))

    console.log("Payment scheme:", paymentScheme);
    return paymentScheme;
  }


//   // get recent payment
//   export const getRecentPayments = async () => {

//     const selectedYear = await getSelectedYear();
//     if (!selectedYear) return [];

//     const recentPayments = await db.select({
//       monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
//       student_id: MonthlyPayementTable.student_id,
//       lrn: StudentInfoTable.lrn,
//       studentLastName: StudentInfoTable.studentLastName,
//       studentFirstName: StudentInfoTable.studentFirstName,
//       studentMiddleName: StudentInfoTable.studentMiddleName,
//       studentSuffix: StudentInfoTable.studentSuffix,
//       amount: MonthlyPayementTable.amount,
//       dateOfPayment: MonthlyPayementTable.dateOfPayment,
//     })
//       .from(MonthlyPayementTable)
//       .leftJoin(StudentInfoTable, eq(MonthlyPayementTable.student_id, StudentInfoTable.student_id))
//       .where(and(
//         eq(MonthlyPayementTable.academicYear_id, selectedYear),
//         eq(MonthlyPayementTable.status, "Pending"),
//       ))
//       .orderBy(desc(MonthlyPayementTable.dateOfPayment))
//       .limit(5);

//     return recentPayments;
// };

export const getRecentPayments = async () => {
  const selectedYear = await getSelectedYear();
  if (!selectedYear) return [];

  // 🟢 Student monthly payments
  const studentPayments = db
    .select({
      id: MonthlyPayementTable.monthlyPayment_id,
      type: sql<string>`'Monthly Payment'`.as('type'),
      lastName: StudentInfoTable.studentLastName,
      firstName: StudentInfoTable.studentFirstName,
      middleName: StudentInfoTable.studentMiddleName,
      suffix: StudentInfoTable.studentSuffix,
      lrn: StudentInfoTable.lrn,
      amount: MonthlyPayementTable.amount,
      dateOfPayment: MonthlyPayementTable.dateOfPayment,
    })
    .from(MonthlyPayementTable)
    .leftJoin(
      StudentInfoTable, 
      eq(MonthlyPayementTable.student_id, StudentInfoTable.student_id)
    )
    .where(and(
      eq(MonthlyPayementTable.academicYear_id, selectedYear),
      eq(MonthlyPayementTable.status, "Pending")
    ));

  // 🟢 Reservation payments
  const reservationPayments = db
    .select({
      id: reservationFeeTable.reservation_id,
      type: sql<string>`'Reservation Fee'`.as('type'),
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      suffix: applicantsInformationTable.applicantsSuffix,
      lrn: applicantsInformationTable.lrn,
      amount: reservationFeeTable.reservationAmount,
      dateOfPayment: reservationFeeTable.dateOfPayment,
    })
    .from(reservationFeeTable)
    .leftJoin(applicantsInformationTable, eq(reservationFeeTable.applicants_id, applicantsInformationTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(and(
      eq(reservationFeeTable.academicYear_id, selectedYear),
      eq(applicationStatusTable.reservationPaymentStatus, "Pending")
      ));

  // 🟢 Union both and order
  const recentPayments = await db
    .select()
    .from(
      studentPayments.unionAll(reservationPayments).as('combined')
    )
    .limit(5);

  return recentPayments;
};


//get all enrolled studdents

export const getEnrolledStudents = async () => {
  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const enrolledStudents = await db
  .select({
    id: StudentInfoTable.student_id,
    lrn: StudentInfoTable.lrn,
    studentLastName: StudentInfoTable.studentLastName,
    studentFirstName: StudentInfoTable.studentFirstName,
    studentMiddleName: StudentInfoTable.studentMiddleName,
    studentSuffix: StudentInfoTable.studentSuffix,
    gradeLevelName: studentTypeTable.gradeToEnroll,
    paymentMethod: downPaymentTable.paymentMethod
  })
  .from(StudentInfoTable)
  .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
  .leftJoin(studentTypeTable, eq(StudentInfoTable.applicants_id, studentTypeTable.applicants_id))
  .leftJoin(downPaymentTable, eq(StudentInfoTable.applicants_id, downPaymentTable.applicants_id))
  .where(and(
    eq(AdmissionStatusTable.academicYear_id, selectedYear),
    eq(studentTypeTable.academicYear_id, selectedYear),
    eq(downPaymentTable.academicYear_id, selectedYear),
  ))
  .orderBy(sql`CAST(${studentTypeTable.gradeToEnroll} AS INTEGER) ASC`)

// const enrolledStudents = await db
//   .selectDistinctOn([StudentInfoTable.student_id], {
//     id: StudentInfoTable.student_id,
//     lrn: StudentInfoTable.lrn,
//     studentLastName: StudentInfoTable.studentLastName,
//     studentFirstName: StudentInfoTable.studentFirstName,
//     studentMiddleName: StudentInfoTable.studentMiddleName,
//     studentSuffix: StudentInfoTable.studentSuffix,
//     gradeLevelName: studentTypeTable.gradeToEnroll,
//     paymentMethod: downPaymentTable.paymentMethod,
//   })
//   .from(StudentInfoTable)
//   .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
//   .leftJoin(studentTypeTable, eq(StudentInfoTable.applicants_id, studentTypeTable.applicants_id))
//   .leftJoin(downPaymentTable, eq(StudentInfoTable.applicants_id, downPaymentTable.applicants_id))
//   .where(and(
//     eq(AdmissionStatusTable.academicYear_id, selectedYear),
//     eq(studentTypeTable.academicYear_id, selectedYear),
//     eq(downPaymentTable.academicYear_id, selectedYear)
//   ))
//   .orderBy(
//     StudentInfoTable.student_id, // must come first to match DISTINCT ON
//     sql`CAST(${studentTypeTable.gradeToEnroll} AS INTEGER) ASC`
//   );

console.log("Fetched Enrolled Students:", enrolledStudents);
return enrolledStudents;
}


// get soa of enrolled student
export const getSOAsStudent = async (lrn: string) => {

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];
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
      SINumberDP: downPaymentTable.SINumber,
      paymentMethod: downPaymentTable.paymentMethod,
      academicYear: AcademicYearTable.academicYear,
      isActive: AcademicYearTable.isActive
    })
    .from(StudentInfoTable)
    .leftJoin(MonthsInSoaTable, eq(StudentInfoTable.applicants_id, MonthsInSoaTable.applicants_id))
    .leftJoin(downPaymentTable, eq(StudentInfoTable.applicants_id, downPaymentTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(MonthsInSoaTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(and(
      eq(StudentInfoTable.lrn, lrn),
      eq(AcademicYearTable.academicYear_id, selectedYear)
    ))
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
      SInumber: MonthsInSoaTable.SINumber,
      remarks: MonthsInSoaTable.remarks,
    })
    .from(MonthsInSoaTable)
    .where(and(
      eq(MonthsInSoaTable.applicants_id, studentData.student_id ?? 0),
      eq(MonthsInSoaTable.academicYear_id, selectedYear)
    ))
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
    paymentMethod: studentData.paymentMethod || "",
    isActive: studentData.isActive ?? false,
    academicYear: studentData.academicYear || "",
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

//update soa
export const updateSoa = async ( month_id: number, month: string, monthlyDue: number) => {
  await requireStaffAuth(["cashier"]); // gatekeeper

  await db
    .update(MonthsInSoaTable)
    .set({ month: month, monthlyDue: monthlyDue })
    .where(eq(MonthsInSoaTable.month_id, month_id));
}

//monthly fees to verify
export const paymentToVerify = async () => {
  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const paymentToVerify = await db.select({
    monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
    lrn: StudentInfoTable.lrn,
    month_id: MonthlyPayementTable.month_id,
    dateOfPayment: MonthlyPayementTable.dateOfPayment,  
    amount: MonthlyPayementTable.amount,
    SInumber: MonthlyPayementTable.SINumber,
    proofOfPayment: MonthlyPayementTable.proofOfPayment,
    modeOfPayment: MonthlyPayementTable.modeOfPayment,
    status: MonthlyPayementTable.status,
    isActive: AcademicYearTable.isActive,
  })
  .from(MonthlyPayementTable)
  .leftJoin(AcademicYearTable, eq(MonthlyPayementTable.academicYear_id, AcademicYearTable.academicYear_id))
  .leftJoin(StudentInfoTable, eq(MonthlyPayementTable.student_id, StudentInfoTable.student_id))
  .where(and(
    eq(MonthlyPayementTable.academicYear_id, selectedYear),

  ));

  console.log("Payment to verify:", paymentToVerify);
  return paymentToVerify;
}

// decline monthly payment
export const declinePayment = async (monthlyPaymentId: number, lrn: string) => {
  await requireStaffAuth(["cashier"]);


  const { userId } = await auth();
  if (!userId) return null;

  const clerkRecord = await db
    .select({
      clerk_username: staffClerkUserTable.clerk_username,
      userType: staffClerkUserTable.userType,
      selectedYear: staffClerkUserTable.selected_AcademicYear_id, 
    })
    .from(staffClerkUserTable)
    .where(eq(staffClerkUserTable.clerkId, userId))
    .limit(1);

  const clerk_username = clerkRecord[0].clerk_username;
  const userType = clerkRecord[0].userType;
  const selectedYear = clerkRecord[0].selectedYear;

  await Promise.all([
     db.update(MonthlyPayementTable)
    .set({ status: 'Declined' })
    .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId)),

    db
    .insert(auditTrailsTable)
    .values({
      username: clerk_username,
      usertype: userType,
      actionTaken: "Payment Declined",
      dateOfAction: new Date().toISOString(),
      actionTakenFor: lrn,
      academicYear_id: selectedYear,
    }),

  ])



  // await db.update(MonthlyPayementTable)
  //   .set({ status: 'Declined' })
  //   .where(eq(MonthlyPayementTable.monthlyPayment_id, monthlyPaymentId));

  // await db
  //   .insert(auditTrailsTable)
  //   .values({
  //     username: username,
  //     usertype: userType,
  //     actionTaken: "Payment Declined",
  //     dateOfAction: new Date().toISOString(),
  //     actionTakenFor: lrn,
  //     academicYear_id: await getAcademicYearID(),
  //   }) ;
};

export const getBalanceForCash = async (lrn: string) => {
  const selectedYear = await getSelectedYear();
  if (!selectedYear) return null;

  const soaRecords = await db
    .select({
      month_id: MonthsInSoaTable.month_id,
      month: MonthsInSoaTable.month,
      monthlyDue: MonthsInSoaTable.monthlyDue,
      amountPaid: MonthsInSoaTable.amountPaid,
      student_id: StudentInfoTable.student_id,
    })
    .from(MonthsInSoaTable)
    .leftJoin(
      StudentInfoTable,
      eq(MonthsInSoaTable.applicants_id, StudentInfoTable.applicants_id)
    )
    .where(
      and(
        eq(StudentInfoTable.lrn, lrn),
        eq(MonthsInSoaTable.academicYear_id, selectedYear)
      )
    )
    .orderBy(MonthsInSoaTable.month_id);

  // ===== ADD YEARLY TOTALS =====
  const totalDueForYear = soaRecords.reduce(
    (sum, row) => sum + (row.monthlyDue || 0),
    0
  );

  const totalPaidForYear = soaRecords.reduce(
    (sum, row) => sum + (row.amountPaid || 0),
    0
  );

  const totalRemainingForYear = Math.max(0, totalDueForYear - totalPaidForYear);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentMonthRow = soaRecords.find((row) => (row.month || "").toLowerCase().includes(currentMonth.toLowerCase()));

  let dueThisMonth = 0;

  if (currentMonthRow) {
    const currentMonthId = currentMonthRow.month_id;

    const dueThisMonthRecords = soaRecords.filter((row) => row.month_id <= currentMonthId);

    const totalMonthlyDue = dueThisMonthRecords.reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
    const totalAmountPaid = dueThisMonthRecords.reduce( (sum, row) => sum + (row.amountPaid || 0), 0);
    dueThisMonth = totalMonthlyDue - totalAmountPaid;

    return {
      dueThisMonth: Math.max(0, dueThisMonth),
      student_id: currentMonthRow.student_id ?? 0,
      month_id: currentMonthId, // ✅ now this is the current month’s ID
      totalRemainingForYear,
    };
  }

  // If no current month found
  return {
    dueThisMonth: 0,
    student_id: soaRecords.length > 0 ? soaRecords[0].student_id : 0,
    month_id: 0,
    totalRemainingForYear,
  };
};

export const getAcadYear = async () => {
  const selectedYear = await getSelectedYear();
  if (!selectedYear) return null;

  const acadStatus = await db
    .select({
      isActive: AcademicYearTable.isActive,
    })
    .from(AcademicYearTable)
    .where(eq(AcademicYearTable.academicYear_id, selectedYear))
    .limit(1);

  console.log(acadStatus);
  return acadStatus[0] ?? null;
};


export const addCashPayment = async (amount: number, lrn: string, month_id: number, student_id: number) => {
  await requireStaffAuth(["cashier"]);
  const selectedYear = await getSelectedYear();
  if(!selectedYear) return null;

  const { userId } = await auth();
  if (!userId) return null;

  const clerkRecord = await db
    .select({
      clerk_username: staffClerkUserTable.clerk_username,
      userType: staffClerkUserTable.userType,
      selectedYear: staffClerkUserTable.selected_AcademicYear_id, 
    })
    .from(staffClerkUserTable)
    .where(eq(staffClerkUserTable.clerkId, userId))
    .limit(1);

  const clerk_username = clerkRecord[0].clerk_username;
  const userType = clerkRecord[0].userType;

  const SINumber = await generateSINumber();

  await db
  .insert(MonthlyPayementTable)
  .values({
    student_id: student_id,
    month_id: month_id,
    academicYear_id: selectedYear,

    dateOfPayment: new Date().toISOString(),
    amount: amount,
    proofOfPayment: "sdasda",
    modeOfPayment: "OTC",
    dateOfVerification: new Date().toISOString(),
    SINumber: SINumber,
    status: "Approved"
  });

  await db
  .insert(auditTrailsTable)
  .values({
    username: clerk_username,
    usertype: userType,
    actionTaken: "Cash Payment Verified",
    dateOfAction: new Date().toISOString(),
    actionTakenFor: lrn,
    academicYear_id: selectedYear,
  });

}
//get payments receipts
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

















// get all applicants payment
  export const getAllEnrollees_cashier = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: studentTypeTable.gradeToEnroll,
      reservationReceipt: reservationFeeTable.reservationReceipt,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
      applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
      isActive: AcademicYearTable.isActive,
      // soaMonthId: MonthsInSoaTable.month_id, // ✅ just select a nullable column
    })
    .from(applicantsInformationTable)
    .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))    
    .leftJoin(reservationFeeTable, eq(applicantsInformationTable.applicants_id, reservationFeeTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(and(
      eq(studentTypeTable.academicYear_id, selectedYear),
      eq(AdmissionStatusTable.academicYear_id, selectedYear),
      eq(reservationFeeTable.academicYear_id, selectedYear),
      eq(applicationStatusTable.academicYear_id, selectedYear),
      eq(AcademicYearTable.academicYear_id, selectedYear),
    ))
  
    console.log("Fetched Enrollees:", allEnrollees);
    
  return allEnrollees ;
  };

export const getReceiptsCondition = async () => {
  const [info] = await db.select({
    id: ReceiptInfoTable.school_id,
    isActive: ReceiptInfoTable.isActive,
  })
  .from(ReceiptInfoTable)
  .limit(1);

  return info || null; // return null if none
};


export const addInfoONReceipt = async (schoolName: string, address: string, tin: string, latestSINumber: string, atpNumber: string, dateIssued: string, dateExpired: string) => {
  await db.insert(ReceiptInfoTable).values({
    schoolName: schoolName,
    address: address,
    tin: tin,
    latestSINumber: latestSINumber,
    atpNumber: atpNumber,
    dateIssued: dateIssued,
    dateExpired: dateExpired
  })
}

//get applicants proof of payment
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


// get all reserved tables
  export const getAllReservedSlot_cashier = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];
    
    const allEnrollees = await db.select({
      id: applicationStatusTable.application_status_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: studentTypeTable.gradeToEnroll,
      admissionStatus: AdmissionStatusTable.admissionStatus,
      soaMonthId: tempdownPaymentTable.temp_down_id, // ✅ just select a nullable column

    })
    .from(applicantsInformationTable)
    .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .leftJoin(tempdownPaymentTable, and(
      eq(applicantsInformationTable.applicants_id, tempdownPaymentTable.applicants_id),
      eq(tempdownPaymentTable.academicYear_id, selectedYear),
    ))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    .where(and(
      eq(applicationStatusTable.applicationFormReviewStatus, "Reserved"), 
      eq(applicationStatusTable.reservationPaymentStatus, "Reserved"), 
      eq(studentTypeTable.academicYear_id, selectedYear),
      eq(AdmissionStatusTable.academicYear_id, selectedYear),
      eq(applicationStatusTable.academicYear_id, selectedYear),

    ))
    .orderBy(sql`CAST(${studentTypeTable.gradeToEnroll} AS INTEGER) ASC`)

    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees;
  };

// get discount details for reserved slots
  // export const getDiscountClass = async (lrn: string) => {
  //   const discountClass = await db
  //   .select({
  //     attainment: additionalInformationTable.AttainmentUponGraduation,
  //     // gpa: additionalInformationTable.ConsistentGPA,
  //     hasSibling: additionalInformationTable.HasEnrolledSibling,
  //     reservationAmount: reservationFeeTable.reservationAmount,
  //     dateOfPayment: reservationFeeTable.dateOfPayment
  //   })
  //   .from(additionalInformationTable)
  //   .leftJoin(applicantsInformationTable, eq(additionalInformationTable.applicants_id, applicantsInformationTable.applicants_id))
  //   .leftJoin(reservationFeeTable, eq(applicantsInformationTable.applicants_id, reservationFeeTable.applicants_id))
  //   .where(eq(applicantsInformationTable.lrn, lrn));
  //   console.log("Fetched Enrollees:", discountClass);    
  //   return discountClass;
  // }


  export const addGrant = async (grant: number) => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const selectedYear = await getSelectedYear();
    await db
    .insert(grantAvailable)
    .values({
      grantAvailable: grant,
      academicYear_id: selectedYear ?? 0,
    });

    return { message: "Grant Added" };
  }

  export const checkSoa = async (lrn: string) => {
    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];
    
      const checkSoa = await db
    .select({
      temp_month_id: TempMonthsInSoaTable.temp_month_id
    })
    .from(TempMonthsInSoaTable)
    .leftJoin(applicantsInformationTable, eq(TempMonthsInSoaTable.applicants_id, applicantsInformationTable.applicants_id))
    .where(and(
      eq(TempMonthsInSoaTable.academicYear_id, selectedYear),
      eq(applicantsInformationTable.lrn, lrn),
    ))

    console.log("Fetched Enrollees:", checkSoa);    
    return checkSoa;
  }
  
  export const isLrnExist = async (lrn: string) => {
    const checkLRN = await db
      .select()
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, lrn));

    return checkLRN;
  }
  export const getInfo = async (lrn: string) => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

    const info = await db
    .select({
      fullName: sql<string>`
        ${applicantsInformationTable.applicantsFirstName} || ' ' ||
        ${applicantsInformationTable.applicantsLastName}
      `.as("fullName"),
      studentType: studentTypeTable.studentType,
      gradeLevel: studentTypeTable.gradeToEnroll,
      student_case: studentTypeTable.student_case,

      dateOfPayment: reservationFeeTable.dateOfPayment,
      amount: reservationFeeTable.reservationAmount,

      AttainmentUponGraduation: additionalInformationTable.AttainmentUponGraduation,
      reportCard: documentsTable.reportCard,
      HasEnrolledSibling: additionalInformationTable.HasEnrolledSibling,
      siblingName: additionalInformationTable.siblingName,
      escGrantee: additionalInformationTable.escGrantee,
      escCert: documentsTable.escCert,
      ESCGrantee: BreakDownTable.escGrantee,
    })
    .from(applicantsInformationTable)
    .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
    .leftJoin(reservationFeeTable, eq(applicantsInformationTable.applicants_id, reservationFeeTable.applicants_id))
    .leftJoin(additionalInformationTable, eq(applicantsInformationTable.applicants_id, additionalInformationTable.applicants_id))
    .leftJoin(documentsTable, eq(applicantsInformationTable.applicants_id, documentsTable.applicants_id))
    .leftJoin(BreakDownTable, eq(applicantsInformationTable.applicants_id, BreakDownTable.applicants_id))
    .where(and( 
      eq(studentTypeTable.academicYear_id, selectedYear),
      eq(reservationFeeTable.academicYear_id, selectedYear),
      eq(applicantsInformationTable.lrn, lrn )
    ))
    .limit(1);

    console.log("Fetched data:", info);
    return info

  }


  export const getGranted = async () => {
    const selectedYear = await getSelectedYear();
    if(!selectedYear) return 1;

    const granted = await db
    .select()
    .from(ESCGranteeTable)
    .where(and(
      eq(ESCGranteeTable.academicYear_id, selectedYear),
      eq(ESCGranteeTable.studentType, "Incoming G7"),
    ));

    console.log("Fetched data:", granted);
    return granted.length
  }

  export async function searchSibling(query: string) {
    if (!query || query.trim() === "") return [];

    const results = await db
      .select({
        student_id: StudentInfoTable.student_id,
        fullName: sql<string>`
          ${StudentInfoTable.studentFirstName} || ' ' ||
          COALESCE(${StudentInfoTable.studentMiddleName}, '') || ' ' ||
          ${StudentInfoTable.studentLastName} ||
          COALESCE(' ' || ${StudentInfoTable.studentSuffix}, '')
        `.as("fullName"),
      })
      .from(StudentInfoTable)
      .where(
        ilike(
          sql`${StudentInfoTable.studentFirstName} || ' ' || 
              COALESCE(${StudentInfoTable.studentMiddleName}, '') || ' ' ||
              ${StudentInfoTable.studentLastName} || 
              COALESCE(' ' || ${StudentInfoTable.studentSuffix}, '')`,
          `%${query}%`
        )
      )

    console.log("Fetched data:", results);
    return results;
  }

export const prevDiscounts = async (lrn: string) => {

  const prevDiscounts = await db
  .select({
    escGrant: BreakDownTable.escGrant,
    academic_discount: BreakDownTable.academic_discount,
    withSibling: BreakDownTable.withSibling,
  })
  .from(BreakDownTable)
  .leftJoin(applicantsInformationTable, eq(BreakDownTable.applicants_id, applicantsInformationTable.applicants_id))
  .where(eq(applicantsInformationTable.lrn, lrn))
  .orderBy(desc(BreakDownTable.academicYear_id))
  .limit(1);

  return prevDiscounts[0];
}

  export const isGrantee = async (lrn: string) => {


    const grantee = await db
    .select({
      ESCGrantee_id: ESCGranteeTable.ESCGrantee_id,
      ESCGrantee: ESCGranteeTable.ESCGrantee,
      AcademicYear : ESCGranteeTable.academicYear_id
    })
    .from(ESCGranteeTable)
    .leftJoin(applicantsInformationTable, eq(ESCGranteeTable.applicants_id, applicantsInformationTable.applicants_id))
    .where(and(
      eq(applicantsInformationTable.lrn, lrn)  
    ))
    .orderBy(desc(ESCGranteeTable.academicYear_id))
    .limit(1);

  console.log("fetch:", grantee)
  return !!grantee[0]?.ESCGrantee;
  }

export const getGradesSummary = async (lrn: string) => {
  const gradeSummary = await db
    .select({
      gradeLevelName: GradeLevelTable.gradeLevelName,
      finalGrade: StudentGradesTable.finalGrade,
      subjectName: SubjectTable.subjectName,
    })
    .from(StudentGradesTable)
    .leftJoin(
      GradeLevelTable,
      eq(GradeLevelTable.gradeLevel_id, StudentGradesTable.gradeLevel_id)
    )
    .leftJoin(
      StudentInfoTable,
      eq(StudentGradesTable.student_id, StudentInfoTable.student_id)
    )
    .leftJoin(
      SubjectTable,
      eq(SubjectTable.subject_id, StudentGradesTable.subject_id)
    )
    .where(eq(StudentInfoTable.lrn, lrn))
    .orderBy(asc(StudentGradesTable.gradeLevel_id));

  console.log("fetch:", gradeSummary);
  return gradeSummary;
};


  
export const getRemainingBalance = async (lrn: string) => {
  // 1. Find the latest academic year with tuition data
  const latest = await db
    .select({ year: MonthsInSoaTable.academicYear_id })
    .from(MonthsInSoaTable)
    .leftJoin(
      StudentInfoTable,
      eq(MonthsInSoaTable.applicants_id, StudentInfoTable.applicants_id)
    )
    .where(eq(StudentInfoTable.lrn, lrn))
    .orderBy(desc(MonthsInSoaTable.academicYear_id))
    .limit(1);

  if (!latest.length) return 0;

  const latestAcad = latest[0].year;

  // 2. Sum monthlyDue and amountPaid for that academic year
  const result = await db
    .select({
      totalDue: sql<number>`SUM(${MonthsInSoaTable.monthlyDue})`,
      totalPaid: sql<number>`SUM(${MonthsInSoaTable.amountPaid})`,
    })
    .from(MonthsInSoaTable)
    .leftJoin(
      StudentInfoTable,
      eq(MonthsInSoaTable.applicants_id, StudentInfoTable.applicants_id)
    )
    .where(
      and(
        eq(StudentInfoTable.lrn, lrn),
        eq(MonthsInSoaTable.academicYear_id, latestAcad)
      )
    );

  const totalDue = result[0]?.totalDue ?? 0;
  const totalPaid = result[0]?.totalPaid ?? 0;
  const remainingBalance = totalDue - totalPaid;
  return remainingBalance;
};


  // submit breakdown and monthly fees to pay
  export const  addBreakDown = async (
    lrn: string,
    tuition: number,
    miscellaneous: number,
    acad: string,
    sibling: string,
    other_discount: number,
    other_fees: number,
    escGrantee: string,
    studentType: string,
    pastTuition: number,
  ) => {
  await requireStaffAuth(["cashier"]); // gatekeeper

  const currentYear = await getSelectedYear();
  if (!currentYear) return {message: "No academic year found"};

  const getLrn = await db
    .select({
      id: applicantsInformationTable.applicants_id,
    })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.lrn, lrn));

  if (getLrn.length === 0) {
    console.warn("❌ No lrn found");
    return {message: "no lrn found"};
  }

  const getHasTuition = await db
    .select()
    .from(TempMonthsInSoaTable)
    .where(and(
      eq(TempMonthsInSoaTable.applicants_id, getLrn[0].id),
      eq(TempMonthsInSoaTable.academicYear_id, currentYear),
    ))
    .limit(1);

  if (getHasTuition.length > 0) {
    console.warn("❌ This student has already been issued with their tuition fees.");
    return {message: "This student has already been issued with their tuition fees."};
  }
  // let esc = 10;

  // const escValue = await db
  //   .select({
  //     grantAvailable: grantAvailable.grantAvailable,
  //   })
  //   .from(grantAvailable)
  //   .where(eq(grantAvailable.academicYear_id, currentYear));

  let grant = 0;
  if (escGrantee === "Yes") {
    grant = 9000;
  } else {
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
  const siblingDiscount = sibling === "Yes" ? 500 : 0;
  console.log("Step 3 – Sibling Discount:", siblingDiscount);
  net -= siblingDiscount;

  // --- Step 4: other discount
  const otherDisc = other_discount ?? 0;
  console.log("Step 4 – Other Discount:", otherDisc);
  net -= otherDisc;

  // --- Step 5: add other fees
  const finalPayable = net + (other_fees ?? 0) + pastTuition;
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

  // while(current <= endDate) {
  //   const monthName = current.toLocaleString("default", { month: "long" });
  //   const year = current.getFullYear();
  //   months.push(`${monthName} ${year}`);

  //   current.setMonth(current.getMonth() + 1);
  // }
  while (current <= endDate) {
    const monthName = current.toLocaleString("default", { month: "long" });
    const year = current.getFullYear();
    const day = 5;

    // Optional: create a Date object if you need exact date reference later
    const formatted = `${monthName} ${day}, ${year}`;
    months.push(formatted);

    current.setMonth(current.getMonth() + 1);
  }



  const getDOwnPayment = await db
    .select({
      reservationAmount: reservationFeeTable.reservationAmount,
      dateOfPayment: reservationFeeTable.dateOfPayment,
      SINumber: reservationFeeTable.SINumber,
      mop: reservationFeeTable.mop
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
    SINumber: getDOwnPayment[0].SINumber,
    paymentMethod: getDOwnPayment[0].mop
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
      remainingTuitionFee: pastTuition,
  });

  // if (escValue[0].grantAvailable > 0) {
  //   await db
  //   .update(grantAvailable)
  //   .set({
  //     grantAvailable: escValue[0].grantAvailable - 1,
  //   })
  //   .where(eq(grantAvailable.academicYear_id, currentYear));
  // }

  await db
  .insert(TempMonthsInSoaTable)
  .values(monthRows);

  if (escGrantee === "Yes") {
    await db
    .insert(ESCGranteeTable)
    .values({
      studentType: studentType,
      applicants_id: getLrn[0].id,
      academicYear_id: currentYear ?? 0,
    });
  }
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
  .where(and(eq(applicationStatusTable.applicants_id, getLrn[0].id), 
    eq(applicantsInformationTable.lrn, lrn),
    eq(applicationStatusTable.academicYear_id, currentYear),
  ));

  const email = getEmailInfo[0].email;
  const firstName = getEmailInfo[0].firstName;
  const lastName = getEmailInfo[0].lastName;
  const trackingId = getEmailInfo[0]?.trackingId ?? "";

  //bring back later
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
  


// get who paid full payment upon payment method selection
  export const getFullPayments = async () => {
    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: studentTypeTable.gradeToEnroll,
      payment_amount: fullPaymentTable.payment_amount,
      payment_receipt: fullPaymentTable.payment_receipt,
      payment_status: fullPaymentTable.paymentStatus,
      paymentMethod: fullPaymentTable.paymentMethod,
      isActive: AcademicYearTable.isActive,
      // soaMonthId: MonthsInSoaTable.month_id, // ✅ just select a nullable column
    })
    .from(applicantsInformationTable)
    .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
    .leftJoin(downPaymentTable, eq(applicantsInformationTable.applicants_id, downPaymentTable.applicants_id))
    .leftJoin(fullPaymentTable, eq(applicantsInformationTable.applicants_id, fullPaymentTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(and(
      eq(downPaymentTable.paymentMethod, "full_payment"),
      eq(fullPaymentTable.academicYear_id, selectedYear),
      eq(AdmissionStatusTable.academicYear_id, selectedYear),
      eq(downPaymentTable.academicYear_id, selectedYear),
      eq(studentTypeTable.academicYear_id, selectedYear),
    ))

    console.log("Fetched full payment:", allEnrollees);
    
  return allEnrollees ;
  };

  
//get receipet for who paid in whole
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
    SInumber: MonthlyPayementTable.SINumber,
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
    SInumber: MonthlyPayementTable.SINumber,
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
      SINumber: SINumber,
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



export const sendReceipt = async (selectedID: number,  ) => {
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
      // cashiersReceipt: cashiersReceipt,
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


export const ApprovedMonth = async (month_id: number, amount: number, date: string) => {
  await requireStaffAuth(["cashier"]); // gatekeeper

  const selectedAcademicYear = await getSelectedAcademicYear();

  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected");
    return 0;
  }
  const SINumber = await generateSINumber();
  await db
    .update(MonthlyPayementTable)
    .set({ 
      SINumber: SINumber,
      dateOfVerification: new Date().toLocaleDateString(),
      status: "Approved",
     })
    .where(eq(MonthlyPayementTable.monthlyPayment_id, month_id ));


    await db
    .update(MonthsInSoaTable)
    .set({ 
      amountPaid: amount,
      SINumber: SINumber,
      dateOfPayment: date,
     })
    .where(eq(MonthsInSoaTable.month_id, month_id ));
}






  export const getESC = async () => {
    await requireStaffAuth(["cashier"]); // gatekeeper

    const selectedAcademicYear = await getSelectedAcademicYear();

    if (!selectedAcademicYear) {
      console.warn("❌ No academic year selected");
      return 0;
    }

    const grant = await db.select({
      grantAvailable: grantAvailable.grantAvailable,
      isActive: AcademicYearTable.isActive
    })
    .from(grantAvailable)
    .leftJoin(AcademicYearTable, eq(grantAvailable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(eq(grantAvailable.academicYear_id, selectedAcademicYear));

    return grant.length > 0 ? grant[0].grantAvailable : 0;
  }

  export const isAcademicYearActive = async () => {

  const selectedAcademicYear = await getSelectedAcademicYear();
  if (!selectedAcademicYear) return false;

  const result = await db
    .select({ isActive: AcademicYearTable.isActive })
    .from(AcademicYearTable)
    .where(eq(AcademicYearTable.academicYear_id, selectedAcademicYear))
    .limit(1);

  return result.length > 0 ? result[0].isActive : false;
};






