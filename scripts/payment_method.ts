// scripts/insertMockApplicants.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { applicantsInformationTable, guardianAndParentsTable, educationalBackgroundTable, documentsTable, reservationFeeTable, additionalInformationTable, applicationStatusTable, AdmissionStatusTable, studentTypeTable, tempdownPaymentTable, TempMonthsInSoaTable, downPaymentTable, MonthsInSoaTable, fullPaymentTable, BreakDownTable } from "../src/db/schema";
import { asc, eq } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const insertMockApplicants = async () => {

  const mockApplicants = [
    {
      applicants_id: 1,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 2,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 3,
      paymentMethod: "full_payment",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 4,
      paymentMethod: "full_payment",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 5,
      paymentMethod: "full_payment",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 6,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 7,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 8,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 9,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 10,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 11,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 12,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 13,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 14,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 15,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 16,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 17,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 18,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 19,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 20,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
  ];


  for (const { applicants_id, paymentMethod, uploadReservationReceipt } of mockApplicants) {
    const getTemptDetails = await db
      .select({ temp_down_id: tempdownPaymentTable.temp_down_id, SINumber: tempdownPaymentTable.SINumber, amount: tempdownPaymentTable.amount, })
      .from(tempdownPaymentTable)
      .where(eq(tempdownPaymentTable.applicants_id, applicants_id))
      .limit(1);
  
    const tempMonthID = await db
      .select({ temp_month_id: TempMonthsInSoaTable.temp_month_id })
      .from(TempMonthsInSoaTable)
      .where(eq(TempMonthsInSoaTable.applicants_id, applicants_id))
  
    const downPayment = await db
    .insert(downPaymentTable)
    .values({
      applicants_id: applicants_id,
      temp_down_id: getTemptDetails[0].temp_down_id,
      amount: getTemptDetails[0].amount,
      paymentMethod: paymentMethod,
      academicYear_id: 1,
      downPaymentDate: new Date().toISOString().slice(0, 10),
      SINumber: getTemptDetails[0].SINumber,
    })
    .returning({ donw_id: downPaymentTable.donw_id });
    const downId =  downPayment[0].donw_id;

    const MonthlyDues = await db
      .select({ 
        month: TempMonthsInSoaTable.temp_month,
        monthlyDues: TempMonthsInSoaTable.temp_monthlyDue
      })
      .from(TempMonthsInSoaTable)
      .where(eq(TempMonthsInSoaTable.applicants_id, applicants_id))
      .orderBy(asc(TempMonthsInSoaTable.temp_month_id))


    for (const due of MonthlyDues) {
      await db
      .insert(MonthsInSoaTable)
      .values({
        temp_month_id: tempMonthID[0].temp_month_id,
        downPaymentId: downId,
        applicants_id: applicants_id,
        academicYear_id: 1,
        month: due.month,
        monthlyDue: due.monthlyDues,
      });
    }

    if (paymentMethod === "full_payment") {
      const getTotalTuition = await db
        .select({ total: BreakDownTable.totalTuitionFee})
        .from(BreakDownTable)
        .where(eq(BreakDownTable.applicants_id, applicants_id))
      
      const totalTuition = getTotalTuition[0]?.total ?? 0; // prevent null

      await db
      .insert(fullPaymentTable)
      .values({
        applicants_id: applicants_id,
        payment_amount: totalTuition,
        payment_receipt: uploadReservationReceipt,
        paymentMethod: "GCash",
        paymentStatus: "Pending",
        academicYear_id: 1,
      })
    }

    if (paymentMethod === "Installments") {
      await db
      .update(AdmissionStatusTable)
      .set({
        confirmationStatus: "Approved",
        dateOfConfirmation: new Date().toISOString().slice(0, 10),
      })
      .where(eq(AdmissionStatusTable.applicants_id, applicants_id));
    }
  }
  console.log("payment method inserted successfully");

};

insertMockApplicants();
