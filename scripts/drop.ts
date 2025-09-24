import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";

import * as schema from "../src/db/schema";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient, { schema });

// Function to drop all tables
const dropAllTables = async () => {
  try {
    console.log("Dropping all tables...");
    
  // applicants information
    await db.execute(sql`DROP TABLE IF EXISTS "applicantsInformationTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "guardianAndParentsTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "educationalBackgroundTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "documentsTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "additionalInformationTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "reservationFeeTable" CASCADE`);

  //application status
    await db.execute(sql`DROP TABLE IF EXISTS "applicationStatusTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "AdmissionStatusTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "Registrar_remaks_table" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "Cashier_remaks_table" CASCADE`);

  // students information
    await db.execute(sql`DROP TABLE IF EXISTS "studentInfoTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "StudentGradesTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "SectionTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "StudentPerGradeAndSection" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "ScheduleTable" CASCADE`);
  // student intital tuition details
    await db.execute(sql`DROP TABLE IF EXISTS "downPaymentTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "tempdownPaymentTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "TempMonthsInSoaTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "fullPaymentTable" CASCADE`);

  // students  tuition and payments
    await db.execute(sql`DROP TABLE IF EXISTS "MonthsInSoaTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "MonthlyPayementTable" CASCADE`);

  // tuition fee related
    await db.execute(sql`DROP TABLE IF EXISTS "grantAvailable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "BreakDownTable" CASCADE`);

  // admin components
    await db.execute(sql`DROP TABLE IF EXISTS "AcademicYearTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "EnrollmentStatusTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "auditTrailsTable" CASCADE`);

  //teacher component
    await db.execute(sql`DROP TABLE IF EXISTS "TeacherAssignmentTable" CASCADE`);

  //accounts
    await db.execute(sql`DROP TABLE IF EXISTS "staffClerkUserTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "ClerkUserTable" CASCADE`);

  // static components
    await db.execute(sql`DROP TABLE IF EXISTS "SINumberCounter" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "GradeLevelTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "SubjectTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "ReceiptInfoTable" CASCADE`);









    
    console.log("All tables dropped successfully");
  } catch (error) {
    console.error("Error dropping tables:", error);
    throw new Error("Failed to drop tables");
  }
};

const main = async () => {
  try {
    await dropAllTables();
    console.log("Database tables have been completely removed.");
  } catch (error) {
    console.error("Failed to drop tables:", error);
    process.exit(1);
  }
};

main(); 