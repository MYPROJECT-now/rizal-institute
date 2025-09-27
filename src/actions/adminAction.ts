"use server"

import { and, desc, eq, gte, isNull, lte, or} from "drizzle-orm";
import { db } from "../db/drizzle";
import { AcademicYearTable, auditTrailsTable, ClerkUserTable, EnrollmentStatusTable, GradeLevelTable, ScheduleTable, SectionTable, staffClerkUserTable, SubjectTable, TeacherAssignmentTable } from "../db/schema";
import { requireStaffAuth } from "./utils/staffAuth";
import { clerkClient } from "@clerk/nextjs/server";
import { getAcademicYearID, getSelectedAcademicYear } from "./utils/academicYear";
import { getStaffCredentials } from "./utils/staffID";
import { getSelectedYear } from "./utils/getSelectedYear";

// top analytics
export const getTTotalCashier = async () => {
  
  const cashier = await db
  .select({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "cashier"))
  return cashier.length;
}

export const getTotalRegistrar = async () => {
   
  const registrar = await db
  .select({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "registrar"))
  return registrar.length;
}

export const getTotalTeacher = async () => {
      
  const teacher = await db
  .select({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "teacher"))
  return teacher.length;
}

export const getTotalAdmin = async () => {
      
  const admin = await db
  .select({
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "admin"))
  return admin.length;
}


export const getEnrollmentStatus = async () => {
  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const enrollmentStatus = await db
  .select({
    enrollmentStatus: EnrollmentStatusTable.isActive,
  })
  .from(EnrollmentStatusTable)
  .where(eq(EnrollmentStatusTable.academicYear_id, selectedYear))

  return enrollmentStatus;
}


// audit trails table
export const getAuditTrails = async () => {
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
    .orderBy(desc(auditTrailsTable.auditTrail_id))
    .limit(8);

    console.log(result)
    return result;
}


// get all users  
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


