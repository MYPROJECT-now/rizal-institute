// app/actions/getStudentData.ts
"use server";

import { and, desc, eq, like, sql } from "drizzle-orm";
import { db } from "../db/drizzle";
import { StudentInfoTable, MonthsInSoaTable, MonthlyPayementTable, AcademicYearTable, AdmissionStatusTable, ClerkUserTable, GradeLevelTable, StudentGradesTable, downPaymentTable, ReceiptInfoTable, studentTypeTable, SectionTable, StudentPerGradeAndSection, SubjectTable, AnnouncementTable, AnnouncementReadStatusTable, RoomTable, applicantsInformationTable, guardianAndParentsTable } from "../db/schema";
import { getApplicantID, getStudentClerkID, getStudentId } from './utils/studentID';
import { getAcademicYearID } from "./utils/academicYear";
import nodemailer from "nodemailer";

export interface StudentInfo {
  lrn: string | null;
  admissionStatus: string | null;
  gradeLevelName: string | null;
  academicYear: string | null;
  outstandingBalance?: number;
  studentFirstName: string | null;
  studentMiddleName: string | null;
  studentLastName: string | null;
  studentSuffix: string | null;
  paymentMethod: string | null;
  email: string | null;
  reminderForCurrentMonth: boolean;

    // NEW FIELDS
  unpaidMonthCount: number;
  unpaidMonths: string[];
}


export const getInfoForDashboard = async () : Promise<StudentInfo | null> => {


  const applicantId = await getApplicantID();
  if (!applicantId) return null;
  console.log("Applicant ID:", applicantId);

  const selectedAcademicYear = await getSelectedAcademicYear();
  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected");
    return null;
  }

  const studentInfo = await db
    .select({
      lrn: StudentInfoTable.lrn,
      student_id: StudentInfoTable.applicants_id,
      admissionStatus: AdmissionStatusTable.admissionStatus,
      gradeLevelName: studentTypeTable.gradeToEnroll,
      academicYear: AcademicYearTable.academicYear,
      studentFirstName: StudentInfoTable.studentFirstName,
      studentMiddleName: StudentInfoTable.studentMiddleName,
      studentLastName: StudentInfoTable.studentLastName,
      studentSuffix: StudentInfoTable.studentSuffix,
      paymentMethod: downPaymentTable.paymentMethod,
      email: applicantsInformationTable.email
    })
    .from(StudentInfoTable)
    .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(studentTypeTable, eq(StudentInfoTable.applicants_id, studentTypeTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, AdmissionStatusTable.academicYear_id))
    .leftJoin(downPaymentTable, eq(downPaymentTable.applicants_id, StudentInfoTable.applicants_id))
    .leftJoin(applicantsInformationTable, eq(applicantsInformationTable.applicants_id, StudentInfoTable.applicants_id))
    .where(and(
      eq(StudentInfoTable.applicants_id, applicantId),
      eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear),
      eq(downPaymentTable.academicYear_id, selectedAcademicYear),
      eq(studentTypeTable.academicYear_id, selectedAcademicYear)
    ))

    

  let outstandingBalance = 0;
  let reminderForCurrentMonth = false; // default

  let unpaidMonthCount = 0;
  let unpaidMonths: string[] = [];

  if (studentInfo[0]?.student_id) {
    const monthDue = await db
      .select({
        monthlyDue: MonthsInSoaTable.monthlyDue,
        amountPaid: MonthsInSoaTable.amountPaid,
        month: MonthsInSoaTable.month,
        month_id: MonthsInSoaTable.month_id,
        reminder: MonthsInSoaTable.Reminder, // include Reminder
      })
      .from(MonthsInSoaTable)
      .where(and(
        eq(MonthsInSoaTable.applicants_id, studentInfo[0].student_id),
        eq(MonthsInSoaTable.academicYear_id, selectedAcademicYear)
     ));

    // COUNT UNPAID MONTHS
    const unpaid = monthDue.filter(row => (row.amountPaid ?? 0) < (row.monthlyDue ?? 0));

    unpaidMonthCount = unpaid.length;
    unpaidMonths = unpaid.map(m => m.month);

    // Get current month name (e.g., 'October')
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    // Find the SOA row for the current month
    const currentMonthRow = monthDue.find(row =>
      (row.month || '').toLowerCase().includes(currentMonth.toLowerCase())
    );

    const currentMonthId = currentMonthRow?.month_id;
    if (currentMonthRow) {
      reminderForCurrentMonth = currentMonthRow.reminder ?? false;
    }
    if (currentMonthId !== undefined) {
      // Sum monthlyDue and amountPaid for all months up to and including currentMonthId
      const dueUpToCurrent = monthDue.filter(row => row.month_id <= currentMonthId);
      const totalMonthlyDue = dueUpToCurrent.reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
      const totalAmountPaid = dueUpToCurrent.reduce((sum, row) => sum + (row.amountPaid || 0), 0);
      outstandingBalance = totalMonthlyDue - totalAmountPaid;
    }
  }

  const student = studentInfo[0];
  return {
    lrn: studentInfo[0]?.lrn ?? null,
    admissionStatus: studentInfo[0]?.admissionStatus ?? null,
    gradeLevelName: studentInfo[0]?.gradeLevelName ?? null,
    academicYear: studentInfo[0]?.academicYear ?? null,
    outstandingBalance,
    studentFirstName: student?.studentFirstName ?? null,
    studentMiddleName: student?.studentMiddleName ?? null,
    studentLastName: student?.studentLastName ?? null,
    studentSuffix: student?.studentSuffix ?? null,
    paymentMethod: studentInfo[0]?.paymentMethod ?? null,
    email: studentInfo[0]?.email ?? null,
    reminderForCurrentMonth,
    unpaidMonthCount,
    unpaidMonths,
  };
}




