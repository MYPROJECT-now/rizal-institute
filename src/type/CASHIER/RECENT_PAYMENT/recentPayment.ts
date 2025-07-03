export type RecentPaymentType = {
    monthlyPayment_id: number;
    student_id: number;
    lrn: string | null;
    studentLastName: string | null;
    studentFirstName: string | null;
    studentMiddleName: string | null;
    studentSuffix: string | null;
    amount: number;
    dateOfPayment: string;
}