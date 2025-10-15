import { db } from "@/src/db/drizzle";
import { AcademicYearTable, staffClerkUserTable } from "@/src/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getSelectedYear = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const result = await db
    .select({
      staffId: staffClerkUserTable.clerkId,
      selectedYear: staffClerkUserTable.selected_AcademicYear_id, 
    })
    .from(staffClerkUserTable)
    .where(eq(staffClerkUserTable.clerkId, userId))
    .limit(1);

  return result[0].selectedYear ?? null;
};

export const getSelectedYearNumber = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const result = await db
    .select({
      academicYear: AcademicYearTable.academicYear,
    })
    .from(staffClerkUserTable)
    .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, staffClerkUserTable.selected_AcademicYear_id))
    .where(eq(staffClerkUserTable.clerkId, userId))
    .limit(1);

  return result[0].academicYear ?? null;
};
