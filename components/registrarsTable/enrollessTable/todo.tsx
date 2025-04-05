"use client";

import { FC } from "react";
import { studentType } from "@/src/type/AllEnrolleeType";
import { useRemarksModal } from "@/src/store/remarks_modal";
import { StatusModal } from "@/components/modals/remarks/remark_modal";

interface Props {
  student: studentType;
}

const Student: FC<Props> = ({ student }) => {
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
          className={`bg-blue-500 text-white px-3 py-1 rounded ${student.applicationStatus !== "Pending" ? "bg-blue-300" : ""}`}
          disabled={student.applicationStatus !== "Pending"}
        >
          Accept
        </button>
        
        {/* Decline button only opens the modal */}
        <StatusModal />
        <button
          onClick={() => open(student.id)}
          className={`bg-red-500 text-white px-3 py-1 rounded ${student.applicationStatus !== "Pending" ? "bg-red-300" : ""}`}
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
