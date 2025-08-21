
import { db } from "@/src/db/drizzle";
import { GradeLevelTable, SubjectTable } from "@/src/db/schema";
import { GradeSubjectMap } from "./Assign";

export const GradeSubjectLoader = async () => {
  const grades = await db.select().from(GradeLevelTable);
  const subjects = await db.select().from(SubjectTable);

  return <GradeSubjectMap grades={grades} subjects={subjects} />;
};
