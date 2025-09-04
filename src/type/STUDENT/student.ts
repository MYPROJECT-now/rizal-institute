export type PaymentHistory = {
    monthlyPayment_id: number | null;
    month_id: number | null;
    dateOfPayment: string | null;
    amount: number | null;
    modeOfPayment: string | null;
    dateOfVerification: string | null;
    siNumber: string | null;
    status: string | null;
    
};

export type Balance = {
    dueThisMonth: number;
    totalRemainingBalance: number;
}


export interface StudentInfo {
  lrn: string | null;
  admissionStatus: string | null;
  gradeLevelName: string | null;
  academicYear: string | null;
  outstandingBalance?: number;
  studentFirstName: string | null;
  studentMiddleName: string | null;
  studentLastName: string | null;
  studentSuffix: string | null;
}