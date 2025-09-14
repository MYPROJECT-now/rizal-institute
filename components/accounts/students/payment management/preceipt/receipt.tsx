"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getPaymentReceipt } from "@/src/actions/studentAction";
import {  useShowMonthlyPayementReceiptsModal } from "@/src/store/CASHIER/student";
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from "react";

export interface MonthsPayment {
  cashiersReceipt: string | null;
}


export const CashierPaymentReceipt = () => {
  const { isOpen, close, selectedID } = useShowMonthlyPayementReceiptsModal();
  const [monthsPayment, setMonthsPayment] = useState<MonthsPayment | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  

    useEffect(() => {
      const fetchData = async () => {
        if (!selectedID) return;
        setIsLoading(true);
        try {
          const monthsPayments = await getPaymentReceipt(selectedID);
          setMonthsPayment(monthsPayments?.[0]);
        } catch (error) {
          console.error("Error fetching receipt:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [selectedID]);

    
    
      if (!monthsPayment) return null
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[600px]   bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
           Receipt
          </DialogTitle>
        </DialogHeader>
          <div className=" flex flex-col text-center items-center justify-center py-5 ">
           {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-lg">Loading...</div>
            </div>
            ) :!monthsPayment?.cashiersReceipt ? (
              <div className="">
                <p>Not yet verified.</p>
              </div> 
            ) : (
              <div className="flex flex-col gap-3">

                <CldImage
                  alt="Receipt Screenshot"
                  src={monthsPayment?.cashiersReceipt || ""}
                  width="400" 
                  height="400"
                  crop={{
                    type: 'auto',
                    source: true
                  }}
                  
                />
              </div>
            )}
          </div>
          
      </DialogContent>
    </Dialog>
  );
};
