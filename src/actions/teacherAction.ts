"use server";

import { and, asc, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { GradeLevelTable, RoomTable, ScheduleTable, SectionTable, StudentGradesTable, StudentInfoTable, studentTypeTable, SubjectTable, TeacherAssignmentTable } from "../db/schema";
import { getUid } from "./utils/staffID";
import { getSelectedYear } from "./utils/getSelectedYear";

export const getAssignClass2 = async () => {

    // const uid = getTeacherUid[0].clerk_uid;
    const tid = await getUid();

    if (!tid) {
        return null;
    }
    const getClass =  await db
    .select({
        gradeLevel_id: TeacherAssignmentTable.gradeLevel_id,
        subject_id: TeacherAssignmentTable.subject_id,
        assignment_id: TeacherAssignmentTable.assignment_id,
        gradeLevelName: GradeLevelTable.gradeLevelName,
        subjectName: SubjectTable.subjectName,
        sectionName: SectionTable.sectionName,
    }).from(TeacherAssignmentTable)
    .leftJoin(GradeLevelTable, eq(TeacherAssignmentTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
    .leftJoin(SubjectTable, eq(TeacherAssignmentTable.subject_id, SubjectTable.subject_id))
    .leftJoin(SectionTable, eq(TeacherAssignmentTable.gradeLevel_id, SectionTable.gradeLevel_id))
    .where(eq(TeacherAssignmentTable.clerk_uid, tid))
    .orderBy(asc(TeacherAssignmentTable.assignment_id));
    return getClass;
}

export const getAssignClass = async () => {
  const tid = await getUid();
  if (!tid) return null;

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const getClass = await db
    .select({
      gradeLevel_id: TeacherAssignmentTable.gradeLevel_id,
      gradeLevelName: GradeLevelTable.gradeLevelName,
      subject_id: TeacherAssignmentTable.subject_id,
      subjectName: SubjectTable.subjectName,
      sectionName: SectionTable.sectionName,
    })
    .from(TeacherAssignmentTable)
    .leftJoin(GradeLevelTable, eq(TeacherAssignmentTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
    .leftJoin(SubjectTable, eq(TeacherAssignmentTable.subject_id, SubjectTable.subject_id))
    .leftJoin(SectionTable, and(
      eq(SectionTable.section_id, TeacherAssignmentTable.section_id),
      eq(SectionTable.academicYear_id, TeacherAssignmentTable.academicYear_id)
    ))
    .where(and(
      eq(TeacherAssignmentTable.clerk_uid, tid),
      eq(TeacherAssignmentTable.academicYear_id, selectedYear)
    ));

  return getClass;
};

export const getSchedPerClass = async () => {
  const tid = await getUid();
  if (!tid) return null;

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const getSched = await db
    .select({
      gradeLevel_id: ScheduleTable.gradeLevel_id,
      subject_id: ScheduleTable.subject_id,
      dayOfWeek: ScheduleTable.dayOfWeek,
      startTime: ScheduleTable.startTime,
      endTime: ScheduleTable.endTime,
      roomName: RoomTable.roomName
    })
    .from(ScheduleTable)
    .leftJoin(RoomTable, eq(RoomTable.room_id, ScheduleTable.room_id))
    .where(and(
      eq(ScheduleTable.clerk_uid, tid),
      eq(ScheduleTable.academicYear_id, selectedYear)
    ));

  return getSched;
};



export const getMyStudents = async (
    gradeLevel_id: number | null,
    subject_id: number | null
) => {
    if (!gradeLevel_id || !subject_id) return [];

    const myStudents = await db
    .select({
        grade_id: StudentGradesTable.grade_id,
        studentLastName: StudentInfoTable.studentLastName,
        studentFirstName: StudentInfoTable.studentFirstName,
        studentMiddleName: StudentInfoTable.studentMiddleName,
        studentSuffix: StudentInfoTable.studentSuffix,
        lrn: StudentInfoTable.lrn,
        applicants_id: StudentInfoTable.applicants_id,
        finalGrade: StudentGradesTable.finalGrade,
        remarks: StudentGradesTable.remarks
    })
    .from(StudentInfoTable)
    .where(
      and(
        eq(StudentGradesTable.gradeLevel_id, gradeLevel_id),
        eq(StudentGradesTable.subject_id, subject_id)
      )
    )
    .leftJoin(StudentGradesTable, eq(StudentInfoTable.student_id, StudentGradesTable.student_id))
    console.log(myStudents);
    return myStudents;
}

export const updateFinalGrade = async (grade_id: number, finalGrade: number, lrn: string, applicants_id: number) => {
  const selectedYear = await getSelectedYear(); 
  if(!selectedYear) return [];

  await db
  .update(StudentGradesTable)
  .set({
  finalGrade: finalGrade,
  remarks: finalGrade >= 75 ? "PASSED" : "FAILED",
  })
  .where(and(
    eq(StudentGradesTable.grade_id, grade_id),
    eq(StudentGradesTable.academicYear_id, selectedYear),
  ));

  const allGrades = await db
    .select({ finalGrade: StudentGradesTable.finalGrade })
    .from(StudentGradesTable)
    .leftJoin(StudentInfoTable, eq(StudentGradesTable.student_id, StudentInfoTable.student_id))
    .where(
      and(
        eq(StudentInfoTable.lrn, lrn),
        eq(StudentGradesTable.academicYear_id, selectedYear)
      )
    );
    
  const failingSubjects = allGrades.filter((g) => (g.finalGrade ?? 0) < 75).length;

  let promotion = "PROMOTED";
  if (failingSubjects > 2) promotion = "RETAIN";
  else if (failingSubjects > 0 && failingSubjects <= 2) promotion = "SUMMER";

  await db
    .update(studentTypeTable)
    .set({ promotion })
    .where(
      and(
        eq(studentTypeTable.applicants_id, applicants_id),
        eq(studentTypeTable.academicYear_id, selectedYear)
      )
    );

};


export const getGradeAndSubjects = async () => {
    const tid = await getUid();

    if (!tid) {
        return null;
    }

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

    const gradeAndGrades = await db
    .select({
        gradeLevel_id: TeacherAssignmentTable.gradeLevel_id,
        subject_id: TeacherAssignmentTable.subject_id,
        assignment_id: TeacherAssignmentTable.assignment_id,
        gradeLevelName: GradeLevelTable.gradeLevelName,
        subjectName: SubjectTable.subjectName,
        sectionName: SectionTable.sectionName,
        section_id: TeacherAssignmentTable.section_id
    }).from(TeacherAssignmentTable)
    .leftJoin(GradeLevelTable, eq(TeacherAssignmentTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
    .leftJoin(SubjectTable, eq(TeacherAssignmentTable.subject_id, SubjectTable.subject_id))
    .leftJoin(SectionTable, eq(TeacherAssignmentTable.section_id, SectionTable.section_id))
    .where(and(
        eq(TeacherAssignmentTable.academicYear_id, selectedYear),
        eq(TeacherAssignmentTable.clerk_uid, tid)
    ))
    .orderBy(asc(TeacherAssignmentTable.assignment_id));

    console.log(gradeAndGrades);
    return gradeAndGrades;
}


export const getMySched = async () => {
    const tid = await getUid();
    if (!tid) {return null;}

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

    const mySched = await db
    .select({
        section_id: ScheduleTable.section_id,
        sectionName: SectionTable.sectionName,
        gradeLevel_id: ScheduleTable.gradeLevel_id,
        gradeLevelName: GradeLevelTable.gradeLevelName,
        subject_id: ScheduleTable.subject_id,
        subjectName: SubjectTable.subjectName,
        dayOfWeek: ScheduleTable.dayOfWeek,
        startTime: ScheduleTable.startTime,
        endTime: ScheduleTable.endTime,
        roomName: RoomTable.roomName,
    })
    .from(ScheduleTable)
    .leftJoin(SectionTable, eq(SectionTable.section_id, ScheduleTable.section_id))
    .leftJoin(GradeLevelTable, eq(GradeLevelTable.gradeLevel_id, ScheduleTable.gradeLevel_id))
    .leftJoin(SubjectTable, eq(SubjectTable.subject_id, ScheduleTable.subject_id))
    .leftJoin(RoomTable, eq(RoomTable.room_id, ScheduleTable.room_id))
    .where(and(
        eq(ScheduleTable.academicYear_id, selectedYear),
        eq(ScheduleTable.clerk_uid, tid)
    ))
    .orderBy(asc(ScheduleTable.dayOfWeek));

    console.log(mySched);
    return mySched;
}