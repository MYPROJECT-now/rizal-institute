// // app/actions/getStudentData.ts
// "use server";

// import { auth, clerkClient } from '@clerk/nextjs/server'
// import { eq } from "drizzle-orm";
// import { db } from "../db/drizzle";
// import { ClerkUserTable, applicantsInformationTable, educationalBackgroundTable, applicationStatusTable, StudentInfoTable, MonthsInSoaTable, MonthlyPayementTable } from "../db/schema";
// import { NextResponse } from 'next/server';
// import { getStudentSOA } from "./cashierAction";

// export async function getStudentData() {
//   // Use `auth()` to get the user's ID
//   const { userId } = await auth()

//   // Protect the route by checking if the user is signed in
//   if (!userId) {
//     return new NextResponse('Unauthorized', { status: 401 })
//   }

//   console.log("User ID:", userId);

//   const client = await clerkClient()

//   // Use the Backend SDK's `getUser()` method to get the Backend User object
//   const user = await client.users.getUser(userId)

//   const clerkRecord = await db
//     .select()
//     .from(ClerkUserTable)
//     .where(eq(ClerkUserTable.clerkId, userId))
//     .limit(1);

//   const applicant = clerkRecord[0];
//   if (!applicant) return null;

//   const applicantId = applicant.applicants_id;

//   const [info] = await db
//     .select()
//     .from(applicantsInformationTable)
//     .where(eq(applicantsInformationTable.applicants_id, applicantId));

//   const [education] = await db
//     .select()
//     .from(educationalBackgroundTable)
//     .where(eq(educationalBackgroundTable.applicants_id, applicantId));

//   const [status] = await db
//     .select()
//     .from(applicationStatusTable)
//     .where(eq(applicationStatusTable.applicants_id, applicantId));

//   // ✅ Log data to terminal
//   console.log("Student Info:", info);
//   console.log("Education Info:", education);
//   console.log("Application Status:", status);

//   // Get outstanding balance using LRN
//   let outstandingBalance = null;
//   if (info?.lrn) {
//     const soa = await getStudentSOA(info.lrn);
//     // Outstanding balance to date: amount due up to current month
//     outstandingBalance = soa?.totals?.totalAmountDue ?? null;
//   }

//   return {
//     studentInfo: info,
//     education,
//     status,
//     outstandingBalance,
//   };
// }

// export async function submitStudentPayment(
//   amount: number,
//   modeOfPayment: string,
//   proofOfPayment: string,
//   monthId: number,
//   siNumber?: string
// ) {
//   try {
//     // Use `auth()` to get the user's ID
//     const { userId } = await auth()

//     // Protect the route by checking if the user is signed in
//     if (!userId) {
//       return { success: false, error: 'Unauthorized' }
//     }

//     // Get student information
//     const clerkRecord = await db
//       .select()
//       .from(ClerkUserTable)
//       .where(eq(ClerkUserTable.clerkId, userId))
//       .limit(1);

//     const applicant = clerkRecord[0];
//     if (!applicant) {
//       return { success: false, error: 'Student not found' }
//     }

//     const applicantId = applicant.applicants_id;

//     const [studentInfo] = await db
//       .select()
//       .from(StudentInfoTable)
//       .where(eq(StudentInfoTable.applicants_id, applicantId));

//     if (!studentInfo) {
//       return { success: false, error: 'Student information not found' }
//     }

//     // Get the month information
//     const [monthInfo] = await db
//       .select({
//         amount: MonthsInSoaTable.monthlyDue,
//         dateOfPayment: MonthsInSoaTable.dateOfPayment,
//       })
//       .from(MonthsInSoaTable)
//       .where(eq(MonthsInSoaTable.month_id, monthId));

//     if (!monthInfo) {
//       return { success: false, error: 'Month information not found' }
//     }

//     // Calculate total paid amount from existing payments
//     const existingPayments = await db
//       .select({
//         amount: MonthlyPayementTable.amount,
//       })
//       .from(MonthlyPayementTable)
//       .where(eq(MonthlyPayementTable.month_id, monthId));

//     const totalPaid = existingPayments.reduce((sum, payment) => sum + payment.amount, 0) + amount;
//     const isFullyPaid = totalPaid >= monthInfo.amount;

//     // Insert payment into MonthlyPayementTable
//     await db.insert(MonthlyPayementTable).values({
//       student_id: studentInfo.student_id,
//       month_id: monthId,
//       dateOfPayment: new Date().toISOString().split('T')[0], // Convert to YYYY-MM-DD format
//       amount: amount,
//       proofOfPayment: proofOfPayment,
//       modeOfPayment: modeOfPayment,
//       SInumber: siNumber || null,
//       status: 'Pending', // Payment status starts as pending
//     });

