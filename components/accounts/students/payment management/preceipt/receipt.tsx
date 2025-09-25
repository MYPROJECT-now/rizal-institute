"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getPaymentInfo, getRInfo } from "@/src/actions/studentAction";
import { useShowMonthlyPayementReceiptsModal } from "@/src/store/CASHIER/student";
import { useEffect, useState } from "react";

interface Info {
  schoolName: string | null;
  address: string | null;
  tin: string | null;
  atpNumber: string | null;
  dateIssued: string | null;
  dateExpired: string | null;
}

interface MonthsPayment {
  studentName: string | null;
  academicYear: string | null;
  amount: number | null;
  dateOfVerification: string | null;
  modeOfPayment: string | null;
  status: string | null;
}

export const CashierPaymentReceipt = () => {
  const { isOpen, close, selectedID } = useShowMonthlyPayementReceiptsModal();
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState<Info | null>(null);
  const [payment, setPayment] = useState<MonthsPayment | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedID) return;
      setIsLoading(true);
      try {
        const data = await getRInfo();
        setInfo(data);
        const payment = await getPaymentInfo(selectedID);
        setPayment(payment);
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
      <DialogContent className="w-[600px] bg-white rounded-xl shadow-lg font-sans">
        <DialogHeader>
          <DialogTitle className="text-center text-green-600 bg-gray-300 font-bold text-lg py-3 rounded-t-lg">
              SERVICE INVOICE
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="text-lg">Loading...</div>
          </div>
        ) : payment?.status !== "Approved" ?  (
            <div className="flex justify-center items-center p-8">
              <div className="text-lg"> Payment is not yet approved</div>
            </div>
          ): (
          <div className="flex flex-col gap-6 px-10  text-gray-900">
            {/* Header */}
            <section className="text-center border-b pb-3">
              <p className="text-xl font-semibold">
                {info?.schoolName || "Sample School Name"}
              </p>
              <p className="text-sm">
                {info?.address}
              </p>
              <p className="text-sm">TIN: {info?.tin || "000-000-000-000"}</p>
            </section>

            {/* Date */}
            <section className="flex justify-end text-sm">
              <p>
                Date:{" "}
                <span className="font-medium">
                  {payment?.dateOfVerification || "Date"}
                </span>
              </p>
            </section>

            {/* Student Info */}
            <section className="text-sm leading-relaxed">
              <p>
                <span className="font-medium">Student:</span>{" "}
                {payment?.studentName || "Name"}
              </p>
            </section>

            {/* Payment Details */}
            <section>
              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1 text-left">Particulars</th>
                    <th className="border px-2 py-1 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">
                      Tuition Fee SY:{payment?.academicYear || ""}
                    </td>
                    <td className="border px-2 py-1 text-right">₱ {payment?.amount || ""}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Totals */}
            <section className="text-sm">
              <div className="flex justify-between font-semibold text-base mt-1">
                <span>TOTAL AMOUNT RECEIVED:</span>
                <span>₱ {payment?.amount || ""}</span>
              </div>
            </section>

            {/* Footer */}
            <section className="text-sm">
              <p>
                <span className="font-medium">Mode of Payment:</span> {payment?.modeOfPayment || ""}
              </p>
              <div className="flex justify-end mt-6">
                <div className="text-center">
                  <p>Cashier</p>
                  <hr className="w-full border-1 border-black "/>
                  <p className="text-xs">Cashier / Authorized Representative</p>
                </div>
              </div>
            </section>

            {/* ATP / Disclaimer */}
            <section className="text-[11px] text-gray-600 border-t pt-2">
              <p>
                ATP No.: {info?.atpNumber || "ATP-XXXX"} • Issued:{" "}
                {info?.dateIssued || "MM/DD/YYYY"} • Expiry:{" "}
                {info?.dateExpired || "MM/DD/YYYY"}
              </p>
              <p>*This document is not valid for input tax claims.*</p>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
