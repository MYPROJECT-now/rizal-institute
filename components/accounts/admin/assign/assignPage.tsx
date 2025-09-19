
import { db } from "@/src/db/drizzle";
import { GradeLevelTable, SubjectTable, TeacherAssignmentTable } from "@/src/db/schema";
import { GradeSubjectMap } from "./Assign";
import { getSelectedYear } from "@/src/actions/utils/getSelectedYear";
import { eq } from "drizzle-orm";

export const GradeSubjectLoader = async () => {
  const grades = await db.select().from(GradeLevelTable);
  const subjects = await db.select().from(SubjectTable);

  // get current academic year

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return null;

  // get existing assignments for that academic year
  const assignments = await db
    .select({
      gradeLevel_id: TeacherAssignmentTable.gradeLevel_id,
      subject_id: TeacherAssignmentTable.subject_id,
    })
    .from(TeacherAssignmentTable)
    .where(eq(TeacherAssignmentTable.academicYear_id, selectedYear));

  return <GradeSubjectMap grades={grades} subjects={subjects} existingAssignments={assignments} />;
};
