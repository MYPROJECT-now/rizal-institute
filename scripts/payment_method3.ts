// scripts/insertMockApplicants.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { applicantsInformationTable, guardianAndParentsTable, educationalBackgroundTable, documentsTable, reservationFeeTable, additionalInformationTable, applicationStatusTable, AdmissionStatusTable, studentTypeTable, tempdownPaymentTable, TempMonthsInSoaTable, downPaymentTable, MonthsInSoaTable, fullPaymentTable, BreakDownTable, AcademicYearTable } from "../src/db/schema";
import { and, asc, eq } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const insertMockApplicants = async () => {

  const mockApplicants = [
    {
      applicants_id: 35,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 36,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320381/reservationPayments/abcdfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 37,
      paymentMethod: "full_payment",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320382/reservationPayments/fghifaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 38,
      paymentMethod: "full_payment",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320383/reservationPayments/jklmfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 39,
      paymentMethod: "full_payment",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320384/reservationPayments/nopqfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 21,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320385/reservationPayments/qrstfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 22,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320386/reservationPayments/uvwxfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 40,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320387/reservationPayments/yzabfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 41,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320388/reservationPayments/cdefaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 42,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320389/reservationPayments/ghijfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 1,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320390/reservationPayments/jklmfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 2,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320391/reservationPayments/mnopfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 43,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320392/reservationPayments/pqrsfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 44,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320393/reservationPayments/stuvfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 45,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320394/reservationPayments/wxyzfaxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 6,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320395/reservationPayments/abcd2faxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 7,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320396/reservationPayments/efgh2faxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 46,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320397/reservationPayments/ijkl2faxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 47,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320398/reservationPayments/mnop2faxnbbkupqv9nodt.jpg",
    },
    {
      applicants_id: 48,
      paymentMethod: "Installments",
      uploadReservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320399/reservationPayments/qrst2faxnbbkupqv9nodt.jpg",
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
      .leftJoin(AcademicYearTable, eq(TempMonthsInSoaTable.academicYear_id, AcademicYearTable.academicYear_id))
      .where(and(eq(TempMonthsInSoaTable.applicants_id, applicants_id), eq(AcademicYearTable.academicYear_id, 3)))
  
    const downPayment = await db
    .insert(downPaymentTable)
    .values({
      applicants_id: applicants_id,
      temp_down_id: getTemptDetails[0].temp_down_id,
      amount: getTemptDetails[0].amount,
      paymentMethod: paymentMethod,
      academicYear_id: 3,
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
      .leftJoin(AcademicYearTable, eq(TempMonthsInSoaTable.academicYear_id, AcademicYearTable.academicYear_id))
      .where(and(eq(TempMonthsInSoaTable.applicants_id, applicants_id), eq(AcademicYearTable.academicYear_id, 3)))
      .orderBy(asc(TempMonthsInSoaTable.temp_month_id))


    for (const due of MonthlyDues) {
      await db
      .insert(MonthsInSoaTable)
      .values({
        temp_month_id: tempMonthID[0].temp_month_id,
        downPaymentId: downId,
        applicants_id: applicants_id,
        academicYear_id: 3,
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
        academicYear_id: 3,
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
