"use client";

import { FC, } from "react";

import { StatusModal } from "@/components/accounts/registrar/applicants/remarks_registrar/remark_modal";
import { Enrollees_info_Modal } from "../applicants_information_modal/applicants_modal";
import { Tableapplicant_Type } from "@/src/type/REGISTRAR/applicant";
import { useDeclineRemarksModal, useShowApplicantInfoModal } from "@/src/store/REGISTRAR/applicant";
import { Button } from "@/components/ui/button";

interface Props {
  applicant: Tableapplicant_Type;
  onAccept: (id: number, lastName: string, firstName: string, middleName: string) => void;
  onDecline: (id: number ) => void;
  className?: string;
  loading?: boolean;
}

const Applicant: FC<Props> = ({ applicant, onAccept, onDecline, className, loading }) => {
  const { open } = useDeclineRemarksModal();
  const { open: openEnrollees } = useShowApplicantInfoModal();


  // Determine the display status based on both fields
  const getDisplayStatus = () => {
    if (applicant.applicationFormReviewStatus === "Reserved" && applicant.reservationPaymentStatus === "Pending") {
      return "Ongoing";
    } else if (applicant.applicationFormReviewStatus === "Reserved" && applicant.reservationPaymentStatus === "Reserved") {
      return "Reserved";
    } else {
      return applicant.applicationFormReviewStatus;
    }
  };

  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
      <td className="px-4 py-2">{applicant.lrn}</td>
      <td className="px-4 py-2">{applicant.lastName} {applicant.firstName} {applicant.middleName}</td>
      <td className="px-4 py-2">{applicant.gradeLevel}</td>
      <td className="px-4 py-2">
        <Enrollees_info_Modal />
        <Button 
          variant={"confirmButton"}
          className="w-[95px] h-[35px] rounded-lg"
          onClick={() => openEnrollees(applicant.lrn)}>
            View
          </Button>
      </td>
      <td className={applicant.applicationFormReviewStatus === "Declined" ? "px-4 py-2 text-red-600 font-semibold" : "px-4 py-2 text-green-600 font-semibold "}>{getDisplayStatus()}</td>
      <td className="px-4 py-2 text-green-700 font-semibold">{applicant.dateApprovedByRegistrar?.toString() || "-"}</td>  
      <td className="px-4 py-2 space-x-2">
        <Button
          onClick={() => onAccept(applicant.id,  applicant.lastName, applicant.firstName, applicant.middleName ?? "")}
          variant={"acceptButton"}
          className="w-[95px] h-[35px] rounded-lg"
          disabled={applicant.applicationFormReviewStatus !== "Pending" || loading || applicant.isActive === false}
        >
          {loading ? "Accepting..." : "Accept"}
        </Button>
        
        {/* Decline button only opens the modal */}
        <StatusModal onDecline={onDecline}/>
        <Button
          onClick={() => open(applicant.id, `${applicant.lastName} ${applicant.firstName} ${applicant.middleName}`)}
           variant={"rejectButton"}
          className="w-[95px] h-[35px] rounded-lg"
          disabled={applicant.applicationFormReviewStatus !== "Pending" || applicant.isActive === false}
        >
          Decline
        </Button>
      </td>  
    </tr>
  );
};

export default Applicant;
