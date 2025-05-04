"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCashierReservedModal } from "@/src/store/cashier/reserved";
import Image from "next/image";

export const Cashier_UpfrontPaymentReview = () => {
  const { isOpen, close } = useCashierReservedModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[800px] max-h-[90vh] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Full Tuition / Down Payment - Payment Review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2 py-4 text-sm text-gray-700">

          {/* Student Info */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">👤 Student Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Full Name:</strong> Juan Andres Tamad Jr.</p>
              <p><strong>LRN:</strong> 123456789</p>
            </div>
          </section>

          {/* Payment Info */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">💳 Payment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Payment Type:</strong> Full Tuition</p>
              <p><strong>Original Tuition:</strong> ₱35,000.00</p>
              <p><strong>Amount Paid:</strong> ₱35,000.00</p>
              <p><strong>Payment Method:</strong> GCash</p>
            </div>
          </section>

          {/* Receipt */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">🧾 Uploaded Receipt</h3>
            <div className="flex justify-center">
              <Image
                src="/receipt.jpg"
                width={200}
                height={200}
                alt="Receipt Screenshot"
                className="w-[300px] rounded border"
              />
            </div>
          </section>

        </div>
      </DialogContent>
    </Dialog>
  );
};
