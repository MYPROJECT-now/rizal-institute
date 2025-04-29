"use client";

import { FC } from "react";
import { studentType_cashier } from "@/src/type/AllEnrolleeType_cashier";
import { useRemarksModal } from "@/src/store/remarks_modal";
import { StatusModal } from "@/components/cashiersTable/remarks_cashier/remark_modal";
import { useCashierEnrolleesModal } from "@/src/store/cashier/enrollees";
import { Cashier_ReservationReview } from "../enrollees_view/Enrollees_cashier";

interface Props {
  student: studentType_cashier;
  onAccept: (id: number) => void;
}

const Student: FC<Props> = ({ student, onAccept  }) => {
  const { open } = useRemarksModal();
  const { open: openEnrollees } = useCashierEnrolleesModal();

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn}</td>
      <td className="px-4 py-2">{student.lastName} {student.firstName} {student.middleName}</td>
      <td className="px-4 py-2">{student.gradeLevel}</td>
      <td className="px-4 py-2">
        <Cashier_ReservationReview />
        <button 
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={openEnrollees}
          >
            View
        </button>
      </td>
      <td className="px-4 py-2 space-x-2">
        <button
          onClick={() => onAccept(student.id)}
          className={`px-3 py-1 rounded text-white transition 
            ${student.reservationPaymentStatus === "Pending" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
          disabled={student.reservationPaymentStatus !== "Pending"}
        >
          Accept
        </button>
        
        {/* Decline button only opens the modal */}
        <StatusModal />
        <button
          onClick={() => open(student.id)}
          className={`px-3 py-1 rounded text-white transition 
            ${student.reservationPaymentStatus === "Pending" ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"}`}
          disabled={student.reservationPaymentStatus !== "Pending"}
        >
          Decline
        </button>
      </td>
      <td className="px-4 py-2 text-green-700 font-semibold">{student.reservationPaymentStatus}</td>
    </tr>
  );
};

export default Student;
