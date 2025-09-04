"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShowPaymentReceiptModal } from "@/src/store/CASHIER/student";
import { CashierPage } from "./cashiers_receipt/cashierPage";



export const StudentsPaymentReceipt = () => {
  const { isOpen, close } = useShowPaymentReceiptModal();

  const handleClose = () => {
    close();
    window.location.reload();
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[500px]  bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
           Payment Receipt
          </DialogTitle>
        </DialogHeader>
        <div  className="flex flex-col items-center justify-center py-10">
          <CashierPage />
        </div>
          
      </DialogContent>
    </Dialog>
  );
};
