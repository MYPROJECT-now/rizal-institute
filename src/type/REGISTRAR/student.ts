export type all_studentTable_Type = {
    lrn: string;
    studentLastName: string;
    studentFirstName: string;
    studentMiddleName: string | null;
    status : string | null;
    gradeLevel: string | null;
    isActive: boolean | null;
    hasBirth: boolean | null;
    hasReportCard: boolean | null;
    hasGoodMoral: boolean | null;
    hasIdPic: boolean | null;
    hasExitForm: boolean | null;
    hasForm137: boolean | null;
    hasITR: boolean | null;
    hasEscCert: boolean | null; 
    studentType: string | null;
    schoolType: string | null;
    escGrantee: string | null;
  };
  

  export type all_student_info_ModalType = {
    lrn: string;
    studentLastName: string;
    studentFirstName: string;
    studentMiddleName: string | null;
    studentSuffix: string | null;
    studentGender: string | null;
    studentBirthDate: string | null;
    studentAge: number | null;
    fullAddress: string | null;
  };
  