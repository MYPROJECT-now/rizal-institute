// scripts/insertMockApplicants.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { applicantsInformationTable, guardianAndParentsTable, educationalBackgroundTable, documentsTable, reservationFeeTable, additionalInformationTable, applicationStatusTable, AdmissionStatusTable, studentTypeTable, MonthlyPayementTable } from "../src/db/schema";
import { eq } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);


const insertmonthlyPayment = async () => {
  const academicYearID = 1; // Replace with actual AcademicYearTable ID

  const mockMonthlyPayment = [

  { student_id: 1, month_id: 1, academicYear_id: academicYearID, dateOfPayment: "2023-06-01", amount: 900, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2023-06-05", status: "Approved" },
  { student_id: 1, month_id: 2, academicYear_id: academicYearID, dateOfPayment: "2023-07-01", amount: 900, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2023-07-05", status: "Approved" },
  { student_id: 1, month_id: 3, academicYear_id: academicYearID, dateOfPayment: "2023-08-01", amount: 900, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2023-08-05", status: "Approved" },
  { student_id: 1, month_id: 4, academicYear_id: academicYearID, dateOfPayment: "2023-09-01", amount: 900, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2023-09-05", status: "Approved" },
  { student_id: 1, month_id: 5, academicYear_id: academicYearID, dateOfPayment: "2023-10-01", amount: 900, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2023-10-05", status: "Approved" },
  { student_id: 1, month_id: 6, academicYear_id: academicYearID, dateOfPayment: "2023-11-01", amount: 900, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2023-11-05", status: "Approved" },
  
  { student_id: 2, month_id: 7, academicYear_id: academicYearID, dateOfPayment: "2023-12-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2023-12-05", status: "Approved" },
  { student_id: 2, month_id: 8, academicYear_id: academicYearID, dateOfPayment: "2024-01-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-01-05", status: "Approved" },
  { student_id: 2, month_id: 9, academicYear_id: academicYearID, dateOfPayment: "2024-02-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-02-05", status: "Approved" },
  { student_id: 2, month_id: 10, academicYear_id: academicYearID, dateOfPayment: "2024-03-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-03-05", status: "Approved" },
  { student_id: 2, month_id: 11, academicYear_id: academicYearID, dateOfPayment: "2024-04-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-04-05", status: "Approved" },
  { student_id: 2, month_id: 12, academicYear_id: academicYearID, dateOfPayment: "2024-05-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-05-05", status: "Approved" },
  
  { student_id: 3, month_id: 13, academicYear_id: academicYearID, dateOfPayment: "2024-06-01", amount: 500, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-06-05", status: "Approved" },
  { student_id: 3, month_id: 14, academicYear_id: academicYearID, dateOfPayment: "2024-07-01", amount: 500, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-07-05", status: "Approved" },
  { student_id: 3, month_id: 15, academicYear_id: academicYearID, dateOfPayment: "2024-08-01", amount: 500, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-08-05", status: "Approved" },
  { student_id: 3, month_id: 16, academicYear_id: academicYearID, dateOfPayment: "2024-09-01", amount: 500, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-09-05", status: "Approved" },
  { student_id: 3, month_id: 17, academicYear_id: academicYearID, dateOfPayment: "2024-10-01", amount: 500, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-10-05", status: "Approved" },
  { student_id: 3, month_id: 18, academicYear_id: academicYearID, dateOfPayment: "2024-11-01", amount: 500, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-11-05", status: "Approved" },
  
  { student_id: 4, month_id: 19, academicYear_id: academicYearID, dateOfPayment: "2024-12-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2024-12-05", status: "Approved" },
  { student_id: 4, month_id: 20, academicYear_id: academicYearID, dateOfPayment: "2025-01-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-01-05", status: "Approved" },
  { student_id: 4, month_id: 21, academicYear_id: academicYearID, dateOfPayment: "2025-02-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-02-05", status: "Approved" },
  { student_id: 4, month_id: 22, academicYear_id: academicYearID, dateOfPayment: "2025-03-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-03-05", status: "Approved" },
  { student_id: 4, month_id: 23, academicYear_id: academicYearID, dateOfPayment: "2025-04-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-04-05", status: "Approved" },
  { student_id: 4, month_id: 24, academicYear_id: academicYearID, dateOfPayment: "2025-05-01", amount: 1250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-05-05", status: "Approved" },
 
  { student_id: 5, month_id: 25, academicYear_id: academicYearID, dateOfPayment: "2025-06-01", amount: 250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-06-05", status: "Approved" },
  { student_id: 5, month_id: 26, academicYear_id: academicYearID, dateOfPayment: "2025-07-01", amount: 250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-07-05", status: "Approved" },
  { student_id: 5, month_id: 27, academicYear_id: academicYearID, dateOfPayment: "2025-08-01", amount: 250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-08-05", status: "Approved" },
  { student_id: 5, month_id: 28, academicYear_id: academicYearID, dateOfPayment: "2025-09-01", amount: 250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-09-05", status: "Approved" },
  { student_id: 5, month_id: 29, academicYear_id: academicYearID, dateOfPayment: "2025-10-01", amount: 250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-10-05", status: "Approved" },
  { student_id: 5, month_id: 30, academicYear_id: academicYearID, dateOfPayment: "2025-11-01", amount: 250, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-11-05", status: "Approved" },
  
  { student_id: 6, month_id: 31, academicYear_id: academicYearID, dateOfPayment: "2025-12-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2025-12-05", status: "Approved" },
  { student_id: 6, month_id: 32, academicYear_id: academicYearID, dateOfPayment: "2026-01-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-01-05", status: "Approved" },
  { student_id: 6, month_id: 33, academicYear_id: academicYearID, dateOfPayment: "2026-02-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-02-05", status: "Approved" },
  { student_id: 6, month_id: 34, academicYear_id: academicYearID, dateOfPayment: "2026-03-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-03-05", status: "Approved" },
  { student_id: 6, month_id: 35, academicYear_id: academicYearID, dateOfPayment: "2026-04-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-04-05", status: "Approved" },
  { student_id: 6, month_id: 36, academicYear_id: academicYearID, dateOfPayment: "2026-05-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-05-05", status: "Approved" },


  { student_id: 7, month_id: 37, academicYear_id: academicYearID, dateOfPayment: "2026-06-01", amount: 2750, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-06-05", status: "Approved" },
  { student_id: 7, month_id: 38, academicYear_id: academicYearID, dateOfPayment: "2026-07-01", amount: 2750, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-07-05", status: "Approved" },
  { student_id: 7, month_id: 39, academicYear_id: academicYearID, dateOfPayment: "2026-08-01", amount: 2750, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-08-05", status: "Approved" },
  { student_id: 7, month_id: 40, academicYear_id: academicYearID, dateOfPayment: "2026-09-01", amount: 2750, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2026-09-05", status: "Approved" },
  { student_id: 7, month_id: 41, academicYear_id: academicYearID, dateOfPayment: "2027-11-01", amount: 2750, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2027-11-05", status: "Approved" },
  { student_id: 7, month_id: 42, academicYear_id: academicYearID, dateOfPayment: "2027-12-01", amount: 2750, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2027-12-05", status: "Approved" },
  
  { student_id: 8, month_id: 43, academicYear_id: academicYearID, dateOfPayment: "2028-01-01", amount: 2184, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-01-05", status: "Approved" },
  { student_id: 8, month_id: 44, academicYear_id: academicYearID, dateOfPayment: "2028-02-01", amount: 2184, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-02-05", status: "Approved" },
  { student_id: 8, month_id: 45, academicYear_id: academicYearID, dateOfPayment: "2028-03-01", amount: 2183, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-03-05", status: "Approved" },
  { student_id: 8, month_id: 46, academicYear_id: academicYearID, dateOfPayment: "2028-04-01", amount: 2183, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-04-05", status: "Approved" },
  { student_id: 8, month_id: 47, academicYear_id: academicYearID, dateOfPayment: "2028-05-01", amount: 2183, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-05-05", status: "Approved" },
  { student_id: 8, month_id: 48, academicYear_id: academicYearID, dateOfPayment: "2028-06-01", amount: 2183, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-06-05", status: "Approved" },
  
  { student_id: 9, month_id: 49, academicYear_id: academicYearID, dateOfPayment: "2028-07-01", amount: 1334, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-07-05", status: "Approved" },
  { student_id: 9, month_id: 50, academicYear_id: academicYearID, dateOfPayment: "2028-08-01", amount: 1334, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-08-05", status: "Approved" },
  { student_id: 9, month_id: 51, academicYear_id: academicYearID, dateOfPayment: "2028-09-01", amount: 1333, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-09-05", status: "Approved" },
  { student_id: 9, month_id: 52, academicYear_id: academicYearID, dateOfPayment: "2028-10-01", amount: 1333, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-10-05", status: "Approved" },
  { student_id: 9, month_id: 53, academicYear_id: academicYearID, dateOfPayment: "2028-11-01", amount: 1333, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-11-05", status: "Approved" },
  { student_id: 9, month_id: 54, academicYear_id: academicYearID, dateOfPayment: "2028-12-01", amount: 1333, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2028-12-05", status: "Approved" },
  
  { student_id: 10, month_id: 55, academicYear_id: academicYearID, dateOfPayment: "2029-01-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-01-05", status: "Approved" },
  { student_id: 10, month_id: 56, academicYear_id: academicYearID, dateOfPayment: "2029-02-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-02-05", status: "Approved" },
  { student_id: 10, month_id: 57, academicYear_id: academicYearID, dateOfPayment: "2029-03-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-03-05", status: "Approved" },
  { student_id: 10, month_id: 58, academicYear_id: academicYearID, dateOfPayment: "2029-04-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-04-05", status: "Approved" },
  { student_id: 10, month_id: 59, academicYear_id: academicYearID, dateOfPayment: "2029-05-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-05-05", status: "Approved" },
  { student_id: 10, month_id: 60, academicYear_id: academicYearID, dateOfPayment: "2029-06-01", amount: 2100, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-06-05", status: "Approved" },
  
  { student_id: 11, month_id: 61, academicYear_id: academicYearID, dateOfPayment: "2029-07-01", amount: 1334, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-07-05", status: "Approved" },
  { student_id: 11, month_id: 62, academicYear_id: academicYearID, dateOfPayment: "2029-08-01", amount: 1334, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-08-05", status: "Approved" },
  { student_id: 11, month_id: 63, academicYear_id: academicYearID, dateOfPayment: "2029-09-01", amount: 1333, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-09-05", status: "Approved" },
  { student_id: 11, month_id: 64, academicYear_id: academicYearID, dateOfPayment: "2029-10-01", amount: 1333, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-10-05", status: "Approved" },
  { student_id: 11, month_id: 65, academicYear_id: academicYearID, dateOfPayment: "2029-11-01", amount: 1333, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-11-05", status: "Approved" },
  { student_id: 11, month_id: 66, academicYear_id: academicYearID, dateOfPayment: "2029-12-01", amount: 1333, proofOfPayment: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", modeOfPayment: "GCash", dateOfVerification: "2029-12-05", status: "Approved" },


    
  ];

  for (const applicant of mockMonthlyPayment) {
    // Insert into applicantsInformationTable
    const result = await db.insert(MonthlyPayementTable).values({
      student_id: applicant.student_id,
      month_id: applicant.month_id,
      academicYear_id: applicant.academicYear_id,
      dateOfPayment: applicant.dateOfPayment,
      amount: applicant.amount,
      proofOfPayment: applicant.proofOfPayment,
      modeOfPayment: applicant.modeOfPayment,
      dateOfVerification: applicant.dateOfVerification,
      status: applicant.status,
    })


  }

  console.log("11 mock applicants inserted successfully!");
};

insertmonthlyPayment();
