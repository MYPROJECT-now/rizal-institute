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
}

export const Cashier_ReservationReview = () => {
  const { isOpen, close, selectedLRN } = useShowReservationPayementModal();
  const [applicant, setApplicant] = useState<ApplicantType | null>(null)

    useEffect(() => {
      if (selectedLRN) {
        getApplicantsPayment(selectedLRN).then((applicants) => setApplicant(applicants[0]))
      }
    }, [selectedLRN])
    
    
      if (!applicant) return null
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[800px] max-h-[90vh] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            ₱500 Slot Reservation - Payment Review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2 py-4 text-sm text-gray-700">
          {/* Receipt */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">🧾 Uploaded Receipt</h3>
            <div className="flex justify-center">
            {applicant?.reservationReceipt && applicant?.reservationReceipt !== "" && (
                <CldImage
                  alt="Receipt Screenshot"
                  src={applicant.reservationReceipt}
                  width="500" 
                  height="500"
                  crop={{
                    type: 'auto',
                    source: true
                  }}
              />
              )}
            </div>
          </section>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};
