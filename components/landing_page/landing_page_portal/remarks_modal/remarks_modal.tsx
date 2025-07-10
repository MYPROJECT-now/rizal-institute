"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useShowRemarksModal } from "@/src/store/LANDING_PAGE/landing_page";

export const RemarksModal = () => {
  const { isOpen, close, regRemarks, cashierRemarks, regDate, cashierDate } = useShowRemarksModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col items-center min-h-[300px] w-[600px] rounded-t-lg">
        <DialogHeader className="h-[70px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white text-2xl">Application Remarks</DialogTitle>
        </DialogHeader>
        
        <div className="w-full px-6 py-4 space-y-4">
          {regRemarks && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-dGreen">Registrar&apos;s Remarks</h3>
              <p className="text-gray-700">{regRemarks}</p>
              {regDate && (
                <p className="text-sm text-gray-500 mt-1">
                  Date: {format(new Date(regDate), 'MMMM dd, yyyy')}
                </p>
              )}
            </div>
          )}

          {cashierRemarks && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-dGreen">Cashier&apos;s Remarks</h3>
              <p className="text-gray-700">{cashierRemarks}</p>
              {cashierDate && (
                <p className="text-sm text-gray-500 mt-1">
                  Date: {format(new Date(cashierDate), 'MMMM dd, yyyy')}
                </p>
              )}
            </div>
          )}

          {!regRemarks && !cashierRemarks && (
            <p className="text-center text-gray-500">No remarks available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
