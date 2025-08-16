"use server";

import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { getAcademicYearID } from "./academicYear";
import { AcademicYearTable, EnrollmentStatusTable } from "@/src/db/schema";

export const enrollmentStatus = async () => {
    const id = await getAcademicYearID();
    const enrollment = await db
        .select(
            {isActive: EnrollmentStatusTable.isActive}
        )
        .from(EnrollmentStatusTable)
        .leftJoin(AcademicYearTable, eq(EnrollmentStatusTable.academicYear_id, id))
        console.log(enrollment);
        return enrollment[0]?.isActive ?? false;

}
