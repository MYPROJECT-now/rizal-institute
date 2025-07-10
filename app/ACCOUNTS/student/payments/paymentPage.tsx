

import { Balance } from "@/components/accounts/students/payment management/outstandingBalance/balance";
import { PaymentMainPage } from "@/components/accounts/students/payment management/payment/paymentMainPage";
import { PaymentHistoryPage } from "@/components/accounts/students/payment management/paymentHistory/paymentHistoryPage";




export const PaymentPage = () => {

    return (
        <div className="flex flex-col gap-10 px-8 pt-8 ">
            <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between">
                <Balance />
                <PaymentMainPage />
            </div>
            <PaymentHistoryPage />
        </div>
    );
};
