// // app/actions/getStudentData.ts
// "use server";

// import { auth, clerkClient } from '@clerk/nextjs/server'
// import { eq } from "drizzle-orm";
// import { db } from "../db/drizzle";
// import { ClerkUserTable, StudentInfoTable, MonthsInSoaTable, MonthlyPayementTable } from "../db/schema";
// import { generateSINumber } from './SI_Number_counter';

// // import { getStudentSOA } from "./cashierAction";


// export const getInfoForDashboard = async () => {

//   // Use `auth()` to get the user's ID
//   const { userId } = await auth()


//   console.log("User ID:", userId);

//   const client = await clerkClient()

//   // Use the Backend SDK's `getUser()` method to get the Backend User object
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   // const user = await client.users.getUser(userId!)

//   const clerkRecord = await db
//     .select()
//     .from(ClerkUserTable)
//     .where(eq(ClerkUserTable.clerkId, userId!))
//     .limit(1);

//   const applicant = clerkRecord[0];
//   if (!applicant) return null;

//   const applicantId = applicant.applicants_id;

//   const studentInfo = await db
//     .select({
//       lrn: StudentInfoTable.lrn,
//       student_id: StudentInfoTable.student_id,
//     })
//     .from(StudentInfoTable)
//     .where(eq(StudentInfoTable.applicants_id, applicantId));

//   let outstandingBalance = 0;
//   if (studentInfo[0]?.student_id) {
//     const monthDue = await db
//       .select({
//         monthlyDue: MonthsInSoaTable.monthlyDue,
//         amountPaid: MonthsInSoaTable.amountPaid,
//         month: MonthsInSoaTable.month,
//         month_id: MonthsInSoaTable.month_id,
//       })
//       .from(MonthsInSoaTable)
//       .where(
//         eq(MonthsInSoaTable.student_id, studentInfo[0].student_id)
//       );
//     // Get current month name (e.g., 'October')
//     const currentMonth = new Date().toLocaleString('default', { month: 'long' });
//     // Find the SOA row for the current month
//     const currentMonthRow = monthDue.find(row =>
//       (row.month || '').toLowerCase().includes(currentMonth.toLowerCase())
//     );
//     const currentMonthId = currentMonthRow?.month_id;
//     if (currentMonthId !== undefined) {
//       // Sum monthlyDue and amountPaid for all months up to and including currentMonthId
//       const dueUpToCurrent = monthDue.filter(row => row.month_id <= currentMonthId);
//       const totalMonthlyDue = dueUpToCurrent.reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
//       const totalAmountPaid = dueUpToCurrent.reduce((sum, row) => sum + (row.amountPaid || 0), 0);
//       outstandingBalance = totalMonthlyDue - totalAmountPaid;
//     }
//   }

//   return {
//     lrn: studentInfo[0]?.lrn,
//     outstandingBalance,
//   };
// }



//   export const getPaymentHistory = async () => {
//   // Use `auth()` to get the user's ID
//   const { userId } = await auth()


//   console.log("User ID:", userId);

//   const client = await clerkClient()

//   // Use the Backend SDK's `getUser()` method to get the Backend User object
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   // const user = await client.users.getUser(userId!)

//   const clerkRecord = await db
//     .select()
//     .from(ClerkUserTable)
//     .where(eq(ClerkUserTable.clerkId, userId!))
//     .limit(1);

//   const applicant = clerkRecord[0];

//   const applicantId = applicant.applicants_id;

//   const paymentHistory = await db
//     .select({
//       month_id: MonthlyPayementTable.month_id,
//       dateOfPayment: MonthlyPayementTable.dateOfPayment,
//       amount: MonthlyPayementTable.amount,
//       modeOfPayment: MonthlyPayementTable.modeOfPayment,
//       dateOfVerification: MonthlyPayementTable.dateOfVerification,
//       siNumber: MonthlyPayementTable.SInumber,
//       status: MonthlyPayementTable.status,
//     })
//     .from(MonthlyPayementTable)
//     .where(eq(MonthlyPayementTable.student_id, applicantId))

//   return paymentHistory;

// }




// export const getBalance = async () => {
//     // Use `auth()` to get the user's ID
//     const { userId } = await auth()

//     // Protect the route by checking if the user is signed in
//     if (!userId) {
//       return null;
//     }
  
//     console.log("User ID:", userId);
  
//     const client = await clerkClient()
  
//     // Use the Backend SDK's `getUser()` method to get the Backend User object
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     // const user = await client.users.getUser(userId!)
  
//     const clerkRecord = await db
//       .select()
//       .from(ClerkUserTable)
//       .where(eq(ClerkUserTable.clerkId, userId!))
//       .limit(1);
  
//     const applicant = clerkRecord[0];
//     if (!applicant) return null;
  
//     const applicantId = applicant.applicants_id;

