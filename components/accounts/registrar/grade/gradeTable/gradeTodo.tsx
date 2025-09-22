"use client";

import { FC, } from "react";

import { Grade_Type,  } from "@/src/type/REGISTRAR/applicant";
import {  useShowApplicantInfoModal } from "@/src/store/REGISTRAR/applicant";
import { Button } from "@/components/ui/button";

interface Props {
  grade: Grade_Type;
  className?: string;
}

const Grade: FC<Props> = ({ grade, className, }) => {
  const { open: openEnrollees } = useShowApplicantInfoModal();




  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
      <td className="px-4 py-2">{grade.lrn}</td>
      <td className="px-4 py-2">{grade.studentLastName} {grade.studentFirstName} {grade.studentMiddleName}</td>
      <td className="px-4 py-2">
        <Button 
          variant={"confirmButton"}
          className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  "
          onClick={() => openEnrollees(grade.lrn)}>
            View
          </Button>
      </td>
      <td>
        -
      </td>  
    </tr>
  );
};

export default Grade;
