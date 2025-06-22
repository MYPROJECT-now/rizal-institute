"use client";

import { FC } from "react";
import { TableReserved_Type } from "@/src/type/REGISTRAR/reserved";

interface Props {
  reserved: TableReserved_Type;
  onAdmit: (id: number) => void;
}

const Reserved: FC<Props> = ({ reserved, onAdmit }) => {

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{reserved.lrn}</td>
      <td className="px-4 py-2">{reserved.lastName} {reserved.firstName} {reserved.middleName}</td>
      <td className="px-4 py-2">{reserved.gradeLevel}</td>
      <td className="px-4 py-2">Accepted</td>
      <td className="px-4 py-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => onAdmit(reserved.id)}>
            Admit
        </button>
      </td>


    </tr>
  );
};

export default Reserved;
