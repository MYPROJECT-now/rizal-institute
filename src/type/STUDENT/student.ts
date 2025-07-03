export type PaymentHistory = {
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