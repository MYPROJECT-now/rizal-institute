"use client";

import { FC } from "react";
import { studentType_registrar  } from "@/src/type/AllEnrolleeType_registrar";
import { useRemarksModal } from "@/src/store/remarks_modal";
import { StatusModal } from "@/components/modals/remarks_registrar/remark_modal";
import { useRegEnrolleesModal } from "@/src/store/registrar/enrollees";
import { Reg_Enrollees } from "../modal/enrollees/enrollees";

interface Props {
  student: studentType_registrar ;
  onAccept: (id: number) => void;
}

const Student: FC<Props> = ({ student, onAccept  }) => {
  const { open } = useRemarksModal();
   const { open: openEnrollees } = useRegEnrolleesModal();

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn}</td>
      <td className="px-4 py-2">{student.lastName} {student.firstName} {student.middleName}</td>
      <td className="px-4 py-2">{student.gradeLevel}</td>
      <td className="px-4 py-2">
        <Reg_Enrollees />
        <button 
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={openEnrollees}>
            View
          </button>
      </td>
      <td className="px-4 py-2 space-x-2">
        <button
          onClick={() => onAccept(student.id)}
          className={`px-3 py-1 rounded text-white transition 
            ${student.applicationStatus === "Pending" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
          disabled={student.applicationStatus !== "Pending"}
        >
          Accept
        </button>
        
        {/* Decline button only opens the modal */}
        <StatusModal />
        <button
          onClick={() => open(student.id)}
          className={`px-3 py-1 rounded text-white transition 
            ${student.applicationStatus === "Pending" ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"}`}
          disabled={student.applicationStatus !== "Pending"}
        >
          Decline
        </button>
      </td>
      <td className="px-4 py-2 text-green-700 font-semibold">{student.applicationStatus}</td>
    </tr>
  );
};

export default Student;
