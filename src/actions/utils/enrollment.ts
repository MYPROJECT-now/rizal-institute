"use server";

import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { getAcademicYearID } from "./academicYear";
import { AcademicYearTable, EnrollmentStatusTable } from "@/src/db/schema";

  export const enrollmentStatus = async () => {
      const id = await getAcademicYearID();
      const enrollment = await db
          .select(
              {
                enrollment_start_date: EnrollmentStatusTable.enrollment_start_date,
                isActive: EnrollmentStatusTable.isActive
              }
          )
          .from(EnrollmentStatusTable)
          .leftJoin(AcademicYearTable, eq(EnrollmentStatusTable.academicYear_id, id))
          .limit(1);

          console.log(enrollment);
        return enrollment.length > 0 ? enrollment[0] : null;
  }

// export async function enrollmentGlobalStatus() {
//   const currentPeriod = await db
//   .select()
//   .from(EnrollmentStatusTable)
//   .where(eq(EnrollmentStatusTable.isActive, true))

//   if (!currentPeriod) return false;

//   // check if expired
//   const now = new Date();
//   if (new Date(currentPeriod[0].enrollment_end_date) < now) {
//     // optional: also update DB so it's marked closed
//     await db
//         .update(EnrollmentStatusTable)
//         .set({ isActive: false })
//         .where(eq(EnrollmentStatusTable.enrollment_status_id, currentPeriod[0].enrollment_status_id));
//     return false;
//   }

//   return true;
// }

export async function enrollmentGlobalStatus() {
  const currentPeriod = await db
    .select()
    .from(EnrollmentStatusTable)
    .where(eq(EnrollmentStatusTable.isActive, true));

  if (!currentPeriod || currentPeriod.length === 0) {
    return false;
  }

  // check if expired
  const now = new Date();
  const endDate = new Date(currentPeriod[0].enrollment_end_date);

  if (endDate < now) {
    // optional: also update DB so it's marked closed
    await db
      .update(EnrollmentStatusTable)
      .set({ isActive: false })
      .where(eq(EnrollmentStatusTable.enrollment_status_id, currentPeriod[0].enrollment_status_id));

    return false;
  }

  return true;
}
