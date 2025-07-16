"use client";
import { FC } from "react";
import { VerifyPayment } from "@/src/type/CASHIER/VERIFY_PAYMENTS/verify";
import { Button } from "@/components/ui/button";
import { acceptPayment, declinePayment } from "@/src/actions/cashierAction";

interface Props {
  VerifyTodo: VerifyPayment;
  onAccept: (month_id: number | null, monthlyPayment_id: number) => void;
  onDecline: (month_id: number | null, monthlyPayment_id: number) => void;
}

const VerifyTodo: FC<Props> = ({ VerifyTodo, onAccept, onDecline }) => {

    const handleAccept = () => {
        onAccept(VerifyTodo.month_id, VerifyTodo.monthlyPayment_id);
        acceptPayment(VerifyTodo.monthlyPayment_id, VerifyTodo?.month_id || 0, VerifyTodo.amount);
    };

    const handleDecline = () => {
        onDecline(VerifyTodo.month_id, VerifyTodo.monthlyPayment_id);
        declinePayment(VerifyTodo.monthlyPayment_id);
    };


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
                    variant="acceptButton"
                    className="h-[30px] w-[80px] rounded-lg"
                    onClick={handleAccept}
                    disabled={VerifyTodo.status === "Approved" || VerifyTodo.status === "Declined" || VerifyTodo.isActive === false}
                >
                    Approve
                </Button>
                <Button
                    variant="rejectButton"
                    className="h-[30px] w-[80px] rounded-lg"
                    onClick={handleDecline}
                    disabled={VerifyTodo.status === "Approved" || VerifyTodo.status === "Declined" || VerifyTodo.isActive === false}
                >
                    Decline
                </Button>
            </td>
        </tr>
    );
};

export default VerifyTodo;