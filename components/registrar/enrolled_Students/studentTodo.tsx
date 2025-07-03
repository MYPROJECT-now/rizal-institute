"use client";

import { FC } from "react";
import { Students_info_Modal } from "./student_modal";
import { all_studentTable_Type } from "@/src/type/REGISTRAR/student";
import { useTableStudentModal } from "@/src/store/REGISTRAR/student";
import { Button } from "@/components/ui/button";

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
        <Button 
          variant="confirmButton"
          className="w-[100px] h-[40px] rounded-xl"
          onClick={() => openEnrollees(student.lrn)}>
            View
          </Button>
      </td>
     
    </tr>
  );
};

export default Student;
