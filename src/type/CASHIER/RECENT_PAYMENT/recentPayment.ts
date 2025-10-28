export type RecentPaymentType = {
    id: number;
    lrn: string | null;
    type: string;
    lastName: string | null;
    firstName: string | null;
    middleName: string | null;
    suffix: string | null;
    amount: number;
    dateOfPayment: string;
}