//     // Get student info to get student_id
//     const studentInfo = await db
//       .select({
//         student_id: StudentInfoTable.student_id,
//       })
//       .from(StudentInfoTable)
//       .where(eq(StudentInfoTable.applicants_id, applicantId));

//     if (!studentInfo[0]?.student_id) return null;

//     const studentId = studentInfo[0].student_id;

//     // Get all SOA records for the student
//     const soaRecords = await db
//       .select({
//         month_id: MonthsInSoaTable.month_id,
//         month: MonthsInSoaTable.month,
//         monthlyDue: MonthsInSoaTable.monthlyDue,
//         amountPaid: MonthsInSoaTable.amountPaid,
//       })
//       .from(MonthsInSoaTable)
//       .where(eq(MonthsInSoaTable.student_id, studentId))
//       .orderBy(MonthsInSoaTable.month_id);

//     if (soaRecords.length === 0) return null;

//     // Get current month name (e.g., 'October')
//     const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    
//     // Find the SOA row for the current month
//     const currentMonthRow = soaRecords.find(row =>
//       (row.month || '').toLowerCase().includes(currentMonth.toLowerCase())
//     );

//     let dueThisMonth = 0;
//     let totalRemainingBalance = 0;

//     if (currentMonthRow) {
//       const currentMonthId = currentMonthRow.month_id;
      
//       // Calculate due this month: sum of monthlyDue for current month and below, minus sum of amountPaid
//       const dueThisMonthRecords = soaRecords.filter(row => row.month_id <= currentMonthId);
//       const totalMonthlyDue = dueThisMonthRecords.reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
//       const totalAmountPaid = dueThisMonthRecords.reduce((sum, row) => sum + (row.amountPaid || 0), 0);
//       dueThisMonth = totalMonthlyDue - totalAmountPaid;
//     }

//     // Calculate total remaining balance: sum of all monthlyDue minus sum of all amountPaid
//     const totalAllMonthlyDue = soaRecords.reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
//     const totalAllAmountPaid = soaRecords.reduce((sum, row) => sum + (row.amountPaid || 0), 0);
//     totalRemainingBalance = totalAllMonthlyDue - totalAllAmountPaid;

//     return {
//       dueThisMonth: Math.max(0, dueThisMonth), // Ensure non-negative
//       totalRemainingBalance: Math.max(0, totalRemainingBalance), // Ensure non-negative
//     };
// }



// export const addPayment = async (
//   amount: number,
//   mop: string,
//   POP: string,
// ) => {
//      // Use `auth()` to get the user's ID
//      const { userId } = await auth()

//      // Protect the route by checking if the user is signed in
//      if (!userId) {
//        return null;
//      }
   
//      console.log("User ID:", userId);
   
//      const client = await clerkClient()
   
//      // Use the Backend SDK's `getUser()` method to get the Backend User object
//      // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     //  const user = await client.users.getUser(userId!)
     
   
//      const clerkRecord = await db
//        .select()
//        .from(ClerkUserTable)
//        .where(eq(ClerkUserTable.clerkId, userId!))
//        .limit(1);
   
//      const applicant = clerkRecord[0];
//      if (!applicant) return null;
   
//      const applicantId = applicant.applicants_id;
 
//      // Get student info to get student_id
//      const studentInfo = await db
//        .select({
//          student_id: StudentInfoTable.student_id,
//        })
//        .from(StudentInfoTable)
//        .where(eq(StudentInfoTable.applicants_id, applicantId));
 
//      if (!studentInfo[0]?.student_id) return null;
 
//      const studentId = studentInfo[0].student_id;

//      // Get current month name (e.g., 'October')
//      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
//      // Find the month_id for the current month for this student
//      const monthRow = await db
//        .select({ month_id: MonthsInSoaTable.month_id, month: MonthsInSoaTable.month })
//        .from(MonthsInSoaTable)
//        .where(eq(MonthsInSoaTable.student_id, studentId));

//      const currentMonthRow = monthRow.find(row => (row.month || '').toLowerCase().includes(currentMonth.toLowerCase()));
//     //  if (!currentMonthRow) return null; // No SOA for current month
//     if (!currentMonthRow) {
//       console.warn(" No SOA for current month:", currentMonth);
//       return { success: false, error: `No SOA found for ${currentMonth}. Please contact the cashier.` };
//     }


//      const currentMonthId = currentMonthRow.month_id;

//      try{
//      const result =
//     await db
//        .insert(MonthlyPayementTable)
//        .values({
//         student_id: studentId,
//         month_id: currentMonthId,
//         amount: amount,
//         proofOfPayment: POP,
//         modeOfPayment: mop,
//         dateOfPayment: new Date().toISOString().split('T')[0],
//         status: "Pending",
//         SInumber: await generateSINumber(),
//     })
//     .returning();
//     console.log("Payment added:", result);
//   } catch (error) {
//     console.error("Error adding payment:", error);
//     return { success: false, error: "Error adding payment" };
//   }

//   return { success: true };
//   } 