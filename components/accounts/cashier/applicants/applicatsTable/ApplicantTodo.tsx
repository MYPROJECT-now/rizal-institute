"use client";

import { FC } from "react";
import { RemarksModal } from "@/components/accounts/cashier/applicants/remarks_cashier/remark_modal";
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
      <td className="px-[55px] py-2">{applicants.gradeLevel}</td>
      <td className={applicants.reservationPaymentStatus === "Declined" ? "px-4 py-2 text-red-600 font-semibold" : "px-4 py-2 text-green-600 font-semibold "}>{getDisplayStatus()}</td>
      <td className="px-4 py-2">
        <Button 
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
          variant={"confirmButton"}
          onClick={() => openEnrollees(applicants.lrn)}
          >
            View
        </Button>
      </td>
      <td className=" flex flex-row gap-1 items-center justify-center py-2">
        <Button
          onClick={() => onAccept(applicants.id, applicants.lastName, applicants.firstName, applicants.middleName ?? "")}
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
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
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
          disabled={applicants.reservationPaymentStatus !== "Pending" || applicants.isActive === false}
          
        >
          Decline
        </Button>
      </td>
     
    </tr>
  );
};

export default Student;
