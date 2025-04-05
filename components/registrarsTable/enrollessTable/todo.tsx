"use client";

import { FC } from "react";
import { studentType } from "@/src/type/AllEnrolleeType";
import { useRemarksModal } from "@/src/store/remarks_modal";
import { StatusModal } from "@/components/modals/remarks/remark_modal";

interface Props {
  student: studentType;
  onAccept: (id: number) => void;
}

const Student: FC<Props> = ({ student, onAccept  }) => {
  const { open } = useRemarksModal();

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn}</td>
      <td className="px-4 py-2">{student.lastName} {student.firstName} {student.middleName}</td>
      <td className="px-4 py-2">{student.gradeLevel}</td>
      <td className="px-4 py-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded">View</button>
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
