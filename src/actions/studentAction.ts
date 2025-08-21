// app/actions/getStudentData.ts
"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { StudentInfoTable, MonthsInSoaTable, MonthlyPayementTable, AcademicYearTable, AdmissionStatusTable, ClerkUserTable, GradeLevelTable, StudentGradesTable } from "../db/schema";
import { generateSINumber } from './utils/SI_Number_counter';
import { getApplicantID, getStudentClerkID, getStudentId } from './utils/studentID';
import { getAcademicYearID } from "./utils/academicYear";



export const getInfoForDashboard = async () => {

  const applicantId = await getStudentId();
  if (!applicantId) return null;

  const selectedAcademicYear = await getSelectedAcademicYear();
  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected");
    return [];
  }

  const studentInfo = await db
    .select({
      lrn: StudentInfoTable.lrn,
      student_id: StudentInfoTable.student_id,
      admissionStatus: AdmissionStatusTable.admissionStatus,
      gradeLevelName: GradeLevelTable.gradeLevelName,
      academicYear: AcademicYearTable.academicYear,
    })
    .from(StudentInfoTable)
    .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(StudentGradesTable, eq(StudentInfoTable.student_id, StudentGradesTable.student_id))
    .leftJoin(GradeLevelTable, eq(StudentGradesTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
    .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, selectedAcademicYear))
    .where(eq(StudentInfoTable.applicants_id, applicantId));

    

  let outstandingBalance = 0;
  if (studentInfo[0]?.student_id) {
    const monthDue = await db
      .select({
        monthlyDue: MonthsInSoaTable.monthlyDue,
        amountPaid: MonthsInSoaTable.amountPaid,
        month: MonthsInSoaTable.month,
        month_id: MonthsInSoaTable.month_id,
      })
      .from(MonthsInSoaTable)
      .where(and(
        eq(MonthsInSoaTable.student_id, studentInfo[0].student_id),
        eq(MonthsInSoaTable.academicYear_id, selectedAcademicYear)
     ));
    // Get current month name (e.g., 'October')
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    // Find the SOA row for the current month
    const currentMonthRow = monthDue.find(row =>
      (row.month || '').toLowerCase().includes(currentMonth.toLowerCase())
    );
    const currentMonthId = currentMonthRow?.month_id;
    if (currentMonthId !== undefined) {
      // Sum monthlyDue and amountPaid for all months up to and including currentMonthId
      const dueUpToCurrent = monthDue.filter(row => row.month_id <= currentMonthId);
      const totalMonthlyDue = dueUpToCurrent.reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
      const totalAmountPaid = dueUpToCurrent.reduce((sum, row) => sum + (row.amountPaid || 0), 0);
      outstandingBalance = totalMonthlyDue - totalAmountPaid;
    }
  }

  return {
    lrn: studentInfo[0]?.lrn,
    admissionStatus: studentInfo[0]?.admissionStatus,
    gradeLevelName: studentInfo[0]?.gradeLevelName,
    academicYear: studentInfo[0]?.academicYear,
    outstandingBalance,

  };
}



  export const getPaymentHistory = async () => {

  const applicantId = await getStudentId();
  if (!applicantId) return [];

  const selectedAcademicYear = await getSelectedAcademicYear();
    
  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected");
    return [];
  }

  const paymentHistory = await db
    .select({
      monthlyPayment_id: MonthlyPayementTable.monthlyPayment_id,
      month_id: MonthlyPayementTable.month_id,
      dateOfPayment: MonthlyPayementTable.dateOfPayment,
      amount: MonthlyPayementTable.amount,
      modeOfPayment: MonthlyPayementTable.modeOfPayment,
      dateOfVerification: MonthlyPayementTable.dateOfVerification,
      siNumber: MonthlyPayementTable.SInumber,
      status: MonthlyPayementTable.status,
    })
    .from(MonthlyPayementTable)
    .where(and (eq(MonthlyPayementTable.student_id, applicantId), eq(MonthlyPayementTable.academicYear_id, selectedAcademicYear))
)

  console.log(paymentHistory);

  return paymentHistory;

}




