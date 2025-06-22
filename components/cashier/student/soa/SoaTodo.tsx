"use client";
import { SOAsStudent } from "@/src/type/CASHIER/STUDENT/student";
import {  FC } from "react";


interface Props {
  SOAtodo: SOAsStudent;
  
}

const SoaTodo: FC<Props> = ({ SOAtodo }) => {

    return (
        <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 p-1">{SOAtodo.month || "-"}</td>
            <td className="border border-gray-300 p-1">₱{SOAtodo.monthlyDue?.toLocaleString() || "0"}</td>
            <td className="border border-gray-300 p-1">₱{SOAtodo.amountPaid?.toLocaleString() || "0"}</td>
            <td className="border border-gray-300 p-1">{SOAtodo.dateOfPayment || "-"}</td>
            <td className="border border-gray-300 p-1">{SOAtodo.SInumber || "-"}</td>
            <td className="border border-gray-300 p-1">{SOAtodo.remarks || "-"}</td>
        </tr>
    )
}

export default SoaTodo;