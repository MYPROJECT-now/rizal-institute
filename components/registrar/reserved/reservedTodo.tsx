"use client";

import { FC } from "react";
import { TableReserved_Type } from "@/src/type/REGISTRAR/reserved";
import { Button } from "@/components/ui/button";

interface Props {
  reserved: TableReserved_Type;
  onAdmit: (id: number) => void;
  className?: string;
}

const Reserved: FC<Props> = ({ reserved, onAdmit, className }) => {

  return (
    <tr className={`border-b hover:bg-green-300 transition duration-200 ${className || ""}`}>
      <td className="px-4 py-2">{reserved.lrn}</td>
      <td className="px-4 py-2">{reserved.lastName} {reserved.firstName} {reserved.middleName}</td>
      <td className="px-4 py-2">{reserved.gradeLevel}</td>
      <td className="px-4 py-2">{reserved.confirmationStatus || "-"}</td>
      <td className="px-4 py-2">{reserved.admissionStatus}</td>
      <td className="px-4 py-2">
        <Button
          className="h-[30px] w-[80px] rounded-lg"
          variant={"confirmButton"}
            onClick={() => onAdmit(reserved.id)}>
            Admit
        </Button>
      </td>


    </tr>
  );
};

export default Reserved;
