"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {  getItsPayment } from "@/src/actions/cashierAction";
import { useShowMonthlyPayementModal } from "@/src/store/CASHIER/student";
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from "react";

export interface MonthsPayment {
  amount: number | null;
  proofOfPayment: string | null;
}

export const StudentsPaymentReview = () => {
  const { isOpen, close, selectedID } = useShowMonthlyPayementModal();
  const [monthsPayment, setMonthsPayment] = useState<MonthsPayment | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  

    useEffect(() => {
      const fetchData = async () => {
        if (!selectedID) return;
        setIsLoading(true);
        try {
          const monthsPayments = await getItsPayment(selectedID);
          setMonthsPayment(monthsPayments[0]);
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
      <DialogContent className="w-[600px] min-h-[500px]  bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
           MonthsPayment - Payment Review
          </DialogTitle>
        </DialogHeader>
          <div className="bg-white flex text-center items-center justify-center h-[400px] ">
           {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-lg">Loading...</div>
            </div>
            ) :!monthsPayment?.proofOfPayment ? (
              <div className="">
                <p>No receipt uploaded.</p>
              </div> 
            ) : (
              <div>
                <p>
                  <strong>Amount:</strong> {monthsPayment.amount}
                </p>

                <CldImage
                  alt="Receipt Screenshot"
                  src={monthsPayment.proofOfPayment}
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
