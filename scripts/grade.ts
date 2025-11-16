import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {  StudentGradesTable, studentTypeTable } from "../src/db/schema"; // make sure this is imported

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const updateSOA = async () => {
  const Gradesmock = [
    { finalGrade: 90, remarks: "Passed", dateSubmitted: "2023-04-29",  },

  ];

  for (const grades of Gradesmock) {
    await db
      .update(StudentGradesTable)
      .set({
        finalGrade: grades.finalGrade,
        remarks: grades.remarks,
        dateSubmitted: grades.dateSubmitted,
      });

      await db
      .update(studentTypeTable)
      .set({
        promotion: "PROMOTED",
      });
  }

  console.log("updated grades");
};

updateSOA();
