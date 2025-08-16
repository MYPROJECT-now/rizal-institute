
import { Payment } from "@/components/landing_page/payment/payment";
import { Suspense } from "react";

const PaymentPage = () => {
    return (
        <Suspense fallback={<p className="text-center text-dGreen">Loading...</p>}>
            <Payment />
        </Suspense>
    );
};

export default PaymentPage;
