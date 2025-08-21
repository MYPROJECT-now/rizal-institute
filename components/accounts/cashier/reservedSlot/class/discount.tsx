"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {  getDiscountClass } from "@/src/actions/cashierAction";
import { useDiscountClass } from "@/src/store/CASHIER/applicants";
import { useEffect, useState } from "react";

export interface DiscountType {
  attainment: string | null;
  gpa: string | null;
  hasSibling: string | null;
  reservationAmount: number | null;
  dateOfPayment: string | null;
}

export const DiscountClass = () => {
  const { isOpen, close, selectedLRN } = useDiscountClass();
  const [discount, setDiscount] = useState<DiscountType | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  

    useEffect(() => {
      const fetchData = async () => {
        if (!selectedLRN) return;
        setIsLoading(true);
        try {
          const discounts = await getDiscountClass(selectedLRN);
          setDiscount(discounts[0]);
        } catch (error) {
          console.error("Error fetching receipt:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [selectedLRN]);

    
    
      if (!discount) return null
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[600px] h-[300px] rounded-xl shadow-lg text-center ">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center ">
            Discount Classification
          </DialogTitle>
        </DialogHeader> 
          <>
            <div className="flex flex-col mx-auto  ">
            {isLoading ? (
              <div className="  ">
                <div className="text-lg">Loading...</div>
              </div>
              ) : (
                <div className="flex flex-col">
                  <section className="flex flex-row text-start gap-10">
                    <label className="w-[300px] font-semibold text-xl text-dGreen">Date Of Payment:</label>
                    <p className="font-semibold text-lg text-lGreen">{discount.dateOfPayment?.toString()}</p>
                  </section>

                  <section className="flex flex-row text-start gap-10">
                    <label className="w-[300px] font-semibold text-xl text-dGreen">Rservation Amount:</label>
                    <p className="font-semibold text-lg text-lGreen">{discount.reservationAmount}</p>
                  </section>

                  <section className="flex flex-row text-start gap-10">
                    <label className="w-[300px] font-semibold text-xl text-dGreen">Attainment Upon Graduating:</label>
                    <p className="font-semibold text-lg text-lGreen">{discount.attainment}</p>
                  </section>

                  <section className="flex flex-row text-start gap-10">
                    <label className="w-[300px] font-semibold text-xl text-dGreen">GPA:</label>
                    <p className="font-semibold text-lg text-lGreen">{discount.gpa}</p>
                  </section>

                  <section className="flex flex-row text-start gap-10">
                    <label className="w-[300px] font-semibold text-xl text-dGreen">Has Sibling:</label>
                    <p className="font-semibold text-lg text-lGreen">{discount.hasSibling}</p>
                  </section>





                </div> 
              )}
            </div>
          </>
          
      </DialogContent>
    </Dialog>
  );
};
