

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
  const { isOpen, close, regRemarks, cashierRemarks, regDate, cashierDate } = useShowRemarksModal();
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
      <DialogContent className="flex flex-col items-center  lg:w-[600px] sm:w-[550px] w-[300px] rounded-lg">
        <DialogHeader className="py-4 w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white sm:text-2xl text-lg">
            Application Remarks
          </DialogTitle>
        </DialogHeader>

        <div className="w-full px-6 py-4 space-y-4">
          {isLoading ? (
            <div className="w-full flex justify-center items-center h-[150px]">
              Loading...
            </div>
          ) : (
            <div className="w-full flex sm:flex-row flex-col sm:gap-[50px] gap-4 items-center justify-center">
              {regRemarks && (
                <div className="sm:px-6 px-8 py-4 bg-gray-50 rounded-lg shadow-lg border-2 border-gray-200">
                  <h3 className="sm:text-lg text-sm font-semibold mb-2 text-dGreen">
                    Registrar&apos;s Remarks
                  </h3>
                  <p className="text-gray-700">{regRemarks}</p>
                  {regDate && (
                    <p className="sm:text-sm text-xs text-gray-500 mt-1">
                      Date: {format(new Date(regDate), "MMMM dd, yyyy")}
                    </p>
                  )}
                </div>  
              )}

              {cashierRemarks && (
                <div className="sm:px-6 px-8 py-4 bg-gray-50 rounded-lg shadow-lg border-2 border-gray-200">
                  <h3 className="sm:text-lg text-sm font-semibold mb-2 text-dGreen">
                    Cashier&apos;s Remarks
                  </h3>
                  <p className="text-gray-700">{cashierRemarks}</p>
                  {cashierDate && (
                    <p className="sm:text-sm text-xs text-gray-500 mt-1">
                      Date: {format(new Date(cashierDate), "MMMM dd, yyyy")}
                    </p>
                  )}
                </div>
              )}

            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

