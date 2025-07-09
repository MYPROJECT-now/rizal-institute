"use server";

import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { AcademicYearTable } from "../../db/schema";

export const getAcademicYearID = async () => {
  const academicYearID = await db
    .select()
    .from(AcademicYearTable)
    .where(eq(AcademicYearTable.isActive, true))
    .limit(1);
  return academicYearID[0]?.academicYear_id ?? null;
};