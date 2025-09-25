export type all_studentTable_Type = {
    lrn: string;
    studentLastName: string;
    studentFirstName: string;
    studentMiddleName: string | null;
    status : string | null;
    gradeLevel: string | null;
    isActive: boolean | null;

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
  