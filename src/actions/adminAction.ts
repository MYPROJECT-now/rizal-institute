"use server"

import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { AcademicYearTable } from "../db/schema";

export const getCurrentAcademicYear = async () => {
    const getacademicYear = await db
        .select({
            academicYear_id: AcademicYearTable.academicYear_id,
            academicYear: AcademicYearTable.academicYear,
            academicYearStart: AcademicYearTable.academicYearStart,
            academicYearEnd: AcademicYearTable.academicYearEnd,
        })
        .from(AcademicYearTable)
        .where(eq(AcademicYearTable.isActive, true))
        .limit(1);
    
    console.log(getacademicYear);
    return getacademicYear;
}

export const updateCurrentAcademicYear = async (
    academicYear_id: number, 
    academicYear: string, 
    academicYearStart: string, 
    academicYearEnd: string
) => {
    await db
        .update(AcademicYearTable)
        .set({
            academicYear: academicYear,
            academicYearStart: academicYearStart,
            academicYearEnd: academicYearEnd,
        })
        .where(eq(AcademicYearTable.academicYear_id, academicYear_id))
}

export const stopCurrentAcademicYear = async (academicYear_id: number,) => {
    await db
        .update(AcademicYearTable)
        .set({
            academicYearEnd: new Date().toISOString().split("T")[0],
            isActive: false,
        })
        .where(eq(AcademicYearTable.academicYear_id, academicYear_id))
}

export const createAcademicYear = async (
    academicYear: string,
    academicYearStart: string,
    academicYearEnd: string
) => {

    await db
        .update(AcademicYearTable)
        .set({
            isActive: false,
        })
        .where(eq(AcademicYearTable.isActive, true));

    await db
        .insert(AcademicYearTable)
        .values({
            academicYear: academicYear,
            academicYearStart: academicYearStart,
            academicYearEnd: academicYearEnd,
    })
}  