export const getTeachers = async () => {
  const teachers = await db
    .select({
      clerk_username: staffClerkUserTable.clerk_username,
      clerk_uid: staffClerkUserTable.clerk_uid,

    })
    .from(staffClerkUserTable)
    .where(eq(staffClerkUserTable.userType, "teacher"))
    console.log(teachers)
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
  await requireStaffAuth(["admin"]); // Gatekeeper

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


// edit component on assigning
export const getAssignedGradeAndSubjects = async (selectedTeacher: number) => {
  const getAssigned = await db
  .select({
    gradeLevel_id: TeacherAssignmentTable.gradeLevel_id,
    gradeLevelName: GradeLevelTable.gradeLevelName,
    subject_id:TeacherAssignmentTable.subject_id,
    subjectName: SubjectTable.subjectName,
  })
  .from(TeacherAssignmentTable)
  .leftJoin(GradeLevelTable, eq(GradeLevelTable.gradeLevel_id, TeacherAssignmentTable.gradeLevel_id))
  .leftJoin(SubjectTable, eq(SubjectTable.subject_id, TeacherAssignmentTable.subject_id))
  .where(eq(TeacherAssignmentTable.clerk_uid, selectedTeacher))

  console.log(getAssigned);
  return getAssigned;
}

export const getGradesWithUnassignedSubjects = async () => {
  // get all grade levels
  const allGrades = await db.select().from(GradeLevelTable);

  // get all grade-subject assignments
  const assignments = await db
    .select({
      gradeLevel_id: TeacherAssignmentTable.gradeLevel_id,
      subject_id: TeacherAssignmentTable.subject_id,
    })
    .from(TeacherAssignmentTable);

  // build a map of assigned subjects by grade
  const assignedMap = assignments.reduce((acc, row) => {
    if (!acc[row.gradeLevel_id]) acc[row.gradeLevel_id] = new Set<number>();
    acc[row.gradeLevel_id].add(row.subject_id);
    return acc;
  }, {} as Record<number, Set<number>>);

  // get all subjects
  const allSubjects = await db.select().from(SubjectTable).where(eq(SubjectTable.isActive, true));

  // filter grades that still have unassigned subjects
  const gradesWithUnassigned = allGrades.filter((grade) => {
    const assignedSubjects = assignedMap[grade.gradeLevel_id] ?? new Set<number>();
    const unassignedSubjects = allSubjects.filter(
      (subj) => !assignedSubjects.has(subj.subject_id)
    );
    return unassignedSubjects.length > 0; // keep only grades with free subjects
  });

  return gradesWithUnassigned;
};



export const getUnassignedSubjectsByGrade = async (gradeLevelId: number) => {
  return await db
    .select({
      subject_id: SubjectTable.subject_id,
      subjectName: SubjectTable.subjectName,
    })
    .from(SubjectTable)
    .leftJoin(
      TeacherAssignmentTable,
      and(
        eq(TeacherAssignmentTable.gradeLevel_id, gradeLevelId),
        eq(TeacherAssignmentTable.subject_id, SubjectTable.subject_id)
      )
    )
    .where(
      and(
        eq(SubjectTable.isActive, true),
        isNull(TeacherAssignmentTable.assignment_id)
      )
    );
};

export const updateAssigned = async (selectedTeacher: number, unassignedGradeLevelId: number, unassignedSubjectId: number, gradeLevelId: number, subjectId: number,  teacherName: string) => {
  await requireStaffAuth(["admin"]); 


  await db
  .update(TeacherAssignmentTable)
  .set({
    gradeLevel_id: unassignedGradeLevelId,
    subject_id: unassignedSubjectId,
  })
  .where(and(
    eq(TeacherAssignmentTable.clerk_uid, selectedTeacher),
    eq(TeacherAssignmentTable.gradeLevel_id, gradeLevelId),
    eq(TeacherAssignmentTable.subject_id, subjectId),
  ))

  const credentials = await getStaffCredentials();
     
  if (!credentials) return null;

  const username = credentials?.clerk_username;
  const userType = credentials?.userType;

  await db
  .insert(auditTrailsTable)
  .values({
    username: username,
    usertype: userType,
    actionTaken: "Re-assign Subject",
    dateOfAction: new Date().toISOString(),
    actionTakenFor: teacherName,
    academicYear_id: await getAcademicYearID(),
  }) ;
}


// class schedule
export const getSchedule = async () => { 
  const getSched = await db
  .select({
    schedule_id: ScheduleTable.schedule_id,
    section_id: ScheduleTable.section_id,
    sectionName: SectionTable.sectionName,
    gradeLevel_id: ScheduleTable.gradeLevel_id,
    gradeLevelName: GradeLevelTable.gradeLevelName,
    subject_id: ScheduleTable.subject_id,
    subjectName: SubjectTable.subjectName,
    clerk_uid: ScheduleTable.clerk_uid,
    clerk_username: staffClerkUserTable.clerk_username,
    dayOfWeek: ScheduleTable.dayOfWeek,
    startTime: ScheduleTable.startTime,
    endTime: ScheduleTable.endTime
  })
  .from(ScheduleTable)
  .leftJoin(SectionTable, eq(SectionTable.section_id, ScheduleTable.section_id))
  .leftJoin(GradeLevelTable, eq(GradeLevelTable.gradeLevel_id, ScheduleTable.gradeLevel_id))
  .leftJoin(SubjectTable, eq(SubjectTable.subject_id, ScheduleTable.subject_id))
  .leftJoin(staffClerkUserTable, eq(staffClerkUserTable.clerk_uid, ScheduleTable.clerk_uid))
  return getSched;
}


export const AddSchedule = async (
  section_id: number,
  gradeLevel_id: number,
  subject_id: number,
  clerk_uid: number,
  dayOfWeek: string,
  startTime: string,
  endTime: string
) => {

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const sched = await db
  .insert(ScheduleTable)
  .values({
    academicYear_id: selectedYear,
    section_id: section_id,
    gradeLevel_id: gradeLevel_id,
    subject_id: subject_id,
    clerk_uid: clerk_uid,
    dayOfWeek: dayOfWeek,
    startTime: startTime,
    endTime: endTime
  })

  await db
  .update(TeacherAssignmentTable)
  .set({
      section_id: section_id,
  })
  .where(and(
    eq(TeacherAssignmentTable.clerk_uid, clerk_uid),
    eq(TeacherAssignmentTable.gradeLevel_id, gradeLevel_id),
    eq(TeacherAssignmentTable.subject_id, subject_id)
  ))

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

  await db
  .insert(auditTrailsTable)
  .values({
    username: username,
    usertype: userType,
    actionTaken: "Create schedule",
    dateOfAction: new Date().toISOString(),
    actionTakenFor: teachersUsername,
    academicYear_id: await getAcademicYearID(),
  }) ;
  console.log("Schedule Added", sched);
}


export const checkSchedule = async (
  teacherId: number,
  day: string,
  startTime: string,
  endTime: string
) => {
  const conflicts = await db
    .select({
      schedule_id: ScheduleTable.schedule_id,
      startTime: ScheduleTable.startTime,
      endTime: ScheduleTable.endTime,
      day: ScheduleTable.dayOfWeek,
    })
    .from(ScheduleTable)
    .where(
      and(
        eq(ScheduleTable.clerk_uid, teacherId),
        eq(ScheduleTable.dayOfWeek, day),
        // overlap condition:
        or(
          and(
            lte(ScheduleTable.startTime, startTime),
            gte(ScheduleTable.endTime, startTime)
          ),
          and(
            lte(ScheduleTable.startTime, endTime),
            gte(ScheduleTable.endTime, endTime)
          ),
          and(
            gte(ScheduleTable.startTime, startTime),
            lte(ScheduleTable.endTime, endTime)
          )
        )
      )
    );

  return conflicts;
};

export const getAvailableAssignments = async (teacherId: number) => {
  // Get all assigned grade + subject for teacher
  const assigned = await db
    .select({
      gradeLevel_id: TeacherAssignmentTable.gradeLevel_id,
      subject_id: TeacherAssignmentTable.subject_id,
      clerk_uid: TeacherAssignmentTable.clerk_uid,
    })
    .from(TeacherAssignmentTable)
    .where(eq(TeacherAssignmentTable.clerk_uid, teacherId));

  // Get all scheduled grade + subject for teacher
  const scheduled = await db
    .select({
      gradeLevel_id: ScheduleTable.gradeLevel_id,
      subject_id: ScheduleTable.subject_id,
    })
    .from(ScheduleTable)
    .where(eq(ScheduleTable.clerk_uid, teacherId));

  // Filter out assignments that already exist in schedules
  const scheduledSet = new Set(
    scheduled.map((s) => `${s.gradeLevel_id}-${s.subject_id}`)
  );

  const available = assigned.filter(
    (a) => !scheduledSet.has(`${a.gradeLevel_id}-${a.subject_id}`)
  );

  return available;
};



export const getSubjects = async () => {
  const subjects = await db
  .select({
    subject_id: SubjectTable.subject_id,
    subject_name: SubjectTable.subjectName,
  })
  .from(SubjectTable)

  return subjects;
}




export const gradeAndSection = async () => {
  const gradeAndSection = await db
  .select({
    gradeLevel_id: SectionTable.gradeLevel_id,
    gradeLevelName: GradeLevelTable.gradeLevelName,
    section_id: SectionTable.section_id,
    sectionName: SectionTable.sectionName
  })
  .from(SectionTable)
  .leftJoin(GradeLevelTable, eq(GradeLevelTable.gradeLevel_id, SectionTable.gradeLevel_id))
  return gradeAndSection;
}

export const getData = async (selectedTeacher: number) => {
  const getData = db
  .select({
    gradeLevel_id: SectionTable.gradeLevel_id,
    gradeLevelName: GradeLevelTable.gradeLevelName,
    section_id: SectionTable.section_id,
    sectionName: SectionTable.sectionName,
    subject_id: TeacherAssignmentTable.subject_id,
    subjectName: SubjectTable.subjectName,
  })
  .from(SectionTable)
  .leftJoin(GradeLevelTable, eq(GradeLevelTable.gradeLevel_id, SectionTable.gradeLevel_id))
  .leftJoin(TeacherAssignmentTable, eq(TeacherAssignmentTable.gradeLevel_id, SectionTable.gradeLevel_id))
  .leftJoin(SubjectTable, eq(SubjectTable.subject_id, TeacherAssignmentTable.subject_id))
  .where(eq(TeacherAssignmentTable.clerk_uid, selectedTeacher))

  return getData;
}


export const getDaySched = async (
  setSelectedGradeLevel: number,
  setSelectedSubject: number,
  setSelectedSection: number
) => {
  const day = await db
  .select({
    schedule_id: ScheduleTable.schedule_id,
    dayOfWeek: ScheduleTable.dayOfWeek,
    startTime: ScheduleTable.startTime,
    endTime: ScheduleTable.endTime,
  })
  .from(ScheduleTable)
  .where(
    and(
      eq(ScheduleTable.section_id, setSelectedSection),
      eq(ScheduleTable.gradeLevel_id, setSelectedGradeLevel),
      eq(ScheduleTable.subject_id, setSelectedSubject)
    )
  );
  console.log(day);
  return day;
}

export const getTeachersName = async () => {
  const teachers = await db
  .select({
    clerk_uid: staffClerkUserTable.clerk_uid,
    clerk_username: staffClerkUserTable.clerk_username,
  })
  .from(staffClerkUserTable)
  .where(eq(staffClerkUserTable.userType, "teacher"))
  return teachers;
}


export const updateSchedule = async (
  schedule_id: number,
  startTime: string,
  endTime: string,
  clerk_uid: number
) => {
  const update = await db
  .update(ScheduleTable)
  .set({
    startTime: startTime,
    endTime: endTime
  })
  .where(eq(ScheduleTable.schedule_id, schedule_id))

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

  await db
  .insert(auditTrailsTable)
  .values({
    username: username,
    usertype: userType,
    actionTaken: "Create schedule",
    dateOfAction: new Date().toISOString(),
    actionTakenFor: teachersUsername,
    academicYear_id: await getAcademicYearID(),
  }) ;
  console.log(update);

}

export const deleteSchedule = async (schedule_id: number, clerk_uid: number) => {
  const deleted = await db
  .delete(ScheduleTable)
  .where(eq(ScheduleTable.schedule_id, schedule_id))
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

  await db
  .insert(auditTrailsTable)
  .values({
    username: username,
    usertype: userType,
    actionTaken: "Create schedule",
    dateOfAction: new Date().toISOString(),
    actionTakenFor: teachersUsername,
    academicYear_id: await getAcademicYearID(),
  }) ;
  console.log(deleted);
}











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
    .leftJoin(AcademicYearTable, eq(EnrollmentStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(eq(AcademicYearTable.isActive, true))
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
    .orderBy(desc(auditTrailsTable.auditTrail_id))

    console.log(result)
    return result;
}



  export const getGradesAndSubjects = async () => {
    const grades = await db.select().from(GradeLevelTable);
    const subjects = await db.select().from(SubjectTable);
    return { grades, subjects };
  };




  
// export const getAllGrades = async () => {

//   const getGrades = await db
//   .select()
//   .from(GradeLevelTable)
//   return getGrades;
// }








export const deleteAssigned = async (selectedTeacher: number, gradeLevelId: number, subjectId: number, teacherName: string) => {

  await db
  .delete(TeacherAssignmentTable)
  .where(and(
    eq(TeacherAssignmentTable.clerk_uid, selectedTeacher),
    eq(TeacherAssignmentTable.gradeLevel_id, gradeLevelId),
    eq(TeacherAssignmentTable.subject_id, subjectId),
  ))

  await db
  .delete(ScheduleTable)
  .where(and(
    eq(ScheduleTable.clerk_uid, selectedTeacher),
    eq(ScheduleTable.gradeLevel_id, gradeLevelId),
    eq(ScheduleTable.subject_id, subjectId),
  ))

    const credentials = await getStaffCredentials();
     
  if (!credentials) return null;

  const username = credentials?.clerk_username;
  const userType = credentials?.userType;

  await db
  .insert(auditTrailsTable)
  .values({
    username: username,
    usertype: userType,
    actionTaken: "Remove Assigned Subject",
    dateOfAction: new Date().toISOString(),
    actionTakenFor: teacherName,
    academicYear_id: await getAcademicYearID(),
  }) ;

}























