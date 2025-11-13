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

  // const getDocumentStatus = (document: all_studentTable_Type) => {
  //   if (
  //     document.hasBirth && document.hasReportCard && document.hasGoodMoral && document.hasIdPic && document.hasExitForm && document.hasForm137
  //   ) {
  //     return "Complete";
  //   }

  //   if ( document.hasBirth || document.hasReportCard || document.hasGoodMoral || document.hasIdPic || document.hasExitForm ||document.hasForm137
  //   ) {
  //     return "Incomplete";
  //   }

  //   return "None";
  // };
const getDocumentStatus = (s: all_studentTable_Type) => {
  // define all possible document fields to avoid typos
  const docs = {
    birth: s.hasBirth,
    reportCard: s.hasReportCard,
    goodMoral: s.hasGoodMoral,
    idPic: s.hasIdPic,
    form137: s.hasForm137,
    exitForm: s.hasExitForm,
    itr: s.hasITR,        
    escCert: s.hasEscCert,  
  };

  // figure out which docs are required
  let requiredDocs: (keyof typeof docs)[] = [];

  if (s.studentType === "Incoming G7" && s.schoolType === "Public") {
    requiredDocs = ["birth", "reportCard", "goodMoral", "idPic", "form137", "itr"];
  } 
  else if (s.studentType === "Incoming G7" &&  s.schoolType === "Private") {
    requiredDocs = ["birth", "reportCard", "goodMoral", "idPic", "form137", "itr", "exitForm"];
  } 
  else if (s.schoolType === "Private" && s.studentType === "Transferee" && s.escGrantee === "Yes") {
    requiredDocs = ["birth", "reportCard", "goodMoral", "idPic", "form137", "exitForm", "escCert"];
  } 
  else if ((s.schoolType === "Private" || s.schoolType === "Public") && s.studentType === "Transferee") {
    requiredDocs = ["birth", "reportCard", "goodMoral", "idPic", "form137", "exitForm"];
  }

  // check completeness
  const hasAll = requiredDocs.every((key) => docs[key]);
  if (hasAll) return "Complete";

  // check if some docs are submitted
  const hasSome = requiredDocs.some((key) => docs[key]);
  if (hasSome) return "Incomplete";

  return "None";
};

  const fullName = `${student.studentFirstName} ${student.studentMiddleName ?? ""} ${student.studentLastName}`;

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.lrn || "..."}</td>
      <td className=" py-2">{fullName}</td>
      <td className="px-[55px] py-2">{student.gradeLevel}</td>
      <td className={ getDocumentStatus(student) === "Complete" ? "text-green-700 font-semibold" : getDocumentStatus(student) === "Incomplete" ? "text-yellow-600 font-semibold" : "text-red-600 font-semibold"}>
        {getDocumentStatus(student)}
      </td>    
      <td className={student.status === "Dropped_Out" ? "px-4 py-2 text-red-600 font-semibold" : student.status === "Transferred_Out" ? "px-4 py-2 text-red-600 font-semibold" : "px-4 py-2 text-green-600 font-semibold"}>{student.status === "Dropped_Out" ? "Dropped Out" : student.status === "Transferred_Out" ? "Transferred Out" : "Enrolled"}</td>
      <td className="px-4 py-2">
        <Button 
          variant="confirmButton"
          className=" rounded-lg lg:px-5 px-3   lg:py-2 py-1 text-xs sm:text-sm  "
          onClick={() => openEnrollees(student.lrn)}>
            View
          </Button>
      </td>

      <td className="py-2 px-2 flex gap-2 justify-center">
        <Button
          variant="rejectButton"
          className=" rounded-lg lg:px-5 px-3   lg:py-2 py-1 text-xs sm:text-sm  "
          onClick={handleTransfer}
          disabled={loading || student.status === "Dropped" || student.status === "Transferred" || student.isActive === false}
        >
          Transfer Out
        </Button>
        
        <Button
          variant="rejectButton"
          className=" rounded-lg lg:px-5 px-3   lg:py-2 py-1 text-xs sm:text-sm  "
          onClick={handleDrop}
          disabled={loading || student.status === "Dropped" || student.status === "Transferred" || student.isActive === false}
        >
          Drop Out
        </Button>

      </td>
     
    </tr>
  );
};

export default Student;
