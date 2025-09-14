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

  const handleClose = () => {
    close();
    window.location.reload();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col max-h-[500px] sm:h-[630px]  sm:w-[600px] w-[270px] overflow-y-auto rounded-t-lg ">
        <DialogHeader className=" h-[70px] w-full rounded-t-lg bg-dGreen justify-center items-center">
          <DialogTitle className="text-center  text-white text-xl sm:text-2xl py-3">Payment</DialogTitle>
        </DialogHeader>
            <div>
                <PaymentPage />
            </div>
      </DialogContent>
    </Dialog>
  );
};
