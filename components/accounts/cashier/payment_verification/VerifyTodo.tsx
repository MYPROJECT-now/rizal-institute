"use client";
import { FC, } from "react";
import { VerifyPayment } from "@/src/type/CASHIER/VERIFY_PAYMENTS/verify";
import { Button } from "@/components/ui/button";
import { useShowMonthlyPayementModal } from "@/src/store/CASHIER/student";

interface Props {
    VerifyTodo: VerifyPayment;
    onAccept: (month_id: number, amount: number, dateOfPayment: string) => void;
    onDecline: (month_id: number, lrn: string) => void;
    loading?: boolean;

}

const VerifyTodo: FC<Props> = ({ VerifyTodo, onDecline, onAccept, loading }) => {
    const { open:openPayment } = useShowMonthlyPayementModal();
    // const { open:sendReceipt } = useShowPaymentReceiptModal();

    const handleAccept = async () => {
        onAccept(VerifyTodo.month_id ?? 0, VerifyTodo.amount, VerifyTodo.dateOfPayment ?? "");
    };

    const handleDecline = () => {
        onDecline(VerifyTodo.month_id ?? 0, VerifyTodo.lrn ?? "");
    };


    return (
        <tr className="border-b">
            {/* <td className="px-4 py-2">{VerifyTodo.SInumber}</td> */}
            <td className="px-4 py-2">
                <Button 
                    className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
                    variant={"confirmButton"}
                    onClick={() => openPayment(VerifyTodo.monthlyPayment_id)}
                >
                    View
                </Button> 
            </td>
            <td className="px-4 py-2">{VerifyTodo.lrn}</td>
            <td className="px-4 py-2">{VerifyTodo.modeOfPayment}</td>
            <td className="px-4 py-2">{VerifyTodo.dateOfPayment}</td>
            <td className={VerifyTodo.status === "Approved" ? "px-4 py-2 text-green-600 font-semibold" : VerifyTodo.status === "Pending " ? "px-4 py-2 text-red-600 font-semibold" : "px-4 py-2 text-yellow-600 font-semibold"}>{VerifyTodo.status}</td>
            <td className="px-4 py-2 space-x-2">
                <Button
                    variant="acceptButton"
                    className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
                    onClick={handleAccept}
                    disabled={VerifyTodo.status === "Approved" || VerifyTodo.status === "Declined" || VerifyTodo.isActive === false || loading}
                >
                    Approve
                </Button>
                <Button
                    variant="rejectButton"
                    className=" rounded-lg sm:px-5 px-3  py-2 text-xs sm:text-sm  "
                    onClick={handleDecline}
                    disabled={VerifyTodo.status === "Approved" || VerifyTodo.status === "Declined" || VerifyTodo.isActive === false || loading}
                >
                    Decline
                </Button>
            </td>
        </tr>
    );
};

export default VerifyTodo;