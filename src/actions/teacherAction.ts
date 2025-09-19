"use server";

import { and, asc, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { GradeLevelTable, ScheduleTable, SectionTable, StudentGradesTable, StudentInfoTable, SubjectTable, TeacherAssignmentTable } from "../db/schema";
import { getUid } from "./utils/staffID";

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
    .where(
      eq(TeacherAssignmentTable.clerk_uid, tid),
    );

  return getClass;
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

export const updateFinalGrade = async (grade_id: number, finalGrade: number) => {
    await db
    .update(StudentGradesTable)
    .set({
    finalGrade: finalGrade,
    remarks: finalGrade >= 75 ? "PASSED" : "FAILED",
    })
    .where(eq(StudentGradesTable.grade_id, grade_id));
};


export const getGradeAndSubjects = async () => {
    const tid = await getUid();

    if (!tid) {
        return null;
    }

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
    .where(eq(TeacherAssignmentTable.clerk_uid, tid))
    .orderBy(asc(TeacherAssignmentTable.assignment_id));

    console.log(gradeAndGrades);
    return gradeAndGrades;
}


export const getMySched = async () => {
    const tid = await getUid();
    if (!tid) {return null;}

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
        endTime: ScheduleTable.endTime
    })
    .from(ScheduleTable)
    .leftJoin(SectionTable, eq(SectionTable.section_id, ScheduleTable.section_id))
    .leftJoin(GradeLevelTable, eq(GradeLevelTable.gradeLevel_id, ScheduleTable.gradeLevel_id))
    .leftJoin(SubjectTable, eq(SubjectTable.subject_id, ScheduleTable.subject_id))
    .where(eq(ScheduleTable.clerk_uid, tid))
    .orderBy(asc(ScheduleTable.dayOfWeek));

    return mySched;
}