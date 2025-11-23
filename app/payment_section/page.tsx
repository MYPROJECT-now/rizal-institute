
import { PaymentSection } from "@/components/landing_page/payment_section/payment_section";
import { Suspense } from "react";

const PaymentMethodPage = () => {
    return (
        <Suspense fallback={<p className="text-center text-dGreen">Loading...</p>}>
            <PaymentSection />
        </Suspense>
    );
};

export default PaymentMethodPage;
