// scripts/insertAcademicYear.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { AcademicYearTable } from "../src/db/schema";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const insertAcademicYear = async () => {
  try {
    const AcademicYear = [
    {
      academicYear: "2025-2026",
      academicYearStart: new Date("2025-06-10").toISOString(),
      academicYearEnd: new Date("2026-03-30").toISOString(),
      isActive: true,
    },

    ];
    const result = await db.insert(AcademicYearTable).values(AcademicYear).returning();
    console.log("Academic year inserted:", result);
  } catch (error) {
    console.error("Error inserting academic year:", error);
    process.exit(1);
  }
};

insertAcademicYear();
