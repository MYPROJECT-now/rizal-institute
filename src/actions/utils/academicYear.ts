"use server";

import {  desc, eq } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { AcademicYearTable, staffClerkUserTable } from "../../db/schema";
import { getStaffId } from "./staffID";

export const getAcademicYearID = async () => {
  const academicYearID = await db
    .select()
    .from(AcademicYearTable)
    .where(eq(AcademicYearTable.isActive, true))
    .limit(1);
  return academicYearID[0]?.academicYear_id ?? null;
};



export const getAcademicYear = async () => {
  const academicYear = await db
    .select()
    .from(AcademicYearTable)
    .orderBy(desc(AcademicYearTable.academicYear_id));
  return academicYear;
};


export const getDefaultYear = async () => {
  const staff_id = await getStaffId();
    
  if (!staff_id) {
    console.warn("❌ No staff_id found. Cannot get default academic year.");
    return null;
  }

  const defaultYear = await db
    .select({AcademicYear: AcademicYearTable.academicYear})
    .from(staffClerkUserTable)
    .innerJoin(AcademicYearTable, eq(staffClerkUserTable.selected_AcademicYear_id, AcademicYearTable.academicYear_id))
    .where(eq(staffClerkUserTable.clerkId, staff_id))
    .limit(1);
  console.log("defaultYear result:", defaultYear);
  return defaultYear[0]?.AcademicYear ?? null;
  
}

export const updateAcademicYear = async (academicYear: string) => {
  const staff_id = await getStaffId();

  if (!staff_id) {
    console.warn("❌ No staff_id found. Cannot get default academic year.");
    return null;
  }
  const academicYearID = await db
    .select({academicYear_id: AcademicYearTable.academicYear_id})
    .from(AcademicYearTable)
    .where(eq(AcademicYearTable.academicYear, academicYear))
    .limit(1);

  try{
    await db
      .update(staffClerkUserTable)
      .set({ selected_AcademicYear_id: academicYearID[0]?.academicYear_id ?? null })
      .where(eq(staffClerkUserTable.clerkId,  staff_id))

    }catch (error) {
        console.log(error);
      return ({ message: "Academic Year Not Updated" });

    }

    return ({ message: "Academic Year Updated" });
};


export const getSelectedAcademicYear = async () => {
  const staff_id = await getStaffId();

  if (!staff_id) {
    console.warn("❌ No staff_id found. Cannot get default academic year.");
    return null;
  }

  const selectedAcademicYear = await db
  .select({selected_AcademicYear_id: staffClerkUserTable.selected_AcademicYear_id})
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.clerkId, staff_id))
  .limit(1);

  return selectedAcademicYear[0]?.selected_AcademicYear_id ?? null;
}