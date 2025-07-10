"use client";
import { SOAsStudent } from "@/src/type/CASHIER/STUDENT/student";
import {  FC } from "react";


interface Props {
  SOAtodo: SOAsStudent;
  currentBalance: number;
  effectiveDue: number;
}

const SoaTodo: FC<Props> = ({ SOAtodo, currentBalance, effectiveDue }) => {

    // highlight the current month
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
    const monthString = (SOAtodo.month ?? '').toLowerCase();
    const isCurrentMonth = monthString.includes(currentMonth);

    return (
        <tr className={isCurrentMonth ? "bg-green-400" : "hover:bg-green-200 "}>
            <td className="border border-gray-300 p-1">{SOAtodo.month || "-"}</td>
            <td className="border border-gray-300 p-1">₱{SOAtodo.monthlyDue || "0"}</td>
            <td className="border border-gray-300 p-1">₱{SOAtodo.amountPaid || "0"}</td>
            <td className="border border-gray-300 p-1">{SOAtodo.dateOfPayment || "-"}</td>
            <td className="border border-gray-300 p-1">{SOAtodo.SInumber || "-"}</td>
            <td className="border border-gray-300 p-1">{SOAtodo.remarks || "-"}</td>
            <td className="border border-gray-300 p-1">₱{currentBalance < 0 ? 0 : currentBalance}</td>
            <td className="border border-gray-300 p-1">₱{effectiveDue < 0 ? 0 : effectiveDue}</td>
        </tr>
    )
}

export default SoaTodo;