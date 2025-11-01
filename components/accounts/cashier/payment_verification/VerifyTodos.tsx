"use client";
import { FC, useState } from "react";
import { VerifyPayment } from "@/src/type/CASHIER/VERIFY_PAYMENTS/verify";
import VerifyTodo from "./VerifyTodo";
import { Button } from "@/components/ui/button";
import { StudentsPaymentReceipt } from "./payment_receipt/cashiers_receipt";
import { ApprovedMonth, declinePayment } from "@/src/actions/cashierAction";
import { toast } from "sonner";
import { StudentsPaymentReview } from "./payment_receipt/student_payment";
import { useCashPaymentModal } from "@/src/store/CASHIER/montly";
import { CashPayment } from "./cashPayment/cash_payment";

interface Props {
  VerifyTodos: VerifyPayment[];
}

const VerifyTodos: FC<Props> = ({ VerifyTodos }) => {
    const [verifyTodos, setVerifyTodos] = useState<VerifyPayment[]>(VerifyTodos);
    const [filterDate, setFilterDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterLRN, setFilterLRN] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const { open } = useCashPaymentModal();

    // const { open } = useAddPaymentModal();

    const itemsPerPage = 5;

    const filteredData = verifyTodos.filter((payment) => {
        const MatchDate = (payment.dateOfPayment ?? "").includes(filterDate);
        const MatchStatus = (payment.status ?? "").includes(filterStatus);
        const MatchLrn = (payment.lrn ?? "").includes(filterLRN);
    return   MatchDate && MatchStatus && MatchLrn;
    });

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handleAccept = async (month_id: number, amounts: number, dateOfPayment: string) => {
      setLoadingId(month_id);

        try {
            await ApprovedMonth(month_id, amounts, dateOfPayment );
            setVerifyTodos((prev) => prev.map((payment) => (payment.month_id === month_id ? { ...payment, status: "Approved" } : payment)));
            toast.success("Students Payment was Approved");
        } catch (error) {
            toast.error("Failed to approve payment. Please try again.");
            console.error(error);
        }
        finally {
        setLoadingId(null);
        }
    }

    const handleDecline = async (month_id: number,  lrn: string) => {
        setLoadingId(month_id);
        try {
            await declinePayment(month_id, lrn);
            setVerifyTodos((prev) => prev.map((payment) => (payment.month_id === month_id ? { ...payment, status: "Declined" } : payment)));
            toast.success("Students Payment was Declined");
        } catch (error) {
            toast.error("Failed to decline payment. Please try again.");
            console.error(error);
        }
        finally {
        setLoadingId(null);
        }
    }

    return (
    <div className=" flex-1 lg:min-h-0 text-xs sm:text-sm  sm:px-8 px-3 sm:py-6 py-4 sm:pt-6 text-center">
    <StudentsPaymentReceipt />
    <StudentsPaymentReview />
    <CashPayment/>

        <section className="flex  flex-col sm:flex-row  items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-4">
        <label className="text-green-900 font-bold text-sm  sm:text-lg">Filter By:</label>

        <input
        type="text"
        placeholder="LRN"
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[180px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
        value={filterLRN}
        onChange={(e) => setFilterLRN(e.target.value)}
        />
        


        <input
        type="date"
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[180px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        />
        
        <select
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[180px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
            <option value="Approved">Approved</option>
        </select>

        <Button
            onClick={() => {
                setFilterDate("");
                setFilterStatus("");
                setFilterLRN("");
            }}
            className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
            variant={"confirmButton"}
        >
            Clear Filter
        </Button>

        <Button
            className=" rounded-lg px-4  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
            variant={"confirmButton"}
            onClick={open}
        >
            Cash Payment
        </Button>
    </section>

    <section className=" overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">
        <table className="w-full text-xs sm:text-sm text-center">
            <thead>
                <tr className="bg-green-600 text-white">
                    {/* <th className="px-4 py-2">SI Number</th> */}
                    <th className="px-4 py-2 min-w-[140px] sm:min-w-0">LRN</th>
                    <th className="px-4 py-2 min-w-[140px] sm:min-w-0">Mode of Payment</th>
                    <th className="px-4 py-2 min-w-[130px] sm:min-w-0">Date of Payment</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2 min-w-[140px] sm:min-w-0">Proof of Payment</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentData.length === 0 ? (
                    <tr>
                    <td colSpan={7} className="p-4 text-black">
                    No payments found.
                    </td>
                </tr>
                ) : (
                currentData.map((verifyTodo) => (
                    <VerifyTodo 
                        key={verifyTodo.monthlyPayment_id} 
                        VerifyTodo={verifyTodo} 
                        onAccept={handleAccept}
                        onDecline={handleDecline}
                        loading={loadingId === verifyTodo.monthlyPayment_id}

                    />
                ))
            )}
            </tbody>
        </table>
        </section>
        {/* Pagination Controls */}
        <section className="flex justify-center items-center mt-4 gap-4">
            <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            className="sm:px-5 px-3 sm:py-5 py-2 rounded-lg text-xs sm:text-sm  "
                variant={"prevButton"}
            >
                Previous
            </Button>

            <span className="font-semibold flex items-center">
                Page {currentPage} of {totalPages}
            </span>

            <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
            className="sm:px-5 px-3 sm:py-5 py-2 rounded-lg text-xs sm:text-sm  "
                variant={"prevButton"}
            >
                Next
            </Button>
        </section>
    </div>
    );
};

export default VerifyTodos;