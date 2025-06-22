"use client";

import { FC } from "react";
import { Students_info_Modal } from "./student_modal";
import { all_studentTable_Type } from "@/src/type/REGISTRAR/student";
import { useTableStudentModal } from "@/src/store/REGISTRAR/student";

interface Props {
  student: all_studentTable_Type;
}

const Student: FC<Props> = ({ student  }) => {
   const { open: openEnrollees } = useTableStudentModal();

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn}</td>
      <td className="px-4 py-2">{student.studentLastName} {student.studentFirstName} {student.studentMiddleName}</td>
      <td className="px-4 py-2">Grade 9</td>
      <td className="px-4 py-2">
        <Students_info_Modal />
        <button 
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => openEnrollees(student.lrn)}>
            View
          </button>
      </td>
     
    </tr>
  );
};

export default Student;
