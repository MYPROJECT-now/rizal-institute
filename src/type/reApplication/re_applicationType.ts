export interface StudentUpdateData {
    applicantsFirstName: string;
    applicantsMiddleName: string;
    applicantsLastName: string;
    applicantsSuffix: string;
    dateOfBirth: string;
    age: number;
    religion: string;
    ip: string;
    house_no_purok: string;
    barangay: string;
    city: string;
    province: string;
    motherTongue: string;
    gender: string;
    mobileNumber: string;
    email: string;

    guardiansLastName: string;
    guardiansFirstName: string;
    guardiansMiddleName: string;
    guardiansSuffix: string;
    emergencyContact: string;
    emergencyEmail: string;
    relationship: string;

    prevSchool: string;
    studentType: string;
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
    itr?: string;
    escCert?: string;

    mop?: string;
    reservationReceipt?: string;
    reservationAmount?: number;

    trackingId: string;
  }

  export interface ReservationFee {

    mop?: string;
    reservationReceipt?: string;
    reservationAmount?: number;
  }