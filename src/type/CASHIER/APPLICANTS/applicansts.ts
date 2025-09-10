export type Tableapplicant_Type = {
    id: number;
    lrn: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    gradeLevel: string | null;
    reservationPaymentStatus: string | null;
    applicationFormReviewStatus: string | null;
    reservationReceipt: string | null;
    isActive: boolean | null;
  };

  export type Tablefull_Type = {
    id: number;
    lrn: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    gradeLevel: string | null;
    payment_amount: number | null;
    payment_receipt: string | null;
    payment_status: string | null;
    paymentMethod: string | null;
  };