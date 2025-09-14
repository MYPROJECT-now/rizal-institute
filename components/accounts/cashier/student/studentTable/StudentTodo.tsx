"use client";

import { FC } from "react";
import { all_student_Type } from "@/src/type/CASHIER/STUDENT/student";
import { useShowSOAModal } from "@/src/store/CASHIER/student";
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
      <td className="px-4 py-2">{student.studentLastName}, {student.studentFirstName} {student.studentMiddleName} {student.studentSuffix}</td>
      <td className="px-[55px] py-2">{student.gradeLevelName}</td>
      <td className="px-4 py-2">
        <Button 
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
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
