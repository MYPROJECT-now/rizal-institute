export interface StudentUpdateData {
    studentsFirstName: string;
    studentsMiddleName: string;
    studentsLastName: string;
    studentsSuffix: string;
    dateOfBirth: string;
    age: number;
    gender: string
    civilStatus: string;
    nationality: string;
    religion: string;

    guardiansLastName: string;
    guardiansFirstName: string;
    guardiansMiddleName: string;
    guardiansSuffix: string;
    fullAddress: string;
    mobileNumber: string
    email: string;
    
    admissionStatus: string;
    prevSchool: string;
    schoolAddress: string;
    schoolType: string;
    gradeLevel: string;
    schoolYear: string
    
    birthCert: string;
    reportCard?: string;
    goodMoral?: string;
    idPic?: string;
    studentExitForm?: string;
  }