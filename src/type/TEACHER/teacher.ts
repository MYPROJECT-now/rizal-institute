export type ClassType = {
  gradeLevelName: string | null;
  subjectName: string | null;
  gradeLevel_id: number | null;
  subject_id: number | null;
}

export type MyStudentType = {
  grade_id: number | null;
  studentLastName: string;
  studentFirstName: string;
  studentMiddleName: string | null;
  studentSuffix: string | null;
  lrn: string;
  finalGrade: number | null;
  remarks: string | null;
}