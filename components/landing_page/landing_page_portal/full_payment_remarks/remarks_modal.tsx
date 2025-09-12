
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useShowRemarksModal } from "@/src/store/LANDING_PAGE/landing_page";
import { useEffect, useState } from "react";

export const RemarksModal = () => {
  const { isOpen, close, cashierRemarks, cashierDate } = useShowRemarksModal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false); // simulate loading delay
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col items-center min-h-[300px] w-[600px] rounded-t-lg">
        <DialogHeader className="h-[70px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white text-2xl">
            Full Tuition Remarks
          </DialogTitle>
        </DialogHeader>

        <div className="w-full px-6 py-4 flex items-center justify-center space-y-4">
          {isLoading ? (
            <div className="w-full flex justify-center items-center h-[150px]">
              Loading...
            </div>
          ) : (
            <>
              {cashierRemarks && (
                <div className="py-4 px-10 shadow-lg border-2 border-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-dGreen">
                    Cashier&apos;s Remarks
                  </h3>
                  <p className="text-gray-700">{cashierRemarks}</p>
                  {cashierDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {format(new Date(cashierDate), "MMMM dd, yyyy")}
                    </p>
                  )}
                </div>
              )}

            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

