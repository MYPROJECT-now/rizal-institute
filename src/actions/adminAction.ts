"use server"

import { desc, eq} from "drizzle-orm";
import { db } from "../db/drizzle";
import { AcademicYearTable, auditTrailsTable, ClerkUserTable, GradeLevelTable, staffClerkUserTable, SubjectTable, TeacherAssignmentTable } from "../db/schema";
import { requireStaffAuth } from "./utils/staffAuth";
import { clerkClient } from "@clerk/nextjs/server";
import { getSelectedAcademicYear } from "./studentAction";


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


export const getAuditTrails = async () => {
    await requireStaffAuth(["admin"]); // gatekeeper
    const sy = await getSelectedAcademicYear();

    if (!sy) {
        console.warn("No academic year selected. Cannot get audit trails.");
        return [];
    }

    const result = await db
    .select({
      auditTrail_id: auditTrailsTable.auditTrail_id,
      username: auditTrailsTable.username,
      usertype: auditTrailsTable.usertype,
      actionTaken: auditTrailsTable.actionTaken,
      actionTakenFor: auditTrailsTable.actionTakenFor,
      dateOfAction: auditTrailsTable.dateOfAction,
    })
    .from(auditTrailsTable)
    .where(eq(auditTrailsTable.academicYear_id, sy))
    .orderBy(desc(auditTrailsTable.dateOfAction))
    .limit(10);

    return result;
}

export const getAllAuditTrails = async () => {
    await requireStaffAuth(["admin"]); // gatekeeper
    const sy = await getSelectedAcademicYear();

    if (!sy) {
        console.warn("No academic year selected. Cannot get audit trails.");
        return [];
    }

    const result = await db
    .select({
      auditTrail_id: auditTrailsTable.auditTrail_id,
      username: auditTrailsTable.username,
      usertype: auditTrailsTable.usertype,
      actionTaken: auditTrailsTable.actionTaken,
      actionTakenFor: auditTrailsTable.actionTakenFor,
      dateOfAction: auditTrailsTable.dateOfAction,
    })
    .from(auditTrailsTable)
    .where(eq(auditTrailsTable.academicYear_id, sy))
    .orderBy(desc(auditTrailsTable.dateOfAction))

    console.log(result)
    return result;
}

  export const getAllUsers = async () => {
      await requireStaffAuth(["admin"]); // gatekeeper

      const users = await db
      .select({
        clerk_uid: staffClerkUserTable.clerk_uid,
        clerkId: staffClerkUserTable.clerkId,
        userType: staffClerkUserTable.userType,
        clerk_username: staffClerkUserTable.clerk_username,
        clerk_email: staffClerkUserTable.clerk_email,
        isActive: staffClerkUserTable.isActive,
      })
      .from(staffClerkUserTable)
      .where(eq(staffClerkUserTable.isActive, true))
      .union(
      db.select({
        clerk_uid: ClerkUserTable.clerk_uid,
        clerkId: ClerkUserTable.clerkId,
        userType: ClerkUserTable.userType,
        clerk_username: ClerkUserTable.clerk_username,
        clerk_email: ClerkUserTable.clerk_email,
        isActive: ClerkUserTable.isActive,
      })
      .from(ClerkUserTable)
      .where(eq(ClerkUserTable.isActive, true))
      );

      return users;
  }
    
export const deleteUser = async (clerkId: string) => {
  await requireStaffAuth(["admin"]); // Gatekeeper
  
  try {

    const userId = clerkId;
    
    
    // Try to update staffClerkUserTable first
    const staffDeleteResult = await db.delete(staffClerkUserTable).where(eq(staffClerkUserTable.clerkId, clerkId));

    const client = await clerkClient();
    await client.users.deleteUser(userId);

    if (staffDeleteResult.rowCount === 0) {
      // If not found in staff table, try ClerkUserTable
      const clerkDeleteResult = await db
        .update(ClerkUserTable)
        .set({ isActive: false })
        .where(eq(ClerkUserTable.clerkId, clerkId));

      if (clerkDeleteResult.rowCount === 0) {
        throw new Error("User not found.");
      }
    }
  
    return { message: "User deleted successfully" };

  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred." };
  }
};



export const getGradesAndSubjects = async () => {
  const grades = await db.select().from(GradeLevelTable);
  const subjects = await db.select().from(SubjectTable);
  return { grades, subjects };
};

export const getTeachers = async () => {
  const teachers = await db
    .select({
      clerk_username: staffClerkUserTable.clerk_username,
      clerk_uid: staffClerkUserTable.clerk_uid,

    })
    .from(staffClerkUserTable)
    .where(eq(staffClerkUserTable.userType, "teacher"))
    return teachers;
  } 

  type Assignment = {
  gradeLevel_id: number;
  subject_id: number;
};

export const assignSubjectsToTeacher = async ({
  clerk_uid,
  assignments,
}: {
  clerk_uid: number;
  assignments: Assignment[];
}) => {
  const currentAcademicYear = await getCurrentAcademicYear();
  const data = assignments.map((a) => ({
    clerk_uid,
    academicYear_id: currentAcademicYear.academicYear_id,
    gradeLevel_id: a.gradeLevel_id,
    subject_id: a.subject_id,
  }));

  await db.insert(TeacherAssignmentTable).values(data);
};
  