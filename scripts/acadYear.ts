// scripts/insertAcademicYear.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { AcademicYearTable, EnrollmentStatusTable, GradeLevelTable, SubjectTable } from "../src/db/schema";

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
    const result = db.insert(AcademicYearTable).values(AcademicYear).returning();

    const GradeLevel = [
      {
        gradeLevelName: "7",
      },
      {
        gradeLevelName: "8",
      },
      {
        gradeLevelName: "9",
      },
      {
        gradeLevelName: "10",
      },
    ];
    const result2 = db.insert(GradeLevelTable).values(GradeLevel).returning();

    const Subjects = [
      {
        subjectName: "English",
      },
      {
        subjectName: "Filipino",
      },
      {
        subjectName: "Mathematics",
      },
      {
        subjectName: "Science",
      },
      {
        subjectName: "Araling Panlipunan",
      },
      {
        subjectName: "Edukasyon sa Pagpapakatao",
      },
      {
        subjectName: "MAPEH",
      },
      {
        subjectName: "Technology and Livelihood Education",
      },
    ];
    const result3 = db.insert(SubjectTable).values(Subjects).returning();


    const enrollment = [
      {
      academicYear_id: 1,
      enrollment_period: "2025-2026",
      enrollment_start_date: "2025-01-01",
      enrollment_end_date: "2026-01-01",
      }


    ]
    const result4 = db.insert(EnrollmentStatusTable).values(enrollment).returning();

    const insertAll = await Promise.all([result, result2, result3, result4]);
    console.log("Data inserted successfully", insertAll);

  } catch (error) {
    console.error("Error inserting data", error);

    process.exit(1);
  }
};

insertAcademicYear();
