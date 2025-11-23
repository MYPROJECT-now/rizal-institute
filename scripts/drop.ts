import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";
import { clerkClient } from "@clerk/clerk-sdk-node";

import * as schema from "../src/db/schema";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient, { schema });

// Function to delete all Clerk users
const deleteAllClerkUsers = async () => {
  try {
    console.log("Fetching Clerk users...");

    let deletedCount = 0;
    let page = 1;
    const limit = 100;

    while (true) {
      // Clerk supports pagination, we fetch in chunks
      const users = await clerkClient.users.getUserList({ limit, offset: (page - 1) * limit });

      if (users.length === 0) break;

      for (const user of users) {
        await clerkClient.users.deleteUser(user.id);
        console.log(`🗑️ Deleted Clerk user: ${user.id} (${user.emailAddresses?.[0]?.emailAddress || "no-email"})`);
        deletedCount++;
      }

      page++;
    }

    console.log(`✅ Deleted ${deletedCount} Clerk users successfully.`);
  } catch (err) {
    console.error("❌ Error deleting Clerk users:", err);
    throw new Error("Failed to delete Clerk users");
  }
};

// Function to drop all tables
const dropAllTables = async () => {
  try {
    console.log("Dropping all tables...");

    // applicants information
    await db.execute(sql`DROP TABLE IF EXISTS "applicantsInformationTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "guardianAndParentsTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "educationalBackgroundTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "studentTypeTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "documentsTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "additionalInformationTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "reservationFeeTable" CASCADE`);

    // application status
    await db.execute(sql`DROP TABLE IF EXISTS "applicationStatusTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "AdmissionStatusTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "Registrar_remaks_table" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "Cashier_remaks_table" CASCADE`);

    // students information
    await db.execute(sql`DROP TABLE IF EXISTS "studentInfoTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "StudentGradesTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "SectionTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "StudentPerGradeAndSection" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "RoomTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "ScheduleTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "ESCGranteeTable" CASCADE`);

    // student initial tuition details
    await db.execute(sql`DROP TABLE IF EXISTS "downPaymentTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "tempdownPaymentTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "TempMonthsInSoaTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "fullPaymentTable" CASCADE`);

    // students tuition and payments
    await db.execute(sql`DROP TABLE IF EXISTS "MonthsInSoaTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "MonthlyPayementTable" CASCADE`);

    // tuition fee related
    await db.execute(sql`DROP TABLE IF EXISTS "grantAvailable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "BreakDownTable" CASCADE`);

    // admin components
    await db.execute(sql`DROP TABLE IF EXISTS "AcademicYearTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "EnrollmentStatusTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "auditTrailsTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "AnnouncementTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "AnnouncementReadStatusTable" CASCADE`);

    // teacher component
    await db.execute(sql`DROP TABLE IF EXISTS "TeacherAssignmentTable" CASCADE`);

    // accounts
    await db.execute(sql`DROP TABLE IF EXISTS "staffClerkUserTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "ClerkUserTable" CASCADE`);

    // static components
    await db.execute(sql`DROP TABLE IF EXISTS "SINumberCounter" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "GradeLevelTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "SubjectTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "ReceiptInfoTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "enrollmentPayment" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "EmailVerification" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "TuitionComp" CASCADE`);


    console.log("✅ All tables dropped successfully");
  } catch (error) {
    console.error("❌ Error dropping tables:", error);
    throw new Error("Failed to drop tables");
  }
};

const main = async () => {
  try {
    await deleteAllClerkUsers();
    await dropAllTables();
    console.log("🔥 Database + Clerk users have been completely removed.");
  } catch (error) {
    console.error("Failed to reset everything:", error);
    process.exit(1);
  }
};

main();
