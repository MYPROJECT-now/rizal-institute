export type AcademicYearType = 
{

  academicYear_id: number;
  academicYear: string;
  academicYearStart: string;
  academicYearEnd: string;
  isActive: boolean;
}

export type AuditTrailsType = {
  auditTrail_id: number;
  username: string;
  usertype: string;
  actionTaken: string;
  actionTakenFor: string;
  dateOfAction: string;
}

export type UserType = {
  clerk_uid: number;
  clerkId: string;
  userType: string;
  clerk_username: string;
  clerk_email: string;
  isActive: boolean;
}


export type SchedType = {
  schedule_id: number;
  section_id: number;
  sectionName: string | null;
  gradeLevel_id: number;
  gradeLevelName: string | null;
  subject_id: number;
  subjectName: string | null;
  clerk_uid: number | null;
  clerk_username: string | null;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  roomName: string | null;
}