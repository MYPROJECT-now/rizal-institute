"use client";

import { FC } from "react";
import { RemarksModal } from "@/components/accounts/cashier/applicants/remarks_cashier/remark_modal";
import {  Tablefull_Type } from "@/src/type/CASHIER/APPLICANTS/applicansts";
import { useDeclineRemarksModal, useShowReservationPayementModal } from "@/src/store/CASHIER/applicants";
import { Button } from "@/components/ui/button";
import { Cashier_FullPayment } from "../fullpayment_view/Enrollees_cashier";

interface Props {
  applicants: Tablefull_Type;
  onAccept: (id: number, lastName: string, firstName: string, middleName: string) => void;
  onDecline: (id: number) => void;
  className?: string;
  loading?: boolean;

}

const Student: FC<Props> = ({ applicants, onAccept, onDecline, className, loading  }) => {
  const { open } = useDeclineRemarksModal();
  const { open: openEnrollees } = useShowReservationPayementModal();

  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
      <td className="px-4 py-2">{applicants.lrn}</td>
      <td className="px-4 py-2">{applicants.lastName} {applicants.firstName} {applicants.middleName}</td>
      <td className="px-[55px] py-2">{applicants.gradeLevel}</td>
      <td className="px-4 py-2">
        <Cashier_FullPayment />
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
          disabled={applicants.payment_status === "Approved"}
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
          variant={"acceptButton"}
        >
          {loading ? "Accepting..." : "Accept"}
        </Button>
        
        {/* Decline button only opens the modal */}
        <RemarksModal onDecline={onDecline} />
        <Button
          onClick={() => open(applicants.id, `${applicants.lastName} ${applicants.firstName} ${applicants.middleName}`)}
          disabled={applicants.payment_status === "Approved"}
          variant={"rejectButton"}
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
          
        >
          Decline
        </Button>
      </td>
     
    </tr>
  );
};

export default Student;
