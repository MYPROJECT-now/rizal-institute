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