export const getStudentInfo = async () => {
  console.log("🟡 Starting getStudentInfo...");

  const applicantId = await getApplicantID();
  console.log("✅ Applicant ID:", applicantId);
  if (!applicantId) {
    console.warn("❌ No applicant ID found.");
    return null;
  }

  const selectedAcademicYear = await getSelectedAcademicYear();
  console.log("✅ Selected Academic Year:", selectedAcademicYear);
  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected.");
    return null;
  }

  console.log("🔍 Fetching student info for applicant:", applicantId, "and year:", selectedAcademicYear);

  const studentInfo = await db
    .select({
      lrn: StudentInfoTable.lrn,
      student_id: StudentInfoTable.applicants_id,
      gradeLevelName: studentTypeTable.gradeToEnroll,
      academicYear: AcademicYearTable.academicYear,
      studentFirstName: StudentInfoTable.studentFirstName,
      studentMiddleName: StudentInfoTable.studentMiddleName,
      studentLastName: StudentInfoTable.studentLastName,
      studentSuffix: StudentInfoTable.studentSuffix,
      sectionName: SectionTable.sectionName,
      section_id: SectionTable.section_id,
      rooomName: RoomTable.roomName,
    })
    .from(StudentInfoTable)
    .leftJoin(StudentPerGradeAndSection, eq(StudentInfoTable.student_id, StudentPerGradeAndSection.student_id))
    .leftJoin(SectionTable, eq(SectionTable.section_id, StudentPerGradeAndSection.section_id))
    .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, AdmissionStatusTable.academicYear_id))
    .leftJoin(studentTypeTable, eq(studentTypeTable.applicants_id, StudentInfoTable.applicants_id))
    .leftJoin(RoomTable, eq(RoomTable.room_id, SectionTable.room_id))
    .where(
      and(
        eq(StudentInfoTable.applicants_id, applicantId),
        eq(studentTypeTable.academicYear_id, selectedAcademicYear),
        eq(StudentPerGradeAndSection.academicYear_id, selectedAcademicYear),
        eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear),
        eq(SectionTable.academicYear_id, selectedAcademicYear)
      )
    )
    .limit(1);

  console.log("📦 Raw studentInfo query result:", studentInfo);

  if (!studentInfo || studentInfo.length === 0) {
    console.warn("⚠️ No student info found for this academic year.");
    return null;
  }

  console.log("✅ Found student info:", studentInfo[0]);

  console.log("🔍 Fetching subjects for student:", applicantId, "year:", selectedAcademicYear);
  const subjects = await db
    .select({
      subjectName: SubjectTable.subjectName,
    })
    .from(SubjectTable)
    .leftJoin(StudentGradesTable, eq(StudentGradesTable.subject_id, SubjectTable.subject_id))
    .where(
      and(
        eq(StudentGradesTable.student_id, applicantId),
        eq(StudentGradesTable.academicYear_id, selectedAcademicYear)
      )
    );

  console.log("📚 Subjects found:", subjects);

  return {
    ...studentInfo[0],
    subjects: subjects.map((s) => s.subjectName),
  };
};


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
      siNumber: MonthlyPayementTable.SINumber,
      status: MonthlyPayementTable.status,
    })
    .from(MonthlyPayementTable)
    .where(and (
      eq(MonthlyPayementTable.student_id, applicantId), 
      eq(MonthlyPayementTable.academicYear_id, selectedAcademicYear)
    ))

  console.log(paymentHistory);

  return paymentHistory;

}




