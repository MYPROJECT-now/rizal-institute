"use client";

import { FC } from "react";
import { StatusModal } from "@/components/registrar/applicants/remarks_registrar/remark_modal";
import { Enrollees_info_Modal } from "../applicants_information_modal/applicants_modal";
import { Tableapplicant_Type } from "@/src/type/REGISTRAR/applicant";
import { useDeclineRemarksModal, useShowApplicantInfoModal } from "@/src/store/REGISTRAR/applicant";

interface Props {
  applicant: Tableapplicant_Type;
  onAccept: (id: number) => void;
}

const Applicant: FC<Props> = ({ applicant, onAccept  }) => {
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
    <tr className="border-b">
      <td className="px-4 py-2">{applicant.lrn}</td>
      <td className="px-4 py-2">{applicant.lastName} {applicant.firstName} {applicant.middleName}</td>
      <td className="px-4 py-2">{applicant.gradeLevel}</td>
      <td className="px-4 py-2">
        <Enrollees_info_Modal />
        <button 
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => openEnrollees(applicant.lrn)}>
            View
          </button>
      </td>
      <td className="px-4 py-2 space-x-2">
        <button
          onClick={() => onAccept(applicant.id)}
          className={`px-3 py-1 rounded text-white transition 
            ${applicant.applicationFormReviewStatus === "Pending" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
          disabled={applicant.applicationFormReviewStatus !== "Pending"}
        >
          Accept
        </button>
        
        {/* Decline button only opens the modal */}
        <StatusModal />
        <button
          onClick={() => open(applicant.id)}
          className={`px-3 py-1 rounded text-white transition 
            ${applicant.applicationFormReviewStatus === "Pending" ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"}`}
          disabled={applicant.applicationFormReviewStatus !== "Pending"}
        >
          Decline
        </button>
      </td>
      <td className="px-4 py-2 text-green-700 font-semibold">{getDisplayStatus()}</td>
    </tr>
  );
};

export default Applicant;
