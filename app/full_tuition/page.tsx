
import { Full_TUition } from "@/components/landing_page/fullTuition/full_payment";
import { Suspense } from "react";

const FullPaymentPage = () => {
    return (
        <Suspense fallback={<p className="text-center text-dGreen">Loading...</p>}>
            <Full_TUition />
        </Suspense>
    );
};

export default FullPaymentPage;