export const getBalance = async () => {

  const studentId = await getStudentId();
    if (!studentId) return null;

  const selectedAcademicYear = await getSelectedAcademicYear();
    
  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected");
    return null;
  }

    // Get all SOA records for the student
    const soaRecords = await db
      .select({
        month_id: MonthsInSoaTable.month_id,
        month: MonthsInSoaTable.month,
        monthlyDue: MonthsInSoaTable.monthlyDue,
        amountPaid: MonthsInSoaTable.amountPaid,
      })
      .from(MonthsInSoaTable)
      .where(and(eq(MonthsInSoaTable.student_id, studentId), eq(MonthsInSoaTable.academicYear_id, selectedAcademicYear)))
      .orderBy(MonthsInSoaTable.month_id);

    if (soaRecords.length === 0) return null;

    // Get current month name (e.g., 'October')
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    
    // Find the SOA row for the current month
    const currentMonthRow = soaRecords.find(row =>
      (row.month || '').toLowerCase().includes(currentMonth.toLowerCase())
    );

    let dueThisMonth = 0;
    let totalRemainingBalance = 0;

    if (currentMonthRow) {
      const currentMonthId = currentMonthRow.month_id;
      
      // Calculate due this month: sum of monthlyDue for current month and below, minus sum of amountPaid
      const dueThisMonthRecords = soaRecords.filter(row => row.month_id <= currentMonthId);
      const totalMonthlyDue = dueThisMonthRecords.reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
      const totalAmountPaid = dueThisMonthRecords.reduce((sum, row) => sum + (row.amountPaid || 0), 0);
      dueThisMonth = totalMonthlyDue - totalAmountPaid;
    }

    // Calculate total remaining balance: sum of all monthlyDue minus sum of all amountPaid
    const totalAllMonthlyDue = soaRecords.reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
    const totalAllAmountPaid = soaRecords.reduce((sum, row) => sum + (row.amountPaid || 0), 0);
    totalRemainingBalance = totalAllMonthlyDue - totalAllAmountPaid;

    return {
      dueThisMonth: Math.max(0, dueThisMonth), // Ensure non-negative
      totalRemainingBalance: Math.max(0, totalRemainingBalance), // Ensure non-negative
    };
}



