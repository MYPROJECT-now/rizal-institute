"use client";
import { FC } from "react";
import { VerifyPayment } from "@/src/type/CASHIER/VERIFY_PAYMENTS/verify";
import { Button } from "@/components/ui/button";

interface Props {
  VerifyTodo: VerifyPayment;
}

const VerifyTodo: FC<Props> = ({ VerifyTodo }) => {
    return (
        <tr className="border-b">
            <td className="px-4 py-2">{VerifyTodo.amount}</td>
            <td className="px-4 py-2">{VerifyTodo.SInumber}</td>
            <td className="px-4 py-2">-</td>
            <td className="px-4 py-2">{VerifyTodo.modeOfPayment}</td>
            <td className="px-4 py-2">{VerifyTodo.dateOfPayment}</td>
            <td className="px-4 py-2 text-green-700 font-semibold">{VerifyTodo.status}</td>
            <td className="px-4 py-2 space-x-2">
                <Button
                    variant="outline"
                    className="bg-dGreen text-white"
                >Approve</Button>
                <Button
                    variant="outline"
                    className="bg-red-500 text-white"
                >Decline</Button>
            </td>
        </tr>
    );
};

export default VerifyTodo;