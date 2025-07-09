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
    
    // Drop tables in reverse order of dependencies to avoid foreign key constraint issues
    await db.execute(sql`DROP TABLE IF EXISTS "staffClerkUserTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "AcademicYearTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "SINumberCounter" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "MonthlyPayementTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "MonthsInSoaTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "downPaymentTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "studentInfoTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "Cashier_remaks_table" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "Registrar_remaks_table" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "ClerkUserTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "AdmissionStatusTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "applicationStatusTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "reservationFeeTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "additionalInformationTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "documentsTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "educationalBackgroundTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "guardianAndParentsTable" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "applicationInformationTable" CASCADE`);
    
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