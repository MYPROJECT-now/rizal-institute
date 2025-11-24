"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CldImage } from "next-cloudinary";
import { getPaymentInfo } from "@/src/actions/cashierAction";
import { useShowReservationPayementModal } from "@/src/store/CASHIER/applicants";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface PaymentInfo {
  fullName: string | null;
  amount: number | null;
  modeOfPayment: string | null;
  reciept: string | null;
  reference_number: string | null;
  status: string | null;
  paymentMethod: string | null;
}

export const Cashier_ReservationReview = () => {
  const { isOpen, close, selectedLRN } = useShowReservationPayementModal();
  const [info, setInfo] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false); // NEW

  // Zoom modal
  const [zoomOpen, setZoomOpen] = useState(false);
const [disableButton, setDisableButton] = useState(true);

useEffect(() => {
  // Disable button for 1 second when info changes (modal opens)
  setDisableButton(true);
  const timer = setTimeout(() => {
    setDisableButton(false);
  }, 1000); // 1 second

  return () => clearTimeout(timer);
}, [info]);


  useEffect(() => {
    const fetchData = async () => {
      if (!selectedLRN) return;
      setIsLoading(true);
      try {
        const data = await getPaymentInfo(selectedLRN);
        setInfo(data[0]);
      } catch (error) {
        console.error("Error fetching payment info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedLRN]);
  
  if (!info) return null;

  const handleAccept = async () => {
    setAcceptLoading(true);

    const res = await fetch("/api/accept/enrollmentfee", {
      method: "POST",
      body: JSON.stringify({
        lrn: selectedLRN,
        name: info.fullName,
        pm: info.paymentMethod,
        amount: info.amount,
      }),
    });

    setAcceptLoading(false);

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      close();
      window.location.reload();
    } else {
      toast.error(data.error || "Failed to accept payment.");
    }
  };




  return (
    <>
      {/* MAIN PAYMENT REVIEW MODAL */}
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="w-[600px] bg-gray-50 rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="rounded-t-lg text-xl font-bold text-white bg-dGreen py-4 flex items-center justify-center">
              Payment Review
            </DialogTitle>
          </DialogHeader>

          <div className="bg-white flex flex-col items-center gap-5 py-4">

            {/* ===== PROFILE INFORMATION ===== */}
            <div className="w-full px-10">
              <p className="text-base font-bold text-dGreen">{info.fullName}</p>

              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="flex flex-col">
                  <span className="text-dGreen font-semibold">Amount:</span>
                  <span className="p-1 bg-green-100 rounded-md font-bold">
                    P{info.amount}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-dGreen font-semibold">Payment Method:</span>
                  <span className="p-1 bg-green-100 rounded-md font-bold capitalize">
                    {info.modeOfPayment}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-dGreen font-semibold">Reference No.:</span>
                  <span className="p-1 bg-green-100 rounded-md font-bold">
                    {info.reference_number || "N/A"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-dGreen font-semibold">Status:</span>
                  <span className="p-1 bg-green-100 rounded-md font-bold capitalize">
                    {info.status}
                  </span>
                </div>
              </div>
            </div>

            {/* ===== RECEIPT IMAGE (CLICK TO ZOOM) ===== */}
            <div className="w-full px-5 flex flex-col items-center py-2">
              {isLoading ? (
                <p className="text-lg">Loading...</p>
              ) : !info.reciept ? (
                <p>No receipt uploaded.</p>
              ) : (
                <button
                  onClick={() => setZoomOpen(true)}
                  className="focus:outline-none"
                >
                  <CldImage
                    alt="Receipt Screenshot"
                    src={info.reciept}
                    width="1000"
                    height="1000"
                    className="w-full h-auto rounded-lg shadow cursor-pointer hover:opacity-90 transition"
                  />
                </button>
              )}
            </div>

            {/* ===== ACCEP T BUTTON ADDED HERE ===== */}
            <div className="w-full text-center px-10 mt-2">
              <Button
                variant={"acceptButton"}
                className="rounded-lg px-4 py-2"
                onClick={handleAccept}
                disabled={acceptLoading || info.status === "Approved" || isLoading  || disableButton}
              >
                {acceptLoading ? "Accepting..." : "Accept Payment"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== IMAGE ZOOM MODAL ===== */}
      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogTitle />
        <DialogContent className="max-w-4xl bg-black rounded-lg flex justify-center items-center">
          {info?.reciept && (
            <CldImage
              alt="Zoomed Receipt"
              src={info.reciept}
              width="2000"
              height="2000"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
