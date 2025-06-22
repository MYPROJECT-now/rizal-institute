"use client";

import { FC } from "react";
import { all_student_Type } from "@/src/type/CASHIER/STUDENT/student";
import { useShowSOAModal } from "@/src/store/CASHIER/student";
import { SoaModal } from "../soa/SoaModal";

interface Props {
  student: all_student_Type;
}

const Student: FC<Props> = ({ student  }) => {
  const { open: openSoa } = useShowSOAModal();  

  

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn}</td>
      <td className="px-4 py-2">{student.LastName} {student.FirstName} {student.MiddleName} {student.Suffix}</td>
      <td className="px-4 py-2">Grade 7</td>
      <td className="px-4 py-2">
        <SoaModal />
        <button 
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => openSoa(student.lrn)}
          >
            View
        </button>
      </td>
     
    </tr>
  );
};

export default Student;
