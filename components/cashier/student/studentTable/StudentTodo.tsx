"use client";

import { FC } from "react";
import { all_student_Type } from "@/src/type/CASHIER/STUDENT/student";
import { useShowSOAModal } from "@/src/store/CASHIER/student";
import { SoaModal } from "../soa/SoaModal";
import { Button } from "@/components/ui/button";

interface Props {
  student: all_student_Type;
  className?: string;
}

const Student: FC<Props> = ({ student, className  }) => {
  const { open: openSoa } = useShowSOAModal();  

  

  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
      <td className="px-4 py-2">{student.lrn}</td>
      <td className="px-4 py-2">{student.LastName} {student.FirstName} {student.MiddleName} {student.Suffix}</td>
      <td className="px-4 py-2">Grade 7</td>
      <td className="px-4 py-2">
        <SoaModal />
        <Button 
          className="h-[30px] w-[80px] rounded-xl"
          variant={"confirmButton"}
          onClick={() => openSoa(student.lrn)}
          >
            View
        </Button>
      </td>
     
    </tr>
  );
};

export default Student;
