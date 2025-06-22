"use client";

import { FC } from "react";
import { RemarksModal } from "@/components/cashier/applicants/remarks_cashier/remark_modal";
import { Cashier_ReservationReview } from "../applicants_view/Enrollees_cashier";
import { Tableapplicant_Type } from "@/src/type/CASHIER/APPLICANTS/applicansts";
import { useDeclineRemarksModal, useShowReservationPayementModal } from "@/src/store/CASHIER/applicants";

interface Props {
  applicants: Tableapplicant_Type;
  onAccept: (id: number) => void;
}

const Student: FC<Props> = ({ applicants, onAccept  }) => {
  const { open } = useDeclineRemarksModal();
  const { open: openEnrollees } = useShowReservationPayementModal();

    // Determine the display status based on both fields
    const getDisplayStatus = () => {
      if (applicants.reservationPaymentStatus === "Pending" && applicants.applicationFormReviewStatus === "Reserved") {
        return "Ongoing";
      } else if (applicants.applicationFormReviewStatus === "Reserved" && applicants.reservationPaymentStatus === "Reserved") {
        return "Reserved";
      } else {
        return applicants.applicationFormReviewStatus;
      }
    };
  

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{applicants.lrn}</td>
      <td className="px-4 py-2">{applicants.lastName} {applicants.firstName} {applicants.middleName}</td>
      <td className="px-4 py-2">{applicants.gradeLevel}</td>
      <td className="px-4 py-2">
        <Cashier_ReservationReview />
        <button 
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => openEnrollees(applicants.lrn)}
          >
            View
        </button>
      </td>
      <td className="px-4 py-2 space-x-2">
        <button
          onClick={() => onAccept(applicants.id)}
          className={`px-3 py-1 rounded text-white transition 
            ${applicants.reservationPaymentStatus === "Pending" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
          disabled={applicants.reservationPaymentStatus !== "Pending"}
        >
          Accept
        </button>
        
        {/* Decline button only opens the modal */}
        <RemarksModal />
        <button
          onClick={() => open(applicants.id)}
          className={`px-3 py-1 rounded text-white transition 
            ${applicants.reservationPaymentStatus === "Pending" ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"}`}
          disabled={applicants.reservationPaymentStatus !== "Pending"}
        >
          Decline
        </button>
      </td>
      <td className="px-4 py-2 text-green-700 font-semibold">{getDisplayStatus()}</td>
    </tr>
  );
};

export default Student;
