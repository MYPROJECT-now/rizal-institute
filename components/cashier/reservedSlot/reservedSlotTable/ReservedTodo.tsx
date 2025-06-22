"use client";

import { FC } from "react";
import { reservedSlotType } from "@/src/type/CASHIER/RESERVED/reserved";


interface Props {
  applicants: reservedSlotType;
  onAccept: (id: number) => void;
}

const Applicant: FC<Props> = ({ applicants  }) => {
  
  return (
    <tr className="border-b text-center">
      <td className="px-1 py-2">{applicants.lrn}</td>
      <td className="px-4 py-2">{applicants.lastName} {applicants.firstName} {applicants.middleName}</td>
      <td className="px-2 py-2">{applicants.gradeLevel}</td>
      <td className="px-2 py-2">High Honor</td>
      
    </tr>
  );
};

export default Applicant;
