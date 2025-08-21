"use server"

import { desc, eq} from "drizzle-orm";
import { db } from "../db/drizzle";
import { AcademicYearTable, auditTrailsTable, ClerkUserTable, EnrollmentStatusTable, GradeLevelTable, staffClerkUserTable, SubjectTable, TeacherAssignmentTable } from "../db/schema";
import { requireStaffAuth } from "./utils/staffAuth";
import { clerkClient } from "@clerk/nextjs/server";
import { getAcademicYearID, getSelectedAcademicYear } from "./utils/academicYear";
import { getStaffCredentials } from "./utils/staffID";


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
    .orderBy(desc(AcademicYearTable.academicYear_id))
    .limit(1);

  return latestYear[0] ?? null;
};

  export const getCurrentEnrollmentPeriod = async () => {
  await requireStaffAuth(["admin"]); // gatekeeper

  // Try to get the active academic year
  const enrollment = await db
    .select({
      enrollmentID: EnrollmentStatusTable.enrollment_status_id,
      enrollment: EnrollmentStatusTable.enrollment_period,
      enrollmentStart: EnrollmentStatusTable.enrollment_start_date,
      academicYearEnd: EnrollmentStatusTable.enrollment_end_date,
      isActive: EnrollmentStatusTable.isActive,
    })
    .from(EnrollmentStatusTable)
    .where(eq(EnrollmentStatusTable.isActive, true))
    .limit(1);

    console.log(enrollment);
    
  if (enrollment.length > 0) {
    return enrollment[0]; // return active year
  }


  // If no active year, get the latest one
  const latestYear = await db
    .select({
      enrollmentID: EnrollmentStatusTable.enrollment_status_id,
      enrollment: EnrollmentStatusTable.enrollment_period,
      enrollmentStart: EnrollmentStatusTable.enrollment_start_date,
      academicYearEnd: EnrollmentStatusTable.enrollment_end_date,
      isActive: EnrollmentStatusTable.isActive,
    })
    .from(EnrollmentStatusTable)
    .orderBy(desc(EnrollmentStatusTable.enrollment_status_id))
    .limit(1);

  return latestYear[0] ?? null;
};


export const updateCurrentAcademicYear = async (
    academicYear_id: number, 
    academicYear: string, 
    academicYearStart: string, 
    academicYearEnd: string
) => {

    const credentials = await getStaffCredentials();
      if (!credentials) {
      return console.error("User not found.");
    }

    await requireStaffAuth(["admin"]); // gatekeeper

    await db
        .update(AcademicYearTable)
        .set({
            academicYear: academicYear,
            academicYearStart: academicYearStart,
            academicYearEnd: academicYearEnd,
        })
        .where(eq(AcademicYearTable.academicYear_id, academicYear_id))

      await db.insert(auditTrailsTable)
        .values({
        actionTaken: "Updated Academic Year",
        actionTakenFor: "school",
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })
}

  export const updateEnrollmentPeriod = async (
      enrollmentID: number, 
      enrollment: string, 
      enrollmentStart: string, 
      enrollmentEnd: string
  ) => {
    const credentials = await getStaffCredentials();
      if (!credentials) {
      return console.error("User not found.");
    }

      await requireStaffAuth(["admin"]); // gatekeeper

      await db
          .update(EnrollmentStatusTable)
          .set({
              enrollment_period: enrollment,
              enrollment_start_date: enrollmentStart,
              enrollment_end_date: enrollmentEnd,
              isActive: true,
          })
          .where(eq(EnrollmentStatusTable.enrollment_status_id, enrollmentID))
      await db.insert(auditTrailsTable)
        .values({
        actionTaken: "Update Enrollment Period",
        actionTakenFor: "school",
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })
  }


export const stopCurrentAcademicYear = async (academicYear_id: number,) => {
    const credentials = await getStaffCredentials();
      if (!credentials) {
      return console.error("User not found.");
    }

    await requireStaffAuth(["admin"]); // gatekeeper

    await db
        .update(AcademicYearTable)
        .set({
            academicYearEnd: new Date().toISOString().split("T")[0],
            isActive: false,
        })
        .where(eq(AcademicYearTable.academicYear_id, academicYear_id))
      
        await db.insert(auditTrailsTable)
        .values({
        actionTaken: "Stop Academic Year",
        actionTakenFor: "school",
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })
}

export const stopCurrentEnrollmentPeriod = async (academicYear_id: number,) => {
    await requireStaffAuth(["admin"]); // gatekeeper

    const credentials = await getStaffCredentials();
      if (!credentials) {
      return console.error("User not found.");
    }

    await db
        .update(EnrollmentStatusTable)
        .set({
            enrollment_end_date: new Date().toISOString().split("T")[0],
            isActive: false,
        })
        .where(eq(EnrollmentStatusTable.academicYear_id, academicYear_id))
      
      await db.insert(auditTrailsTable)
        .values({
        actionTaken: "Stop Enrollment",
        actionTakenFor: "school",
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })
}