export const getBalance = async () => {

  const studentId = await getApplicantID();
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
      .where(and(eq(MonthsInSoaTable.applicants_id, studentId), eq(MonthsInSoaTable.academicYear_id, selectedAcademicYear)))
      .orderBy(MonthsInSoaTable.month_id);

    if (soaRecords.length === 0) {
      const paymentMethod = await db
        .select({ paymentMethod: downPaymentTable.paymentMethod })
        .from(downPaymentTable)
        .where(eq(downPaymentTable.applicants_id, studentId))
        .limit(1);

        console.log("none");
      return {
        dueThisMonth: 0,
        totalRemainingBalance: 0,
        paymentMethod: paymentMethod[0]?.paymentMethod,
      };
    }


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

    const paymentMethod = await db
    .select({
      paymentMethod: downPaymentTable.paymentMethod,
    })
    .from(downPaymentTable)
    .where(eq(downPaymentTable.applicants_id, studentId))
    .limit(1);

    return {
      dueThisMonth: Math.max(0, dueThisMonth), // Ensure non-negative
      totalRemainingBalance: Math.max(0, totalRemainingBalance), // Ensure non-negative
      paymentMethod: paymentMethod[0]?.paymentMethod,
    };
}



export const addPayment = async (
  amount: number,
  mop: string,
  POP: string,
) => {


    const studentId = await getApplicantID();
      if (!studentId) return null;

    const id = await getStudentId();
    if (!id) return null;


     // Get current month name (e.g., 'October')
     const currentMonth = new Date().toLocaleString('default', { month: 'long' });
     console.log("Current month:", currentMonth);
     // Find the month_id for the current month for this student
     const monthRow = await db
       .select({ month_id: MonthsInSoaTable.month_id, month: MonthsInSoaTable.month })
       .from(MonthsInSoaTable)
       .where(eq(MonthsInSoaTable.applicants_id, studentId));

     const currentMonthRow = monthRow.find(row => (row.month || '').toLowerCase().includes(currentMonth.toLowerCase()));
    //  if (!currentMonthRow) return null; // No SOA for current month
    if (!currentMonthRow) {
      console.warn(" No due for current month:", currentMonth);
      return { success: false, error: `No SOA found for ${currentMonth}. Please contact the cashier.` };
    }


    const currentMonthId = currentMonthRow.month_id;
    const academicYearID = await getAcademicYearID();
     

     try{
     const result =
    await db
       .insert(MonthlyPayementTable)
       .values({
        student_id: id,
        month_id: currentMonthId,
        academicYear_id: academicYearID,
        amount: amount,
        proofOfPayment: POP,
        modeOfPayment: mop,
        dateOfPayment: new Date().toISOString().split('T')[0],
        status: "Pending",
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
      .where(and(
        eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id), 
        eq(AdmissionStatusTable.applicants_id, applicantId),
        eq(AdmissionStatusTable.admissionStatus, "Enrolled")
      ))

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

  export const getReceipt = async (selectedID: number) => {
  
    const paymentReceipt = await db.select({
      proofOfPayment: MonthlyPayementTable.proofOfPayment,
      amount: MonthlyPayementTable.amount
    })
      .from(MonthlyPayementTable)
      .where(eq(MonthlyPayementTable.monthlyPayment_id, selectedID ));
    return paymentReceipt;
  } 

  export const getPaymentReceipt = async (selectedID: number) => {
  
    const paymentReceipt = await db.select({
      // cashiersReceipt: MonthlyPayementTable.cashiersReceipt,
    })
      .from(MonthlyPayementTable)
      .where(eq(MonthlyPayementTable.monthlyPayment_id, selectedID ));
    return paymentReceipt;
  } 
  
  export const getRInfo = async () => {

    const info = await db
    .select({
      schoolName: ReceiptInfoTable.schoolName,
      address: ReceiptInfoTable.address,
      tin: ReceiptInfoTable.tin,
      atpNumber: ReceiptInfoTable.atpNumber,
      dateIssued: ReceiptInfoTable.dateIssued,
      dateExpired: ReceiptInfoTable.dateExpired
    }).from(ReceiptInfoTable)

  return info[0] ?? null; // return only one row
  }

  export const getPaymentInfo = async (selectedID: number) => {

    const info = await db
    .select({
      student_id: MonthlyPayementTable.student_id,
      studentName: sql<string>` ${StudentInfoTable.studentFirstName} || ' ' || ${StudentInfoTable.studentMiddleName} || ' ' || ${StudentInfoTable.studentLastName}`.as("studentName"),    
      academic_id: MonthlyPayementTable.academicYear_id,
      academicYear: AcademicYearTable.academicYear,
      amount: MonthlyPayementTable.amount,
      dateOfVerification: MonthlyPayementTable.dateOfVerification,
      modeOfPayment: MonthlyPayementTable.modeOfPayment,
      status: MonthlyPayementTable.status,

    })
    .from(MonthlyPayementTable)
    .leftJoin(StudentInfoTable, eq(MonthlyPayementTable.student_id, StudentInfoTable.student_id))
    .leftJoin(AcademicYearTable, eq(MonthlyPayementTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(eq(MonthlyPayementTable.monthlyPayment_id, selectedID ));


  return info[0] ?? null; // return only one row
  }


  export const getAnnouncement = async () => {
  
  const selectedAcademicYear = await getSelectedAcademicYear();
    
  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected");
  }
    const get_announcement = await db
    .select({
      title: AnnouncementTable.title,
      content: AnnouncementTable.content,
      createdAt: AnnouncementTable.createdAt,
      image: AnnouncementTable.image,
    })
    .from(AnnouncementTable)
    .orderBy(desc(AnnouncementTable.announcement_id))
    .where(eq(AnnouncementTable.academicYear_id, selectedAcademicYear ?? 1));
    return get_announcement;
  }

  export const ActiveAnnouncement = async () => {
  
    const selectedAcademicYear = await getSelectedAcademicYear();
    
    if (!selectedAcademicYear) {
      console.warn("❌ No academic year selected");
    }
    const studentId = await getStudentId();
    if (!studentId) return [];

      const get_announcement = await db
      .select({
        announcement_id: AnnouncementTable.announcement_id,
        title: AnnouncementTable.title,
        content: AnnouncementTable.content,
        date: AnnouncementTable.createdAt,
        image: AnnouncementTable.image,
      })
      .from(AnnouncementTable)
      .leftJoin(AnnouncementReadStatusTable, eq(AnnouncementTable.announcement_id, AnnouncementReadStatusTable.announcement_id))
      .orderBy(desc(AnnouncementTable.announcement_id))
      .where(and(
        eq(AnnouncementTable.academicYear_id, selectedAcademicYear ?? 1),
        eq(AnnouncementReadStatusTable.isRead, false),
        eq(AnnouncementReadStatusTable.student_id, studentId),
      ))
      .limit(1);
      return get_announcement;
  }

  export const UpdateAnnouncementReadStatus = async (announcementId: number) => {
  const studentId = await getStudentId();
  if (!studentId) return;

  await db
    .update(AnnouncementReadStatusTable)
    .set({ isRead: true })
    .where(
      and(
        eq(AnnouncementReadStatusTable.announcement_id, announcementId),
        eq(AnnouncementReadStatusTable.student_id, studentId)
      )
    );
};



export const sendReminder = async (lrn: string, email: string, balance: number) => {
  try {
    // --- 1. Send email ---
    const now = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[now.getMonth()]; // e.g., "October"
    const dueDay = 5;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailContent = `
      Dear Student,

      This is a friendly reminder that you have an outstanding balance of ₱${balance} for the month of ${currentMonth}.

      Please settle your balance on or before the ${dueDay}th of ${currentMonth} to avoid any inconvenience.

      Thank you,
      Rizal Institute - Canlubang Registrar Office
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Tuition Fee Reminder for ${currentMonth}`,
      text: mailContent,
    });

    console.log(`Reminder sent to ${email} for LRN ${lrn}`);

    // --- 2. Update Reminder flag in DB for current month ---
    const student = await db
      .select()
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, lrn))
      .limit(1);

    if (student.length === 0) {
      throw new Error("Student not found.");
    }

    // await db
    //   .update(MonthsInSoaTable)
    //   .set({ Reminder: true })
    //   .where(and(
    //     eq(MonthsInSoaTable.applicants_id, student[0].applicants_id),
    //     (eq(MonthsInSoaTable.month, currentMonth)
    //   )));
    await db
      .update(MonthsInSoaTable)
      .set({ Reminder: true })
      .where(
        and(
          eq(MonthsInSoaTable.applicants_id, student[0].applicants_id),
          like(MonthsInSoaTable.month, `${currentMonth}%`)
        )
      );

    console.log(`Reminder flag updated for ${currentMonth} for LRN ${lrn}`);
  } catch (err) {
    console.error("Failed to send reminder:", err);
    throw err;
  }
};



