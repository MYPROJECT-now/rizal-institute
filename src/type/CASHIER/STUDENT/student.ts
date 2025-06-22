export type all_student_Type = {
    id: number;
    lrn: string;
    LastName: string;
    FirstName: string;
    MiddleName?: string | null;
    Suffix?: string | null;
  };
  
export type SOAsStudent = {
  month_id: number;
  student_id: number;
  lrn: string;
  studentLastName: string;
  studentFirstName: string;
  studentMiddleName?: string | null;
  studentSuffix?: string  | null;

  amount?: number | null;
  SINumberDP?: string | null;
  remarksDP?: string | null;

  month?: string | null;
  dateOfPayment?: string | null;
  remarks?: string | null;
  SInumber?: string | null;
  monthlyDue: number  | null;
  amountPaid: number  | null;

}
  
  
















export interface SOAPayment {
  month: string;
  monthlyDue: number;
  amountPaid: number;
  dateOfPayment: string | null;
  SInumber: string | null;
  remarks: string | null;
}

export interface DownPayment {
  amount: number;
  SINumberDP: string;
  remarksDP: string;
}

export interface StudentSOAData {
  student: {
    student_id: number;
    lrn: string;
    lastName: string;
    firstName: string;
    middleName: string | null;
    suffix: string | null;
  };
  downPayment: DownPayment | null;
  monthlyPayments: SOAPayment[];
  totals: {
    totalAmount: number;
    paidAmount: number;
    unpaidAmount: number;
    remainingBalance: number;
    totalAmountDue: number;
  };
}
  