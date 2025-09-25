"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getApplicantsPayment } from "@/src/actions/cashierAction";
import { useShowReservationPayementModal } from "@/src/store/CASHIER/applicants";
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from "react";

export interface ApplicantType {
  reservationReceipt: string | null;
  reservationAmount: number | null;
}

export const Cashier_ReservationReview = () => {
  const { isOpen, close, selectedLRN } = useShowReservationPayementModal();
  const [applicant, setApplicant] = useState<ApplicantType | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  

    useEffect(() => {
      const fetchData = async () => {
        if (!selectedLRN) return;
        setIsLoading(true);
        try {
          const applicants = await getApplicantsPayment(selectedLRN);
          setApplicant(applicants[0]);
        } catch (error) {
          console.error("Error fetching receipt:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [selectedLRN]);

    
    
      if (!applicant) return null
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[460px]   bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-xl font-bold text-white bg-dGreen py-4 flex items-center justify-center">
           Reservation Fee - Payment Review
          </DialogTitle>
        </DialogHeader>
          <div className="bg-white flex text-center items-center justify-center py-1 ">
           {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-lg">Loading...</div>
            </div>
            ) :!applicant?.reservationReceipt ? (
              <div className="">
                <p>No receipt uploaded.</p>
              </div> 
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col text-start">
                  <span className="text-dGreen font-semibold text-sm">Amount: </span>
                  <p className="bg-green-100 p-2 w-full rounded-lg text-dGreen font-oswald font-bold">
                    P{applicant.reservationAmount}
                  </p>
                </div>
                <CldImage
                  alt="Receipt Screenshot"
                  src={applicant.reservationReceipt}
                  width="1000" 
                  height="1000"
                  className="w-[250px] h-[300px]"
                />
              </div>
              )}
          </div>
          
      </DialogContent>
    </Dialog>
  );
};
