// scripts/insertAcademicYear.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { AcademicYearTable, EnrollmentStatusTable, GradeLevelTable, SubjectTable } from "../src/db/schema";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const insertAcademicYear = async () => {

    const AcademicYear = [
    {
      academicYear: "2025-2026",
      academicYearStart: new Date("2025-10-1").toISOString(), //yyyy-mm-dd
      academicYearEnd: new Date("2026-03-30").toISOString(),
      isActive: true,
    },

    ];
    const result = await db.insert(AcademicYearTable).values(AcademicYear).returning();
    const acadId = result[0].academicYear_id;

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
    const result2 = await db.insert(GradeLevelTable).values(GradeLevel).returning();

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
    ];
    const result3 = await db.insert(SubjectTable).values(Subjects).returning();


    const enrollment = [
      {
      academicYear_id: acadId,
      enrollment_period: "2025-2026",
      enrollment_start_date: "2025-06-01",
      enrollment_end_date: "2025-10-01",
      }


    ]
    const result4 = await db.insert(EnrollmentStatusTable).values(enrollment).returning();

    console.log("Data inserted successfully", {result, result2, result3, result4});

};

insertAcademicYear();
