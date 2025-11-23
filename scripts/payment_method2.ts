// // scripts/insertMockApplicants.ts
// import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { applicantsInformationTable, guardianAndParentsTable, educationalBackgroundTable, documentsTable, reservationFeeTable, additionalInformationTable, applicationStatusTable, AdmissionStatusTable, studentTypeTable, tempdownPaymentTable, TempMonthsInSoaTable, downPaymentTable, MonthsInSoaTable, fullPaymentTable, BreakDownTable, AcademicYearTable } from "../src/db/schema";
// import { and, asc, eq } from "drizzle-orm";
// import { AcademicYear } from "@/components/sidebar/utils/academicYearAdmin";

// const sqlClient = neon(process.env.DATABASE_URL!);
// const db = drizzle(sqlClient);

// const insertMockApplicants = async () => {

//   const mockApplicants = [
//     {
//       applicants_id: 21,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 22,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 23,
//       paymentMethod: "full_payment",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 24,
//       paymentMethod: "full_payment",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 25,
//       paymentMethod: "full_payment",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 1,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 2,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320386/reservationPayments/uvwxfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 26,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 27,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 28,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 6,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 7,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 29,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 30,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 31,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 11,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 12,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 32,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 33,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//     {
//       applicants_id: 34,
//       paymentMethod: "Installments",
//       uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
//     },
//   ];


//   for (const { applicants_id, paymentMethod, uploadReservationReceipt } of mockApplicants) {
//     const getTemptDetails = await db
//       .select({ temp_down_id: tempdownPaymentTable.temp_down_id, SINumber: tempdownPaymentTable.SINumber, amount: tempdownPaymentTable.amount, })
//       .from(tempdownPaymentTable)
//       .where(eq(tempdownPaymentTable.applicants_id, applicants_id))
//       .limit(1);
  
//     const tempMonthID = await db
//       .select({ temp_month_id: TempMonthsInSoaTable.temp_month_id })
//       .from(TempMonthsInSoaTable)
//       .leftJoin(AcademicYearTable, eq(TempMonthsInSoaTable.academicYear_id, AcademicYearTable.academicYear_id))
//       .where(and(eq(TempMonthsInSoaTable.applicants_id, applicants_id), eq(AcademicYearTable.academicYear_id, 2)))
  
//     const downPayment = await db
//     .insert(downPaymentTable)
//     .values({
//       applicants_id: applicants_id,
//       temp_down_id: getTemptDetails[0].temp_down_id,
//       amount: getTemptDetails[0].amount,
//       paymentMethod: paymentMethod,
//       academicYear_id: 2,
//       downPaymentDate: new Date().toISOString().slice(0, 10),
//       SINumber: getTemptDetails[0].SINumber,
//     })
//     .returning({ donw_id: downPaymentTable.donw_id });
//     const downId =  downPayment[0].donw_id;

//     const MonthlyDues = await db
//       .select({ 
//         month: TempMonthsInSoaTable.temp_month,
//         monthlyDues: TempMonthsInSoaTable.temp_monthlyDue
//       })
//       .from(TempMonthsInSoaTable)
//       .leftJoin(AcademicYearTable, eq(TempMonthsInSoaTable.academicYear_id, AcademicYearTable.academicYear_id))
//       .where(and(eq(TempMonthsInSoaTable.applicants_id, applicants_id), eq(AcademicYearTable.academicYear_id, 2)))
//       .orderBy(asc(TempMonthsInSoaTable.temp_month_id))


//     for (const due of MonthlyDues) {
//       await db
//       .insert(MonthsInSoaTable)
//       .values({
//         temp_month_id: tempMonthID[0].temp_month_id,
//         downPaymentId: downId,
//         applicants_id: applicants_id,
//         academicYear_id: 2,
//         month: due.month,
//         monthlyDue: due.monthlyDues,
//       });
//     }

//     if (paymentMethod === "full_payment") {
//       const getTotalTuition = await db
//         .select({ total: BreakDownTable.totalTuitionFee})
//         .from(BreakDownTable)
//         .where(eq(BreakDownTable.applicants_id, applicants_id))
      
//       const totalTuition = getTotalTuition[0]?.total ?? 0; // prevent null

//       await db
//       .insert(fullPaymentTable)
//       .values({
//         applicants_id: applicants_id,
//         payment_amount: totalTuition,
//         payment_receipt: uploadReservationReceipt,
//         paymentMethod: "GCash",
//         paymentStatus: "Pending",
//         academicYear_id: 2,
//       })
//     }

//     if (paymentMethod === "Installments") {
//       await db
//       .update(AdmissionStatusTable)
//       .set({
//         confirmationStatus: "Approved",
//         dateOfConfirmation: new Date().toISOString().slice(0, 10),
//       })
//       .where(eq(AdmissionStatusTable.applicants_id, applicants_id));
//     }
//   }
//   console.log("payment method inserted successfully");

// };

// insertMockApplicants();
