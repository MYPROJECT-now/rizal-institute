"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getReceipt } from "@/src/actions/studentAction";
import { useShowMonthlyPayementModal } from "@/src/store/CASHIER/student";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

export interface MonthsPayment {
  proofOfPayment: string | null;
  amount: number;
}

export const PaymentReceipt = () => {
  const { isOpen, close, selectedID } = useShowMonthlyPayementModal();
  const [monthsPayment, setMonthsPayment] = useState<MonthsPayment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedID) return;
      setIsLoading(true);
      try {
        const payments = await getReceipt(selectedID);
        setMonthsPayment(payments?.[0] ?? null);
      } catch (error) {
        console.error("Error fetching receipt:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedID]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[400px] bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col text-center items-center justify-center py-5">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-lg">Loading...</div>
            </div>
          ) : monthsPayment?.proofOfPayment ? (
            <div className="flex flex-col gap-3 items-center">

              <p className="text-lg font-semibold">
                Amount Paid: ₱{monthsPayment.amount}
              </p>

              <CldImage
                alt="Receipt Screenshot"
                src={monthsPayment.proofOfPayment}
                width={1000}
                height={1000}
                className="w-[250px] h-[250px]"
                crop={{ type: "auto", source: true }}
              />

            </div>
          ) : (
            <p>No receipt uploaded.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
