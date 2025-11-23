"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import {  getApplicationRemarks, getStatusByTrackingId } from "@/src/actions/landingPage";
import { useShowStatusModal } from "@/src/store/LANDING_PAGE/landing_page";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface StatusData {
  applicationFormReviewStatus: string;
  hasPaidReservation?: string | null;
  hasTemptMonthly?: number | null;
  admissionStatus?: string | null;
  confirmationStatus?: string | null;
  paymentStatus?: string | null;
  status?: string | null;

}

interface RemarksData{
  regRemarks: string | null;
  cashierRemarks: string | null;
  regDate: string | null;
  cashierDate: string | null;
}


export const StatusModal = () => {
  const { isOpen, close } = useShowStatusModal();
  const [trackingId, setTrackingId] = useState("");
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [remarks, setRemarks] = useState<RemarksData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStatusByTrackingId(trackingId);
      if (data) {
        setStatusData(data);
      } else {
        setStatusData(null);
        setError("No application found with that ID.");
      }
      const data_remarks = await getApplicationRemarks(trackingId);
      setRemarks(data_remarks)

    } catch (error) {
      setStatusData(null);
      setError("Something went wrong. Please try again later.");
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false);
    }
  };


  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600";
      case "declined":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      case "reserved":
        return "text-blue-600";
      case "done":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const handlePaymentMethod = () => {
    close();
    router.push(`/payment_section?trackingId=${trackingId}`);
  };

  const handleReApply = () => {
    close();
    router.push(`/reApplications?trackingId=${trackingId}`);
  };  
  
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col items-center lg:w-[600px] sm:w-[500px]  w-[300px] rounded-t-lg">
        <DialogHeader className="sm:h-[70px] h-[50px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white sm:text-2xl text-lg">
            Track Application
          </DialogTitle>
        </DialogHeader>

        <main className="w-full flex flex-col items-center gap-6 px-6 py-4">
          <input
            type="text"
            placeholder="Enter Application ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full py-2 rounded-md border-2 border-dGreen px-3 focus:ring-2 focus:ring-dGreen focus:border-dGreen outline-none transition"
          />

          {loading && (
            <p className="text-center text-gray-500 font-medium">
              Fetching status...
            </p>
          )}

          {error && (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          )}

          {statusData && (
          <section className="w-full sm:flex-colsm:flex-row flex justify-center sm:gap-[80px] gap-[40px]  py-4">
            <div className="flex flex-col gap-6 text-center">
              <header className="text-2xl text-dGreen font-oswald font-bold">
                Application Form:
              </header>
              <p
                className={`text-xl font-bold ${getStatusColor(
                  statusData.applicationFormReviewStatus
                )}`}
              >
                {statusData.applicationFormReviewStatus === "Reserved" ? "Approved" : statusData.applicationFormReviewStatus}                    
              </p>
            </div>

            <div className="flex flex-col gap-6 text-center">
              <header className="text-2xl text-dGreen font-oswald font-bold">
                Fee Assessment:
              </header>
              <p
                className={`text-xl font-bold ${getStatusColor(
                  statusData.hasTemptMonthly !== null ? "Done" : "Pending"
                )}`}
              >
                {statusData.hasTemptMonthly !== null ? "Done" : "Pending"}         
              </p>
            </div>
          </section>
          )}

          <section className="grid grid-cols-2 gap-10">
            {remarks && remarks.length > 0 && (
              <div className=" flex flex-col gap-2 py-4 px-8 shadow-lg border-2 border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Registrar&apos;s Remarks
                </h3>
                <p className="text-gray-700">{remarks?.[0]?.regRemarks}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Date: {remarks?.[0]?.regDate ? format(new Date(remarks[0].regDate), "MMMM dd, yyyy") : "N/A"}
                </p>
              </div>
            )}

            {remarks && remarks.length > 0 && (
              <div className=" flex flex-col gap-2 py-4 px-8 shadow-lg border-2 border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Cashier&apos;s Remarks
                </h3>
                <p className="text-gray-700">{remarks?.[0]?.cashierRemarks}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Date: {remarks?.[0]?.cashierDate ? format(new Date(remarks[0].cashierDate), "MMMM dd, yyyy") : "N/A"}
                </p>
              </div>
            )}
          </section>


          {statusData?.applicationFormReviewStatus === "Declined"  ? (
            <Button
              variant="mainButton"
              className="h-[50px] w-[200px] rounded-xl"
              onClick={handleReApply}
            >
              Re-Apply
            </Button>
          ) :  (
          // statusData?.paymentStatus === "Pending" ? (
          //   <p className="w-full mx-10 text-green-700 bg-gray-300/20 border-2 shadow-lg rounded-xl p-5 font-semibold text-center">
          //     Wait for the cashier to verify your payment
          //   </p>
          // ) :  
          // statusData?.confirmationStatus === "Aprroved" || statusData?.confirmationStatus === "Approved" ? (
          //   <p className="w-full mx-10 text-green-700 bg-gray-300/20 border-2 shadow-lg rounded-xl p-5 font-semibold text-center">
          //     Kindly wait for registrar to confirm your enrollment
          //   </p>
          // ) :  
          statusData?.hasTemptMonthly && statusData?.admissionStatus === "Pending" && statusData?.paymentStatus !== "Declined" && statusData?.paymentStatus !== "Pending" && statusData?.applicationFormReviewStatus === "Reserved"  && statusData?.status !== "Pending"  ? (
            <div className="flex flex-col items-center gap-4 border-2 rounded-xl bg-gray-100/40 shadow-lg sm:px-[80px] px-[40px] py-3">
              <p className="text-[15px] font-bold text-dGreen">
                Proceed to Payment Section
              </p>    

              <Button
                variant="mainButton"
                className="h-[50px] w-[200px] rounded-xl"
                onClick={handlePaymentMethod}
              >
                Continue to Payment Section
              </Button>
            </div>
          ) :
          statusData?.hasTemptMonthly && statusData?.admissionStatus === "Pending" && statusData?.paymentStatus !== "Declined" && statusData?.paymentStatus !== "Pending" && statusData?.applicationFormReviewStatus === "Reserved"  && statusData?.status === "Pending"  ? (
            <p className="w-full mx-10 text-green-700 bg-gray-300/20 border-2 shadow-lg rounded-xl p-5 font-semibold text-center">
              Wait for the cashier to verify your payment
            </p>
          ) :
          statusData?.hasTemptMonthly && statusData?.admissionStatus === "Pending"  && statusData?.paymentStatus !== "Pending" && statusData?.applicationFormReviewStatus === "Reserved"  && statusData?.status === "Approved"  && statusData?.confirmationStatus === "Pending" ? (
            <p className="w-full mx-10 text-green-700 bg-gray-300/20 border-2 shadow-lg rounded-xl p-5 font-semibold text-center">
              Wait for the registrar to confirm your enrollment
            </p>
          ) :
           statusData?.applicationFormReviewStatus === "Reserved"  && statusData?.status === "Approved"  && statusData?.confirmationStatus === "Approved" && statusData?.admissionStatus === "Enrolled" ? (
            <p className="w-full mx-10 text-green-700 bg-gray-300/20 border-2 shadow-lg rounded-xl p-5 font-semibold text-center">
              Congratulations you are now enrolled!!
            </p>
          ) :
          // statusData?.paymentStatus === "Declined" ? (
          //   <Button
          //     variant="mainButton"
          //     className="h-[50px] w-[200px] rounded-xl"
          //     onClick={handleRePayTuition}
          //   >
          //     Tuition Fee Re-Payment
          //   </Button>
          // ) :
            <Button
              variant="mainButton"
              className="sm:py-5 sm:px-[70px] py-4   px-10 rounded-xl"
              onClick={handleSubmit}
              disabled={loading || trackingId.trim() === ""}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          )}


        </main>
      </DialogContent>
    </Dialog>
  );
};
