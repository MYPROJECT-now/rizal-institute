"use client";

import { FC } from "react";
import { RemarksModal } from "@/components/accounts/cashier/applicants/remarks_cashier/remark_modal";
import { Cashier_ReservationReview } from "../applicants_view/Enrollees_cashier";
import { Tableapplicant_Type } from "@/src/type/CASHIER/APPLICANTS/applicansts";
import { useDeclineRemarksModal, useShowReservationPayementModal } from "@/src/store/CASHIER/applicants";
import { Button } from "@/components/ui/button";

interface Props {
  applicants: Tableapplicant_Type;
  onAccept: (id: number, lastName: string, firstName: string, middleName: string) => void;
  onDecline: (id: number) => void;
  className?: string;
  loading?: boolean;

}

const Student: FC<Props> = ({ applicants, onAccept, onDecline, className, loading  }) => {
  const { open } = useDeclineRemarksModal();
  const { open: openEnrollees } = useShowReservationPayementModal();

    // Determine the display status based on both fields
    const getDisplayStatus = () => {
      if (applicants.reservationPaymentStatus === "Reserved" && applicants.applicationFormReviewStatus === "Pending") {
        return "Ongoing";
      } else if (applicants.applicationFormReviewStatus === "Reserved" && applicants.reservationPaymentStatus === "Reserved") {
        return "Reserved";
      } else {
        return applicants.reservationPaymentStatus;
      }
    };
  

  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
      <td className="px-4 py-2">{applicants.lrn}</td>
      <td className="px-4 py-2">{applicants.lastName} {applicants.firstName} {applicants.middleName}</td>
      <td className="px-4 py-2">{applicants.gradeLevel}</td>
      <td className={applicants.reservationPaymentStatus === "Declined" ? "px-4 py-2 text-red-600 font-semibold" : "px-4 py-2 text-green-600 font-semibold "}>{getDisplayStatus()}</td>
      <td className="px-4 py-2">
        <Cashier_ReservationReview />
        <Button 
          className="w-[65px] h-[35px] rounded-lg"
          variant={"confirmButton"}
          onClick={() => openEnrollees(applicants.lrn)}
          >
            View
        </Button>
      </td>
      <td className="py-2 space-x-2">
        <Button
          onClick={() => onAccept(applicants.id, applicants.lastName, applicants.firstName, applicants.middleName ?? "")}
          className="w-[85px] h-[35px] rounded-lg"
          variant={"acceptButton"}
          disabled={applicants.reservationPaymentStatus !== "Pending" || loading || applicants.isActive === false}
        >
          {loading ? "Accepting..." : "Accept"}
        </Button>
        
        {/* Decline button only opens the modal */}
        <RemarksModal onDecline={onDecline} />
        <Button
          onClick={() => open(applicants.id, `${applicants.lastName} ${applicants.firstName} ${applicants.middleName}`)}
          variant={"rejectButton"}
          className="w-[85px] h-[35px] rounded-lg"
          disabled={applicants.reservationPaymentStatus !== "Pending" || applicants.isActive === false}
          
        >
          Decline
        </Button>
      </td>
     
    </tr>
  );
};

export default Student;
