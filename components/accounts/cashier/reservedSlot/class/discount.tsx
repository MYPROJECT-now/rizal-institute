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
      <DialogContent className="w-[600px] h-auto rounded-xl shadow-lg text-center ">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center ">
            Discount Classification
          </DialogTitle>
        </DialogHeader> 
          <>
            <div className="flex flex-col  ">
            {isLoading ? (
              <div className="  ">
                <div className="text-lg">Loading...</div>
              </div>
              ) : (
                <div className="grid grid-cols-2  gap-5 mx-10 pl-5 my-5">
                  <section className="flex flex-col text-start gap-1">
                    <label className=" font-semibold text-sm text-dGreen">Date Of Payment:</label>
                    <p className="font-semibold text-[17px]  text-lGreen border-dGreen border-2 rounded-lg px-2 py-1 w-[200px]">{discount.dateOfPayment ? new Date(discount.dateOfPayment).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric"} ) : "-"}</p>
                  </section>
                
                  <section className="flex flex-col text-start gap-1">
                    <label  className=" font-semibold text-sm text-dGreen">Reservation Amount:</label>
                    <p className="font-semibold text-[17px] text-lGreen border-dGreen border-2 rounded-lg px-2 py-1 w-[200px]">{discount.reservationAmount}</p>
                  </section>

                  <section className="flex flex-col text-start gap-1">
                    <label  className=" font-semibold text-sm text-dGreen">Attainment Upon Graduating:</label>
                    <p className="font-semibold text-[17px]  text-lGreen border-dGreen border-2 rounded-lg px-2 py-1 w-[200px]">{discount.attainment}</p>
                  </section>

                  <section className="flex flex-col text-start gap-1">
                    <label  className=" font-semibold text-sm text-dGreen">GPA:</label>
                    <p className="font-semibold text-[17px]  text-lGreen border-dGreen border-2 rounded-lg px-2 py-1 w-[200px]">{discount.gpa}</p>
                  </section>

                  <section className="flex flex-col text-start gap-1">
                    <label  className=" font-semibold text-sm text-dGreen">Has Sibling:</label>
                    <p className="font-semibold text-[17px]  text-lGreen border-dGreen border-2 rounded-lg px-2 py-1 w-[200px]">{discount.hasSibling}</p>
                  </section>

                </div> 
              )}
            </div>
          </>
          
      </DialogContent>
    </Dialog>
  );
};
