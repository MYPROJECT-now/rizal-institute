"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {  getStatusByTrackingId } from "@/src/actions/landingPage";
import { format } from "date-fns";
import { useShowStatusModal } from "@/src/store/LANDING_PAGE/landing_page";
import { Button } from "@/components/ui/button";

interface StatusData {
  applicationFormReviewStatus: string;
  reservationPaymentStatus: string;
  regRemarks?: string | null;
  cashierRemarks?: string | null;
  regDate?: string | null;
  cashierDate?: string | null;
  confirmationStatus?: string | null;
  admissionStatus?: string | null;
  hasPaidReservation?: string | null;
  hasTemptMonthly?: number | null;
  paymentStatus?: string | null;
}

export const StatusModal = () => {
  const { isOpen, close } = useShowStatusModal();
  const [trackingId, setTrackingId] = useState("");
  const [statusData, setStatusData] = useState<StatusData | null>(null);
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
    } catch (error) {
      setStatusData(null);
      setError("Something went wrong. Please try again later.");
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false);
    }
  };

    // const handleAccept = async () => {
    // const response = await acceptAdmission(trackingId);
    // if (response.success) {
    //     toast.success("Application accepted successfully.");
    //     close();
    // } else {
    //     toast.error("Something went wrong while accepting the application.");
    // }
    // };


  const handleReApply = () => {
    close();
    router.push(`/reApplications?trackingId=${trackingId}`);
  };

  const handlePayReservation = () => {
    close();
    router.push(`/payment?trackingId=${trackingId}`);
  };

  const handlePaymentMethod = () => {
    close();
    router.push(`/payment_method?trackingId=${trackingId}`);
  };

  const handleRePayTuition = () => {
    close();
    router.push(`/full_tuition?trackingId=${trackingId}`);
  };

  
  const handleclose = () => {
    setTrackingId("");
    setStatusData(null);
    setError(null);
    close();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600";
      case "declined":
        return "text-red-600";
      case "pending":
        return "text-yellow-400";
      case "reserved":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleclose}>
      <DialogContent className="flex flex-col items-center lg:w-[600px] sm:w-[500px]  w-[300px] rounded-t-lg">
        <DialogHeader className="sm:h-[70px] h-[50px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
          <DialogTitle className="text-center text-white sm:text-2xl text-lg">
            Track Application
          </DialogTitle>
        </DialogHeader>

        <div className="w-full px-6 lg:py-4 py-1  space-y-4">
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
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg flex flex-col gap-3 items-center ">
                <div className="flex flex-row gap-10">
                  <div className="flex flex-col gap-6 text-center">
                    <p className="text-2xl text-dGreen font-oswald font-bold">
                      Application Form:
                    </p>
                    <p
                      className={`text-xl font-bold ${getStatusColor(
                        statusData.applicationFormReviewStatus
                      )}`}
                    >
                         {statusData.applicationFormReviewStatus === "Reserved" ? "Approved" : statusData.applicationFormReviewStatus}                    </p>
                  </div>

                  <div className="flex flex-col gap-6 text-center">
                    <p className="text-2xl text-dGreen font-oswald font-bold">
                      Reservation Payment:
                    </p>
                    <p
                      className={`text-xl font-bold ${getStatusColor(
                        statusData.reservationPaymentStatus
                      )}`}
                    >
                    {statusData.reservationPaymentStatus === "Reserved" ? "Approved" : statusData.reservationPaymentStatus}                    </p>
                  </div>
                </div>
              </div>

              {statusData?.regRemarks && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Registrar&apos;s Remarks
                  </h3>
                  <p className="text-gray-700">{statusData.regRemarks}</p>
                  {statusData.regDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {format(new Date(statusData.regDate), "MMMM dd, yyyy")}
                    </p>
                  )}
                </div>
              )}

              
              {statusData?.cashierRemarks && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Cashier&apos;s Remarks
                  </h3>
                  <p className="text-gray-700">{statusData.cashierRemarks}</p>
                  {statusData.cashierDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {format(new Date(statusData.cashierDate), "MMMM dd, yyyy")}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

            {!statusData?.hasTemptMonthly && (
              <div className="p-4 bg-gray-50 rounded-lg">
              <p className=" mx-10 text-green-700 bg-gray-300/20 border-2 shadow-lg rounded-xl p-5 font-semibold text-center">
                Kindly wait for the cashier to finish calculating your tuition. An email will be sent to you about your tuition.
              </p>            
              </div>
            )}

            {statusData?.admissionStatus === "Enrolled" && (
              <div className="p-4 bg-gray-50 rounded-lg">
              <p className=" mx-   text-green-700 bg-gray-300/20 border-2 shadow-lg rounded-xl p-5 font-semibold text-center">
                You have successfully enrolled!
              </p>            
              </div>
            )}


          <div className="flex justify-center mt-4">
            { statusData?.applicationFormReviewStatus !== "Declined" &&
            statusData?.reservationPaymentStatus === "Pending" &&
            !statusData?.hasPaidReservation ? (
              <Button
                variant="mainButton"
                className="h-[50px] w-[200px] rounded-xl"
                onClick={handlePayReservation}
              >
              Pay Reservation
              </Button>
            ) :
            
            statusData?.applicationFormReviewStatus === "Declined" ||
            statusData?.reservationPaymentStatus === "Declined" ? (
              <Button
                variant="mainButton"
                className="h-[50px] w-[200px] rounded-xl"
                onClick={handleReApply}
              >
                Re-Apply
              </Button>
            ) : 

            statusData?.paymentStatus === "Declined" ? (
              <Button
                variant="mainButton"
                className="h-[50px] w-[200px] rounded-xl"
                onClick={handleRePayTuition}
              >
                Cancel
              </Button>
            ) :

            statusData?.confirmationStatus === "Confirmed" ? (
                <p className="w-full mx-10 text-green-700 bg-gray-300/20 border-2 shadow-lg rounded-xl p-5 font-semibold text-center">
                  Kindly wait for registrar to confirm your enrollment
                </p>
            ) :  
            

            statusData?.hasTemptMonthly && statusData?.admissionStatus === "Pending" ? (
              <div className="flex flex-col items-center gap-4 border-2 rounded-xl bg-gray-100/40 shadow-lg px-[80px] py-3">
                <p className="text-[15px] font-bold text-dGreen">
                  Proceed to select your payment method
                </p>    

                <Button
                  variant="mainButton"
                  className="h-[50px] w-[200px] rounded-xl"
                  onClick={handlePaymentMethod}
                >
                  Continue to Payment Options
                </Button>

              </div>
            // ):
            // //new payment
            // statusData?.applicationFormReviewStatus === "Reserved" ||
            //   statusData?.reservationPaymentStatus === "Reserved" ? (
            //   <div className="flex flex-col items-center gap-4 border-2 rounded-xl bg-gray-100/40 shadow-lg p-2">
            //     <p className="text-[15px] font-bold text-dGreen">
            //       Are you ready to confirm your enrollment at Rizal Institute?
            //     </p>
            //     <div className="flex flex-row gap-4">
            //       <Button
            //         variant="acceptButton"
            //         className="h-[40px] w-[100px] rounded-xl"
            //         onClick={handleAccept}
            //       >
            //         Accept
            //       </Button>

            //       <Button
            //         variant="rejectButton"
            //         className="h-[40px] w-[100px] rounded-xl"
            //         onClick={handleclose}
            //       >
            //         Not now
            //       </Button>
            //     </div>
            //   </div>
            ) : (
              <Button
                variant="mainButton"
                className="sm:py-5 sm:px-[70px] py-4   px-10 rounded-xl"
                onClick={handleSubmit}
                disabled={loading || trackingId.trim() === ""}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
