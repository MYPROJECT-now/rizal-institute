  export type Tableapplicant_Type = {
      id: number;
      lrn: string;
      firstName: string;
      lastName: string;
      middleName: string | null;
      gradeLevel: string | null;
      applicationFormReviewStatus?: string | null;
      reservationPaymentStatus: string | null;
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

    prevSchool: string  | null;
    gradeLevel: string | null; 
    schoolAddress: string | null;
    schoolType: string | null;
    schoolYear: string | null;

    birthCert: string | null;
    reportCard: string | null;
    goodMoral: string | null;
    idPic: string | null;
    studentExitForm: string | null;
}
