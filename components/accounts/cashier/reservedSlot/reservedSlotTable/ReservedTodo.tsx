"use client";

import { FC } from "react";
import { reservedSlotType } from "@/src/type/CASHIER/RESERVED/reserved";


interface Props {
  applicants: reservedSlotType;
  className?: string;
}

const Applicant: FC<Props> = ({ applicants, className }) => {
  
  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
      <td className="px-1 py-2">{applicants.lrn}</td>
      <td className="px-4 py-2">{applicants.lastName} {applicants.firstName} {applicants.middleName}</td>
      <td className="px-2 py-2">{applicants.gradeLevel}</td>
      <td className="px-2 py-2">-</td>
      <td className={applicants.admissionStatus === "Enrolled" ? "px-2 py-2 text-green-600 font-semibold" : "px-2 py-2 text-yellow-600 font-semibold"}>{applicants.admissionStatus}</td>
      <td className="px-2 py-2"> {applicants.soaMonthId ? (
        <span className="text-green-600 font-semibold">Done</span>
          ) : (
        <span className="text-yellow-300 font-semibold">Pending</span>
        )}
      </td>

      
    </tr>
  );
};

export default Applicant;
