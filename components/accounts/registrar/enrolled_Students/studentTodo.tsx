"use client";

import { FC } from "react";
import { Students_info_Modal } from "./student_modal";
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

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn || "..."}</td>
      <td className="px-4 py-2">{student.studentLastName}, {student.studentFirstName} {student.studentMiddleName}</td>
      <td className="px-[55px] py-2">{student.gradeLevelName}</td>
      <td className={student.status === "Enrolled" ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}> {student.status}</td>
      <td className="px-4 py-2">
        <Students_info_Modal />
        <Button 
          variant="confirmButton"
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
          onClick={() => openEnrollees(student.lrn)}>
            View
          </Button>
      </td>
      <td className=" py-2 space-x-2 flex gap-2">
        <Button
          variant="rejectButton"
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
          onClick={handleTransfer}
          disabled={loading || student.status === "Dropped" || student.status === "Transferred"}
        >
          Transfer
        </Button>
        
        <Button
          variant="rejectButton"
          className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
          onClick={handleDrop}
          disabled={loading || student.status === "Dropped" || student.status === "Transferred"}
        >
          Drop
        </Button>

      </td>
     
    </tr>
  );
};

export default Student;
