"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePaymentModal } from "@/src/store/payment";
import { PaymentPage } from "./paymenPageTodo";


export const PaymentModalPage = () => {
  const { isOpen, close } = usePaymentModal();


  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col   sm:w-[600px] w-[290px] rounded-lg ">
        <DialogHeader className=" w-full rounded-t-lg bg-dGreen justify-center items-center">
          <DialogTitle className="text-center  text-white text-xl sm:text-2xl py-3 rounded-t-lg">Payment</DialogTitle>
        </DialogHeader>
            <div>
                <PaymentPage />
            </div>
      </DialogContent>
    </Dialog>
  );
};
