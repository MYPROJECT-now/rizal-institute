"use client";
import { SOAsStudent } from "@/src/type/CASHIER/STUDENT/student";
import {  ChangeEvent, FC } from "react";


interface Props {
SOAtodo: SOAsStudent;
currentBalance: number;
effectiveDue: number;
editing: boolean; // NEW: Controlled by parent
onChange: (month_id: number, field: "month" | "monthlyDue", value: string | number) => void;
}

const SoaTodo: FC<Props> = ({ SOAtodo, currentBalance, effectiveDue, onChange, editing }) => {

    // highlight the current month
    // const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
    // const monthString = (SOAtodo.month ?? '').toLowerCase();
    // const isCurrentMonth = monthString.includes(currentMonth);

  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "long" }).toLowerCase();
  const currentYear = now.getFullYear().toString();

  const monthString = (SOAtodo.month ?? "").toLowerCase();
  const yearString = (SOAtodo.dateOfPayment ?? "").toLowerCase();

  // Match if the row’s month matches current month and year
  const isCurrentMonthYear =
    monthString.includes(currentMonth) &&
    (yearString.includes(currentYear) || SOAtodo.month?.includes(currentYear));





    const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(SOAtodo.month_id, "month", e.target.value);    
    };

    const handleMonthDueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(SOAtodo.month_id, "monthlyDue", Number(e.target.value));
    };


    return (
        <tr className={isCurrentMonthYear  ? "bg-green-400" : "hover:bg-green-200 "}>
            <td className="border border-gray-300 p-1">
                <input 
                    type="text" 
                    value={SOAtodo.month ?? "-"}
                    onChange={handleMonthChange}
                    readOnly={!editing}
                    className={`outline-none ${editing ? "border border-gray-200 rounded px-2 py-1" : "bg-transparent"} w-full`}

                    />
                </td>
            <td className="border border-gray-300 p-1">
                <input 
                    type="text" 
                    value={SOAtodo.monthlyDue ?? "-"}
                    onChange={handleMonthDueChange}
                    readOnly={!editing}
                    className={`outline-none ${editing ? "border border-gray-200 rounded px-2 py-1" : "bg-transparent"} w-full`}
                />
            </td>
            <td className="border border-gray-300 p-1">₱{SOAtodo.amountPaid || "0"}</td>
            <td className="border border-gray-300 p-1">{SOAtodo.dateOfPayment || "-"}</td>
            <td className="border border-gray-300 p-1">{SOAtodo.SInumber || "-"}</td>
            {/* <td className="border border-gray-300 p-1">{SOAtodo.remarks || "-"}</td> */}
            <td className="border border-gray-300 p-1">₱{currentBalance < 0 ? 0 : currentBalance}</td>
            <td className="border border-gray-300 p-1">₱{effectiveDue < 0 ? 0 : effectiveDue}</td>

        </tr>
    )
}

export default SoaTodo;