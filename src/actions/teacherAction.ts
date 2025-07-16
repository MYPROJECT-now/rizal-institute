"use server";

import { and, asc, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { GradeLevelTable, staffClerkUserTable, StudentGradesTable, StudentInfoTable, SubjectTable, TeacherAssignmentTable } from "../db/schema";
import { requireStaffAuth } from "./utils/staffAuth";
import { getStaffId } from "./utils/staffID";

export const getAssignClass = async () => {
    await requireStaffAuth(["teacher"]); // gatekeeper
    const staffId = await getStaffId();
    if (!staffId) {
        return null;
    }

    const getTeacherUid = await db
    .select({
        clerk_uid: staffClerkUserTable.clerk_uid,
    })
    .from(staffClerkUserTable)
    .where(eq(staffClerkUserTable.clerkId, staffId ));


    const uid = getTeacherUid[0].clerk_uid;

    const getClass =  await db
    .select({
        gradeLevel_id: TeacherAssignmentTable.gradeLevel_id,
        subject_id: TeacherAssignmentTable.subject_id,
        assignment_id: TeacherAssignmentTable.assignment_id,
        gradeLevelName: GradeLevelTable.gradeLevelName,
        subjectName: SubjectTable.subjectName,
    }).from(TeacherAssignmentTable)
    .leftJoin(GradeLevelTable, eq(TeacherAssignmentTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
    .leftJoin(SubjectTable, eq(TeacherAssignmentTable.subject_id, SubjectTable.subject_id))
    .where(eq(TeacherAssignmentTable.clerk_uid, uid))
    .orderBy(asc(TeacherAssignmentTable.assignment_id));
    return getClass;
}


export const getMyStudents = async (
    gradeLevel_id: number | null,
    subject_id: number | null
) => {
    await requireStaffAuth(["teacher"]); // gatekeeper
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
            })
    .where(eq(StudentGradesTable.grade_id, grade_id));
};


export const getGradeAndSubjects = async () => {
    await requireStaffAuth(["teacher"]); // gatekeeper    
    
    const grades = await db.select().from(GradeLevelTable);
    const subjects = await db.select().from(SubjectTable);
    return { grades, subjects };
}