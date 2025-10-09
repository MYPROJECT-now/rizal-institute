"use client";

import { FC, } from "react";

import { Grade_Type,  } from "@/src/type/REGISTRAR/applicant";
import {  useShowApplicantInfoModal } from "@/src/store/REGISTRAR/applicant";
import { Button } from "@/components/ui/button";

interface Props {
  grade: Grade_Type;
  className?: string;
  status: string; // or "Passed" | "Summer" | "Retained" | "N/A"

}

const Grade: FC<Props> = ({ grade, className, status }) => {
  const { open: openEnrollees } = useShowApplicantInfoModal();




  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
      <td className="px-4 py-2">{grade.lrn}</td>
      <td className="px-4 py-2">{grade.studentLastName} {grade.studentFirstName} {grade.studentMiddleName}</td>
      <td className="px-4 py-2">
        <Button 
          variant={"confirmButton"}
          className=" rounded-lg lg:px-5 px-3   lg:py-2 py-1 text-xs sm:text-sm  "
          onClick={() => openEnrollees(grade.lrn)}>
            View
          </Button>
      </td>
      <td className={status === "Summer" ? "px-4 py-2 text-yellow-600 font-semibold" : status === "Retained" ? "px-4 py-2 text-red-600 font-semibold" : "px-4 py-2 text-green-600 font-semibold"}>
        {status}
      </td>  
    </tr>
  );
};

export default Grade;