export const studentProfile = async () => { 
  const applicantId = await getApplicantID();
  if (!applicantId) return null;
  console.log("Applicant ID:", applicantId);
  
  const selectedAcademicYear = await getSelectedAcademicYear();
  
  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected");
  }

  const studentsInfo = await db
  .select({
    studentLastName: StudentInfoTable.studentLastName,
    studentFirstName: StudentInfoTable.studentFirstName,
    studentMiddleName: StudentInfoTable.studentMiddleName,
    studentSuffix: StudentInfoTable.studentSuffix,
    lrn: StudentInfoTable.lrn,
    religion: StudentInfoTable.religion,
    ip: StudentInfoTable.ip,
    motherTounge: StudentInfoTable.motherTounge,
    house_no_purok: StudentInfoTable.house_no_purok,
    barangay: StudentInfoTable.barangay,
    city: StudentInfoTable.city,
    province: StudentInfoTable.province,
    studentGender: StudentInfoTable.studentGender,
    studentBirthDate: StudentInfoTable.studentBirthDate,
    studentAge: StudentInfoTable.studentAge,
    gradeToEnroll: studentTypeTable.gradeToEnroll,
    email: applicantsInformationTable.email,
    mobileNumber: applicantsInformationTable.mobileNumber,
    guardiansLastName: guardianAndParentsTable.guardiansLastName,
    guardiansFirstName: guardianAndParentsTable.guardiansFirstName,
    guardiansMiddleName: guardianAndParentsTable.guardiansMiddleName,
    guardiansSuffix: guardianAndParentsTable.guardiansSuffix,
    emergencyContact: guardianAndParentsTable.emergencyContact,
    relationship: guardianAndParentsTable.relationship,
  })
  .from(StudentInfoTable)
  .leftJoin(studentTypeTable, and(
    eq(StudentInfoTable.applicants_id, studentTypeTable.applicants_id),
    eq(studentTypeTable.academicYear_id, selectedAcademicYear ?? 1),
  ))
  .leftJoin(guardianAndParentsTable, eq(StudentInfoTable.applicants_id, guardianAndParentsTable.applicants_id))
  .leftJoin(applicantsInformationTable, eq(StudentInfoTable.applicants_id, applicantsInformationTable.applicants_id))
  .where(eq(StudentInfoTable.applicants_id, applicantId))
  .limit(1);

  return studentsInfo[0] ?? null;
}
