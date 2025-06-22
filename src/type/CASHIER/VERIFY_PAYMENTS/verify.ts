export type VerifyPayment = {
    monthlyPayment_id: number;
    dateOfPayment: string | null;
    amount: number;
    proofOfPayment: string | null;
    modeOfPayment: string;
    SInumber: string | null;
    status: string;
}