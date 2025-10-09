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
      <td className="px-1 py-4">{applicants.lrn}</td>
      <td className="px-4 py-4">{applicants.lastName} {applicants.firstName} {applicants.middleName}</td>
      <td className="px-[55px] py-4">{applicants.gradeLevel}</td>
      {/* <td className="px-2 py-2">
        <Button
            className=" rounded-lg lg:px-5 px-3   lg:py-2 py-1 text-xs sm:text-sm  "
            variant={"confirmButton"}
          onClick={() => open(applicants.lrn)}
          >
            View
        </Button>
      </td> */}
      <td className="px-2 py-4"> {applicants.soaMonthId ? (
        <span className="text-green-600 font-semibold">Done</span>
          ) : (
        <span className="text-yellow-600 font-semibold">Pending</span>
        )}
      </td>

      
    </tr>
  );
};

export default Applicant;
