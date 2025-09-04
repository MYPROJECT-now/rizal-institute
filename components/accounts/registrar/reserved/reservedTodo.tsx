"use client";

import { FC } from "react";
import { TableReserved_Type } from "@/src/type/REGISTRAR/reserved";
import { Button } from "@/components/ui/button";

interface Props {
  reserved: TableReserved_Type;
  onAdmit: (id: number, lastName: string, firstName: string, middleName: string) => void;
  className?: string;
    loading?: boolean;

}

const Reserved: FC<Props> = ({ reserved, onAdmit, className, loading }) => {

  return (
    <tr className={`border-b hover:bg-green-300 transition duration-200 ${className || ""}`}>
      <td className="px-4 py-2">{reserved.lrn}</td>
      <td className="px-4 py-2">{reserved.lastName}, {reserved.firstName} {reserved.middleName}</td>
      <td className="px-[55px] py-2">{reserved.gradeLevel}</td>
      {/* <td className="px-4 py-2 text-green-600 font-semibold">{reserved.confirmationStatus || "-"}</td> */}
      {/* <td className="px-4 py-2 text-green-600 font-semibold">{reserved.admissionStatus}</td> */}
      <td className={reserved.confirmationStatus === "Pending" ? "px-4 py-2 text-yellow-400 font-semibold" : "px-4 py-2 text-green-600 font-semibold"}>{reserved.confirmationStatus || "-"}</td>
      <td className={reserved.admissionStatus === "Pending" ? "px-4 py-2 text-yellow-400 font-semibold" : "px-4 py-2 text-green-600 font-semibold"}>{reserved.admissionStatus}</td>
      <td className="px-4 py-2">
        <Button
          className="h-[30px] w-[80px] rounded-lg"
          disabled={reserved.admissionStatus === "Enrolled" || loading || reserved.isActive === false}
          variant={"confirmButton"}
            onClick={() => onAdmit(reserved.id, reserved.lastName, reserved.firstName, reserved.middleName ?? "")}>
            {loading ? "Admitting..." : "Admit"}
          
        </Button>
      </td>


    </tr>
  );
};

export default Reserved;
