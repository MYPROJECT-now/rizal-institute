  export type Tableapplicant_Type = {
      admission_id?: number | null;
      id: number;
      lrn: string;
      firstName: string;
      lastName: string;
      middleName: string | null;
      gradeLevel: string | null;
      dateApprovedByRegistrar: string | null;
      applicationFormReviewStatus?: string | null;
      reservationPaymentStatus: string | null;
      isActive: boolean | null;
    };

  export type RecentApplicantsType = {
    lrn: string;
    lastName: string;
    firstName: string;
    middleName: string | null;
    gradeLevel: string | null;
    applicationFormReviewStatus?: string | null;
    dateOfApplication: string | null;
  };

  export interface ApplicanInfotType {
    applicantsLastName: string;
    applicantsFirstName: string;
    applicantsMiddleName?: string | null;
    applicantsSuffix?: string | null;
    dateOfBirth: string;
    age: number;
    gender: string;
    mobileNumber: string;
    email: string;

    guardiansLastName: string | null;
    guardiansFirstName: string | null;
    guardiansMiddleName?: string | null;
    guardiansSuffix?: string | null;
    emergencyContact: string | null;
    emergencyEmail?: string | null;
    fullAddress: string | null;

    lrn: string;
    prevSchool: string  | null;
    studentType: string | null;
    gradeLevel: string | null; 
    schoolAddress: string | null;
    schoolType: string | null;
    schoolYear: string | null;

    birthCert: string | null;
    reportCard: string | null;
    goodMoral: string | null;
    idPic: string | null;
    studentExitForm: string | null;

    reg_remarks: string | null;
    dateOfRemarks: string | null;
}

  export type Grade_Type = {
      id: number;
      lrn: string;
      studentFirstName: string;
      studentLastName: string;
      studentMiddleName: string | null;
      studentSuffix: string | null;
    };