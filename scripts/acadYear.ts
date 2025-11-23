// scripts/insertAcademicYear.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { AcademicYearTable, EnrollmentStatusTable, GradeLevelTable, grantAvailable, ReceiptInfoTable, RoomTable, SubjectTable, TuitionComp } from "../src/db/schema";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const insertAcademicYear = async () => {

    const AcademicYear = [
    {
      academicYear: "2024-2025",
      academicYearStart: new Date("2024-09-01").toISOString(), //yyyy-mm-dd
      academicYearEnd: new Date("2025-04-30").toISOString(),
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
      enrollment_end_date: "2025-11-30",
      }
    ]
    const result4 = await db.insert(EnrollmentStatusTable).values(enrollment).returning();

    const grant = [
      {
        grantAvailable: 30,
        academicYear_id: acadId
      },
    ]
    const result5 = await db.insert(grantAvailable).values(grant).returning();

    const info = [
      {
        schoolName: "Rizal Institute Canlubang Foundation INC.",
        address: "Canlubang, CIty of Calamba 4027, Philippines",
        tin: "183242342342",
        latestSINumber: "004321",
        atpNumber: "123456789",
        dateIssued: "2025-06-01",
        dateExpired: "2030-10-01"
      }
    ]
    const result6 = await db.insert(ReceiptInfoTable).values(info).returning();

    const room = [
      {
        roomName: "Main 101",
      },
      {
        roomName: "Main 102",
      },
      {
        roomName: "Main 103",
      },
      {
        roomName: "Main 104",
      },
      {
        roomName: "Main 105",
      },
      {
        roomName: "Main 106",
      },
    ]
    const result7 = await db.insert(RoomTable).values(room).returning();

    const tuition = [
      {
      gradelevel: "7",
      tuitionBase: 15000,
      miscellaneous: 6000,
      academicYear_id: acadId
      },
      {
      gradelevel: "8",
      tuitionBase: 15000,
      miscellaneous: 6000,
      academicYear_id: acadId
      },
      {
      gradelevel: "9",
      tuitionBase: 16500,
      miscellaneous: 7000,
      academicYear_id: acadId
      },
      {
      gradelevel: "10",
      tuitionBase: 18000,
      miscellaneous: 7500,
      academicYear_id: acadId
      },
    ]
    const result8 = await db.insert(TuitionComp).values(tuition).returning();

    console.log("Data inserted successfully", {result, result2, result3, result4, result5, result6, result7, result8});

  
};

insertAcademicYear();
