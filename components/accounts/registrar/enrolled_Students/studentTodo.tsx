"use client";

import { FC } from "react";
import { Students_info_Modal } from "./student_modal";
import { all_studentTable_Type } from "@/src/type/REGISTRAR/student";
import { useTableStudentModal } from "@/src/store/REGISTRAR/student";
import { Button } from "@/components/ui/button";

interface Props {
  student: all_studentTable_Type;
  transferStudent: (status: string, lrn: string) => void;
  dropStudent: (status: string, lrn: string) => void;
  loading?: boolean;
}


const Student: FC<Props> = ({ student, transferStudent, dropStudent, loading  }) => {
  const { open: openEnrollees } = useTableStudentModal();
  
  const handleTransfer = async () => {
    transferStudent(student.status ?? "", student.lrn);
  }

  const handleDrop = async () => {
    dropStudent(student.status ?? "", student.lrn);
  }

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn || "..."}</td>
      <td className="px-4 py-2">{student.studentLastName}, {student.studentFirstName} {student.studentMiddleName}</td>
      <td className="px-4 py-2">{student.gradeLevelName}</td>
      <td className={student.status === "Enrolled" ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}> {student.status}</td>
      <td className="px-4 py-2">
        <Students_info_Modal />
        <Button 
          variant="confirmButton"
          className="w-[100px] h-[40px] rounded-xl"
          onClick={() => openEnrollees(student.lrn)}>
            View
          </Button>
      </td>
      <td className=" py-2 space-x-2">
        <Button
          variant="rejectButton"
          className="w-[100px] h-[40px] rounded-xl"
          onClick={handleTransfer}
          disabled={loading || student.status === "Dropped" || student.status === "Transferred"}
        >
          Transfer
        </Button>
        
        <Button
          variant="rejectButton"
          className="w-[100px] h-[40px] rounded-xl"
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