export const addPayment = async (
  amount: number,
  mop: string,
  POP: string,
) => {


    const studentId = await getStudentId();
      if (!studentId) return null;


     // Get current month name (e.g., 'October')
     const currentMonth = new Date().toLocaleString('default', { month: 'long' });
     // Find the month_id for the current month for this student
     const monthRow = await db
       .select({ month_id: MonthsInSoaTable.month_id, month: MonthsInSoaTable.month })
       .from(MonthsInSoaTable)
       .where(eq(MonthsInSoaTable.student_id, studentId));

     const currentMonthRow = monthRow.find(row => (row.month || '').toLowerCase().includes(currentMonth.toLowerCase()));
    //  if (!currentMonthRow) return null; // No SOA for current month
    if (!currentMonthRow) {
      console.warn(" No SOA for current month:", currentMonth);
      return { success: false, error: `No SOA found for ${currentMonth}. Please contact the cashier.` };
    }


    const currentMonthId = currentMonthRow.month_id;
    const academicYearID = await getAcademicYearID();
     

     try{
     const result =
    await db
       .insert(MonthlyPayementTable)
       .values({
        student_id: studentId,
        month_id: currentMonthId,
        academicYear_id: academicYearID,
        amount: amount,
        proofOfPayment: POP,
        modeOfPayment: mop,
        dateOfPayment: new Date().toISOString().split('T')[0],
        status: "Pending",
        SInumber: await generateSINumber(),
    })
    .returning();
    console.log("Payment added:", result);
  } catch (error) {
    console.error("Error adding payment:", error);
    return { success: false, error: "Error adding payment" };
  }

  return { success: true };
  } 




  export const getAcademicYear = async () => {
    const studentId = await getStudentId();
    if (!studentId) return null;

    const applicantId = await getApplicantID();
    if (!applicantId) return null;

    const academicYear = await db
      .select({academicYear: AcademicYearTable.academicYear})
      .from(AdmissionStatusTable)
      .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, AdmissionStatusTable.academicYear_id))
      .where(and(eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id), eq(AdmissionStatusTable.applicants_id, applicantId)))

    return academicYear;
  }


  export const getDefaultYear = async () => {
    const studentId = await getStudentClerkID();
    if (!studentId) return null;
  
    const defaultYear = await db
      .select({AcademicYear: AcademicYearTable.academicYear})
      .from(ClerkUserTable)
      .innerJoin(AcademicYearTable, eq(ClerkUserTable.selected_AcademicYear_id, AcademicYearTable.academicYear_id))
      .where(eq(ClerkUserTable.clerkId, studentId))
      .limit(1);
    console.log("defaultYear result:", defaultYear);
    return defaultYear[0]?.AcademicYear ?? null;
    
  }


  export const updateAcademicYear = async (academicYear: string) => {
    const studentId = await getStudentClerkID();
    if (!studentId) return null;

    const academicYearID = await db
      .select({academicYear_id: AcademicYearTable.academicYear_id})
      .from(AcademicYearTable)
      .where(eq(AcademicYearTable.academicYear, academicYear))
      .limit(1);
  
    try{
      await db
        .update(ClerkUserTable)
        .set({ selected_AcademicYear_id: academicYearID[0]?.academicYear_id ?? null })
        .where(eq(ClerkUserTable.clerkId,  studentId))
  
      }catch (error) {
          console.log(error);
        return ({ message: "Academic Year Not Updated" });
  
      }
  
      return ({ message: "Academic Year Updated" });
  };

    export const getSelectedAcademicYear = async () => {
    const studentId = await getStudentClerkID();
    if (!studentId) return null;
  
    const selectedAcademicYear = await db
    .select({selected_AcademicYear_id: ClerkUserTable.selected_AcademicYear_id})
    .from(ClerkUserTable)
    .where(eq(ClerkUserTable.clerkId, studentId))
    .limit(1);
  
    return selectedAcademicYear[0]?.selected_AcademicYear_id ?? null;
  }


  export const getRecord = async () => {
    const studentId = await getStudentId();
    if (!studentId) return null;

    const getGradeID = await db
    .select({gradeLevel_ID: StudentGradesTable.gradeLevel_id})
    .from(StudentGradesTable)
    .where(eq(StudentGradesTable.student_id, studentId))
    .limit(1);

    const id = getGradeID[0]?.gradeLevel_ID ?? null;
    if (!id) return null;

    console.log(id);
    const record = await db
    .select({
      lrn: StudentInfoTable.lrn,
      studentLastName: StudentInfoTable.studentLastName,
      studentFirstName: StudentInfoTable.studentFirstName,
      studentMiddleName: StudentInfoTable.studentMiddleName,
      studentSuffix: StudentInfoTable.studentSuffix,
      gradeLevelName: GradeLevelTable.gradeLevelName,
      ay: AcademicYearTable.academicYear,
      da: AdmissionStatusTable.dateAdmitted,
    }).from(StudentInfoTable)
    .leftJoin(GradeLevelTable, eq(GradeLevelTable.gradeLevel_id, id))
    .leftJoin(ClerkUserTable, eq(ClerkUserTable.student_id, StudentInfoTable.student_id))
    .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, ClerkUserTable.selected_AcademicYear_id))
    .leftJoin(AdmissionStatusTable, eq(AdmissionStatusTable.applicants_id, StudentInfoTable.applicants_id))
    .where(eq(StudentInfoTable.student_id, studentId))
    .limit(1);
  
    return record[0];
  }