export const createAcademicYear = async (
    academicYear: string,
    academicYearStart: string,
    academicYearEnd: string
) => {
    await requireStaffAuth(["admin"]); // gatekeeper

    const credentials = await getStaffCredentials();
      if (!credentials) {
      return console.error("User not found.");
    }
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

    await db.insert(auditTrailsTable)
        .values({
        actionTaken: "Create New Academic Year",
        actionTakenFor: "school",
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })
}  

export const createEnrollment = async (
    enrollment: string,
    enrollmentStart: string,
    enrollmentEnd: string
) => {
    await requireStaffAuth(["admin"]); // gatekeeper
    const acad_id = await getAcademicYearID();
    const credentials = await getStaffCredentials();
      if (!credentials) {
      return console.error("User not found.");
    }
    
    await db
        .update(EnrollmentStatusTable)
        .set({
            isActive: false,
        })
        .where(eq(EnrollmentStatusTable.isActive, true));

    await db
        .insert(EnrollmentStatusTable)
        .values({
            academicYear_id: acad_id,
            enrollment_period: enrollment,
            enrollment_start_date: enrollmentStart,
            enrollment_end_date: enrollmentEnd,
    })

      await db.insert(auditTrailsTable)
        .values({
        actionTaken: "Create New Enrollment Period",
        actionTakenFor: "school",
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
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
    .limit(7);

    console.log(result)
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
    
export const deleteUser = async (clerkId: string, clerk_username: string) => {
  await requireStaffAuth(["admin"]); // Gatekeeper
  
  try {

    const userId = clerkId;
    const credentials = await getStaffCredentials();
      if (!credentials) {
      return console.error("User not found.");
    }
    
    // Try to update staffClerkUserTable first
    const staffDeleteResult = await db.delete(staffClerkUserTable).where(eq(staffClerkUserTable.clerkId, clerkId));
    await db.insert(auditTrailsTable)
        .values({
        actionTaken: "Staff Account Deleted",
        actionTakenFor: clerk_username,
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })
    const client = await clerkClient();
    await client.users.deleteUser(userId);

    if (staffDeleteResult.rowCount === 0) {
      // If not found in staff table, try ClerkUserTable
      const clerkDeleteResult = await db
        .update(ClerkUserTable)
        .set({ isActive: false })
        .where(eq(ClerkUserTable.clerkId, clerkId));
      
      await db.insert(auditTrailsTable)
        .values({
        actionTaken: "Student Account Deleted",
        actionTakenFor: clerk_username,
        dateOfAction: new Date().toISOString(),
        username: credentials.clerk_username,
        usertype: credentials.userType,
        academicYear_id: await getAcademicYearID(),
      })

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
  if (!currentAcademicYear) {
    throw new Error("No academic year is active.");
  }

  const credentials = await getStaffCredentials();
     
  if (!credentials) return null;

  const username = credentials?.clerk_username;
  const userType = credentials?.userType;

  const getTeachersName = await db
  .select ({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.clerk_uid, clerk_uid))

  const teachersUsername = getTeachersName[0].clerk_username

  const data = assignments.map((a) => ({
    clerk_uid,
    academicYear_id: currentAcademicYear.academicYear_id,
    gradeLevel_id: a.gradeLevel_id,
    subject_id: a.subject_id,
  }));

  await db.insert(TeacherAssignmentTable).values(data);

  await db
  .insert(auditTrailsTable)
  .values({
    username: username,
    usertype: userType,
    actionTaken: "Assign Subject",
    dateOfAction: new Date().toISOString(),
    actionTakenFor: teachersUsername,
    academicYear_id: await getAcademicYearID(),
  }) ;
};
  


export const getTTotalCashier = async () => {
  
  await requireStaffAuth(["admin"]); // Gatekeeper

    
  const cashier = await db
  .select({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "cashier"))
  return cashier.length;
}

export const getTotalRegistrar = async () => {
  
  await requireStaffAuth(["admin"]); // Gatekeeper

    
  const registrar = await db
  .select({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "registrar"))
  return registrar.length;
}

export const getTotalTeacher = async () => {
  
  await requireStaffAuth(["admin"]); // Gatekeeper

    
  const teacher = await db
  .select({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "teacher"))
  return teacher.length;
}

export const getTotalAdmin = async () => {
  
  await requireStaffAuth(["admin"]); // Gatekeeper

    
  const admin = await db
  .select({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "admin"))
  return admin.length;
}


export const getEnrollmentStatus = async () => {

  await requireStaffAuth(["admin"]); // Gatekeeper

  const enrollmentStatus = await db
  .select({
    enrollmentStatus: EnrollmentStatusTable.isActive,
  })
  .from(EnrollmentStatusTable)
  return enrollmentStatus;
}