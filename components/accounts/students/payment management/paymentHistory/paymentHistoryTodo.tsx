"use client";
import { FC } from "react";
import { PaymentHistory } from "@/src/type/STUDENT/student";
import { Button } from "@/components/ui/button";
import { PaymentReceipt } from "../receipt/receipt";
import { useShowMonthlyPayementModal } from "@/src/store/CASHIER/student";

interface Props {
    todo: PaymentHistory;
    className?: string;
}



const Todo: FC<Props> = ({ todo, className }) => {
    const { open:openPayment } = useShowMonthlyPayementModal();
    
    return (
        <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
            <td className="px-4 py-2">{todo.dateOfPayment}</td>
            <td className="px-4 py-2">{todo.amount}</td>
            <td className="px-4 py-2">{todo.modeOfPayment}</td>
            <td className="px-4 py-2">{todo.dateOfVerification || "-"}</td>
            <td className= {todo.status === "Approved" ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>{todo.status}</td>
            <td className="px-4 py-2">
                <PaymentReceipt />
                <Button 
                className="w-[65px] h-[35px] rounded-lg"
                variant={"confirmButton"}
                onClick={() => openPayment(todo.monthlyPayment_id ?? 0)}
                >
                    View
                </Button> 
            </td>

        </tr>
    );
}

export default Todo;