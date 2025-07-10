"use server"

import { desc, eq} from "drizzle-orm";
import { db } from "../db/drizzle";
import { AcademicYearTable } from "../db/schema";
import { requireStaffAuth } from "./utils/staffAuth";

// export const getCurrentAcademicYear = async () => {
//     await requireStaffAuth(["admin"]); // gatekeeper

//     const getacademicYear = await db
//         .select({
//             academicYear_id: AcademicYearTable.academicYear_id,
//             academicYear: AcademicYearTable.academicYear,
//             academicYearStart: AcademicYearTable.academicYearStart,
//             academicYearEnd: AcademicYearTable.academicYearEnd,
//         })
//         .from(AcademicYearTable)
//         .where(or(eq(AcademicYearTable.isActive, true)))
//         .limit(1);
    
//     console.log(getacademicYear);
//     return getacademicYear;
// }


export const getCurrentAcademicYear = async () => {
  await requireStaffAuth(["admin"]); // gatekeeper

  // Try to get the active academic year
  const activeYear = await db
    .select({
      academicYear_id: AcademicYearTable.academicYear_id,
      academicYear: AcademicYearTable.academicYear,
      academicYearStart: AcademicYearTable.academicYearStart,
      academicYearEnd: AcademicYearTable.academicYearEnd,
      isActive: AcademicYearTable.isActive,
    })
    .from(AcademicYearTable)
    .where(eq(AcademicYearTable.isActive, true))
    .limit(1);

  if (activeYear.length > 0) {
    return activeYear[0]; // return active year
  }

  // If no active year, get the latest one
  const latestYear = await db
    .select({
      academicYear_id: AcademicYearTable.academicYear_id,
      academicYear: AcademicYearTable.academicYear,
      academicYearStart: AcademicYearTable.academicYearStart,
      academicYearEnd: AcademicYearTable.academicYearEnd,
      isActive: AcademicYearTable.isActive,
    })
    .from(AcademicYearTable)
    .orderBy(desc(AcademicYearTable.academicYearStart))
    .limit(1);

  return latestYear[0] ?? null;
};


export const updateCurrentAcademicYear = async (
    academicYear_id: number, 
    academicYear: string, 
    academicYearStart: string, 
    academicYearEnd: string
) => {
    await requireStaffAuth(["admin"]); // gatekeeper

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
    await requireStaffAuth(["admin"]); // gatekeeper

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
    await requireStaffAuth(["admin"]); // gatekeeper

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