export type VerifyPayment = {
    monthlyPayment_id: number ;
    month_id: number | null;
    dateOfPayment: string | null;
    amount: number;
    proofOfPayment: string | null;
    modeOfPayment: string;
    SInumber: string | null;
    status: string;
}