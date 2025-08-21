"use client";
import { FC } from "react";
import { PaymentHistory } from "@/src/type/STUDENT/student";

interface Props {
    todo: PaymentHistory;
    className?: string;
}



const Todo: FC<Props> = ({ todo, className }) => {
    return (
        <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
            <td className="px-4 py-2">{todo.dateOfPayment}</td>
            <td className="px-4 py-2">{todo.amount}</td>
            <td className="px-4 py-2">{todo.modeOfPayment}</td>
            <td className="px-4 py-2">{todo.siNumber || "-"}</td>
            <td className="px-4 py-2">{todo.dateOfVerification || "-"}</td>
            <td className= {todo.status === "Paid" ? "text-green-600 font-semibold" : "text-yellow-400 font-semibold"}>{todo.status}</td>
        </tr>
    );
}

export default Todo;