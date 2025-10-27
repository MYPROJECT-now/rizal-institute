// scripts/insertMockApplicants.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { applicantsInformationTable, guardianAndParentsTable, educationalBackgroundTable, documentsTable, reservationFeeTable, additionalInformationTable, applicationStatusTable, AdmissionStatusTable, studentTypeTable } from "../src/db/schema";
import { eq } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const generateRandomTrackingId = () => Math.random().toString(36).substring(2, 12).toUpperCase();

const insertMockApplicants = async () => {
  const academicYearID = 2; // Replace with actual AcademicYearTable ID

  const mockApplicants = [
    // Grade 7 (3)
    {
      applicantId:1,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      gradeLevel: "8", 
    },
    {
      applicantId:2,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      gradeLevel: "8", 
    },
        {
      applicantId:6,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      gradeLevel: "9", 
    },
        {
      applicantId:7,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      gradeLevel: "9", 
    },
        {
      applicantId:11,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      gradeLevel: "10", 
    },
        {
      applicantId:12,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      gradeLevel: "10", 
    },

  ];

  for (const applicant of mockApplicants) {
    // Insert into applicantsInformationTable
    await db.insert(reservationFeeTable).values({
      applicants_id: applicant.applicantId,
      mop: applicant.mop,
      reservationReceipt: applicant.reservationReceipt,
      reservationAmount: applicant.reservationAmount,    
      academicYear_id: academicYearID,
      dateOfPayment: new Date().toISOString().slice(0, 10),

    });

  const trackingId = generateRandomTrackingId();
  await db.insert(applicationStatusTable).values({
      applicants_id: applicant.applicantId,
    academicYear_id: academicYearID,
    trackingId,
    applicationFormReviewStatus: 'Reserved',
    reservationPaymentStatus: 'Pending',
    dateOfApplication: new Date().toISOString().slice(0, 10),
  });
  await db.insert(AdmissionStatusTable).values({
      applicants_id: applicant.applicantId,
    academicYear_id: academicYearID,
    admissionStatus: 'Pending',
    confirmationStatus: 'Pending',
    dateOfAdmission: new Date().toISOString().slice(0, 10),
  });
  await db.insert(studentTypeTable).values({
    applicants_id: applicant.applicantId,
    academicYear_id: academicYearID,
    studentType : "Old Student",
    gradeToEnroll: applicant.gradeLevel,
    student_case:  "REGULAR",
  });
  }

  console.log("8 mock applicants inserted successfully!");
};

insertMockApplicants();