//     // Update the corresponding month in MonthsInSoaTable
//     // Only mark as fully paid if the total amount is reached
//     await db
//       .update(MonthsInSoaTable)
//       .set({
//         dateOfPayment: isFullyPaid ? new Date().toISOString().split('T')[0] : null,
//         SInumber: siNumber || null,
//       })
//       .where(eq(MonthsInSoaTable.month_id, monthId));

//     return { 
//       success: true, 
//       message: isFullyPaid ? 'Payment submitted successfully! Month is now fully paid.' : 'Partial payment submitted successfully!' 
//     }
//   } catch (error) {
//     console.error('Error submitting payment:', error);
//     return { success: false, error: 'Failed to submit payment' }
//   }
// }

// export async function getStudentUnpaidMonths() {
//   try {
//     // Use `auth()` to get the user's ID
//     const { userId } = await auth()

//     // Protect the route by checking if the user is signed in
//     if (!userId) {
//       return { success: false, error: 'Unauthorized' }
//     }

//     // Get student information
//     const clerkRecord = await db
//       .select()
//       .from(ClerkUserTable)
//       .where(eq(ClerkUserTable.clerkId, userId))
//       .limit(1);

//     const applicant = clerkRecord[0];
//     if (!applicant) {
//       return { success: false, error: 'Student not found' }
//     }

//     const applicantId = applicant.applicants_id;

//     const [studentInfo] = await db
//       .select()
//       .from(StudentInfoTable)
//       .where(eq(StudentInfoTable.applicants_id, applicantId));

//     if (!studentInfo) {
//       return { success: false, error: 'Student information not found' }
//     }

//     // Get all months for the student
//     const allMonths = await db
//       .select({
//         month_id: MonthsInSoaTable.month_id,
//         month: MonthsInSoaTable.month,
//         amount: MonthsInSoaTable.monthlyDue,
//         dateOfPayment: MonthsInSoaTable.dateOfPayment,
//       })
//       .from(MonthsInSoaTable)
//       .where(eq(MonthsInSoaTable.student_id, studentInfo.student_id));

//     // Calculate remaining balance for each month
//     const monthsWithRemainingBalance = await Promise.all(
//       allMonths.map(async (month) => {
//         // Get total paid for this month
//         const payments = await db
//           .select({
//             amount: MonthlyPayementTable.amount,
//           })
//           .from(MonthlyPayementTable)
//           .where(eq(MonthlyPayementTable.month_id, month.month_id));

//         const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
//         const remainingBalance = month.amount - totalPaid;

//         return {
//           ...month,
//           totalPaid,
//           remainingBalance,
//         };
//       })
//     );

//     // Filter only months with remaining balance (unpaid or partially paid)
//     const unpaid = monthsWithRemainingBalance.filter(month => month.remainingBalance > 0);

//     return { success: true, unpaidMonths: unpaid }
//   } catch (error) {
//     console.error('Error getting unpaid months:', error);
//     return { success: false, error: 'Failed to get unpaid months' }
//   }
// }

// export async function getStudentTransactionHistory() {
//   try {
//     // Use `auth()` to get the user's ID
//     const { userId } = await auth()

//     // Protect the route by checking if the user is signed in
//     if (!userId) {
//       return { success: false, error: 'Unauthorized' }
//     }

//     // Get student information
//     const clerkRecord = await db
//       .select()
//       .from(ClerkUserTable)
//       .where(eq(ClerkUserTable.clerkId, userId))
//       .limit(1);

//     const applicant = clerkRecord[0];
//     if (!applicant) {
//       return { success: false, error: 'Student not found' }
//     }

//     const applicantId = applicant.applicants_id;

//     const [studentInfo] = await db
//       .select()
//       .from(StudentInfoTable)
//       .where(eq(StudentInfoTable.applicants_id, applicantId));

//     if (!studentInfo) {
//       return { success: false, error: 'Student information not found' }
//     }

//     // Get transaction history from MonthlyPayementTable
//     const transactions = await db
//       .select({
//         date: MonthlyPayementTable.dateOfPayment,
//         amount: MonthlyPayementTable.amount,
//         method: MonthlyPayementTable.modeOfPayment,
//         siNumber: MonthlyPayementTable.SInumber,
//         status: MonthlyPayementTable.status,
//         proofOfPayment: MonthlyPayementTable.proofOfPayment,
//       })
//       .from(MonthlyPayementTable)
//       .where(eq(MonthlyPayementTable.student_id, studentInfo.student_id))
//       .orderBy(MonthlyPayementTable.dateOfPayment);

//     return { success: true, transactions }
//   } catch (error) {
//     console.error('Error getting transaction history:', error);
//     return { success: false, error: 'Failed to get transaction history' }
//   }
// }
