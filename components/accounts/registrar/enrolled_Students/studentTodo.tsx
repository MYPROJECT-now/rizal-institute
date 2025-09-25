"use client";

import { FC } from "react";
import { all_studentTable_Type } from "@/src/type/REGISTRAR/student";
import { useTableStudentModal } from "@/src/store/REGISTRAR/student";
import { Button } from "@/components/ui/button";

interface Props {
  student: all_studentTable_Type;
  transferStudent: ( lrn: string) => void;
  dropStudent: ( lrn: string) => void;
  loading?: boolean;
}


const Student: FC<Props> = ({ student, transferStudent, dropStudent, loading  }) => {
  const { open: openEnrollees } = useTableStudentModal();
  
  const handleTransfer = async () => {
    transferStudent( student.lrn);
  }

  const handleDrop = async () => {
    dropStudent(student.lrn);
  }

  const fullName = `${student.studentFirstName} ${student.studentMiddleName ?? ""} ${student.studentLastName}`;

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn || "..."}</td>
      <td className=" py-2">{fullName}</td>
      <td className="px-[55px] py-2">{student.gradeLevel}</td>
      <td className={student.status === "Enrolled" ?  "text-green-700 font-semibold"  : "text-red-700 font-semibold"}> {student.status}</td>
      <td className="px-4 py-2">
        <Button 
          variant="confirmButton"
          className=" rounded-lg lg:px-5 px-3   lg:py-2 py-1 text-xs sm:text-sm  "
          onClick={() => openEnrollees(student.lrn)}>
            View
          </Button>
      </td>
      <td className="py-2 px-2 flex gap-2">
        <Button
          variant="rejectButton"
          className=" rounded-lg lg:px-5 px-3   lg:py-2 py-1 text-xs sm:text-sm  "
          onClick={handleTransfer}
          disabled={loading || student.status === "Dropped" || student.status === "Transferred" || student.isActive === false}
        >
          Transfer
        </Button>
        
        <Button
          variant="rejectButton"
          className=" rounded-lg lg:px-5 px-3   lg:py-2 py-1 text-xs sm:text-sm  "
          onClick={handleDrop}
          disabled={loading || student.status === "Dropped" || student.status === "Transferred" || student.isActive === false}
        >
          Drop
        </Button>

      </td>
     
    </tr>
  );
};

export default Student;
