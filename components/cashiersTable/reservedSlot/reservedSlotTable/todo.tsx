"use client";

import { FC } from "react";
import { reservedSlotType } from "@/src/type/reservedSlotType";
import { useRemarksModal } from "@/src/store/remarks_modal";
import { StatusModal } from "@/components/cashiersTable/remarks_cashier/remark_modal";
import { useCashierReservedModal } from "@/src/store/cashier/reserved";
import { Cashier_UpfrontPaymentReview } from "../reservedSlot_modal/resercedSlot_cashier";


interface Props {
  student: reservedSlotType;
  onAccept: (id: number) => void;
}

const Student: FC<Props> = ({ student, onAccept  }) => {
  const { open } = useRemarksModal();
  const { open: openEnrollees } = useCashierReservedModal();
  
  return (
    <tr className="border-b text-center">
      <td className="px-1 py-2">{student.lrn}</td>
      <td className="px-4 py-2">{student.lastName} {student.firstName} {student.middleName}</td>
      <td className="px-2 py-2">{student.gradeLevel}</td>
      <td className="px-4 py-2"> 
        <Cashier_UpfrontPaymentReview />
        <button 
        className="bg-green-500 text-white px-3 py-1 rounded"
        onClick={openEnrollees}
        >
          details
        </button>
      </td>
       <td className="px-4 py-2 space-x-2">
              <button
                onClick={() => onAccept(student.id)}
                className={`px-3 py-1 rounded text-white transition 
                  ${student.admissionStatus === "Pending" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
                disabled={student.admissionStatus !== "Pending"}
              >
                Accept
              </button>
              
              {/* Decline button only opens the modal */}
              <StatusModal />
              <button
                onClick={() => open(student.id)}
                className={`px-3 py-1 rounded text-white transition 
                  ${student.admissionStatus === "Pending" ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"}`}
                disabled={student.admissionStatus !== "Pending"}
              >
                Decline
              </button>
            </td>
      <td className="px-4 py-2">{student.admissionStatus}</td>
    </tr>
  );
};

export default Student;
