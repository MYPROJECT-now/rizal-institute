
// import { PaymentMethod } from "@/components/landing_page/payment_method/payment_method";
import { Suspense } from "react";

const PaymentMethodPage = () => {
    return (
        <Suspense fallback={<p className="text-center text-dGreen">Loading...</p>}>
            {/* <PaymentMethod /> */}
        </Suspense>
    );
};

export default PaymentMethodPage;
