export interface StudentUpdateData {
    applicantsFirstName: string;
    applicantsMiddleName: string;
    applicantsLastName: string;
    applicantsSuffix: string;
    dateOfBirth: string;
    age: number;
    gender: string;
    mobileNumber: string;
    email: string;

    guardiansLastName: string;
    guardiansFirstName: string;
    guardiansMiddleName: string;
    guardiansSuffix: string;
    fullAddress: string;
    emergencyContact: string;
    emergencyEmail: string;

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
    form137?: string;

    mop?: string;
    reservationReceipt?: string;
    reservationAmount?: number;
  }

  export interface ReservationFee {

    mop?: string;
    reservationReceipt?: string;
    reservationAmount?: number;
  }