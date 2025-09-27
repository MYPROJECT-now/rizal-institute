"use client";

import { Button } from "@/components/ui/button"
import { PaymentModalPage } from "./paymentPageModal"
import { usePaymentModal } from "@/src/store/payment";


export const PaymentMainPage = () => {
    const { open } = usePaymentModal();

    return (
        <div>
             <PaymentModalPage />
                <Button 
                onClick={open}
                variant="confirmButton" 
                className="sm:px-6  py-3  text-white rounded-xl">
                    Pay Now
                </Button>
        </div>
    )
}