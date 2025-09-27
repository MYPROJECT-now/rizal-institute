"use client";
import { FC, useState } from "react";
import { PaymentHistory } from "@/src/type/STUDENT/student";
import Todo from "./paymentHistoryTodo";
import { Button } from "@/components/ui/button";
import { PaymentReceipt } from "../receipt/receipt";
import { CashierPaymentReceipt } from "../preceipt/receipt";

interface Props {
    todos: PaymentHistory[];
}

const Todos: FC<Props> = ({ todos }) => {
    const [paymentHistoryItems] = useState<PaymentHistory[]>(todos);
    // Filter states
    const [filterDate, setFilterDate] = useState("");
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filtering logic
    const filteredItems = paymentHistoryItems.filter((item) => {
        const matchesDate = filterDate === "" || (item.dateOfPayment ? item.dateOfPayment === filterDate : false);
        return matchesDate;
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.max(1,Math.ceil(filteredItems.length / itemsPerPage));

    return (
  <div className=" flex-1 lg:min-h-0 text-xs sm:text-sm  sm:px-8 px-3 sm:py-6 py-4 sm:pt-6 text-center">
    <PaymentReceipt />
    <CashierPaymentReceipt />
    <section className="flex  flex-col sm:flex-row  items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-4">
      <label className="text-green-900 font-bold text-sm  sm:text-lg">Filter By:</label>
            <input
                type="date"
                placeholder="Date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />

            <Button
                onClick={() => {
                    setFilterDate("");
                }}
                variant={"confirmButton"}
                className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
            >
                Clear Filter
            </Button>
        </section>
            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg border border-green-300 bg-green-50">

            <table className="w-full text-sm text-center">
                <thead>
                    <tr className="bg-green-600 text-white">
                        <th className="px-4 py-2">Date</th>
                        {/* <th className="px-4 py-2">Amount</th> */}
                        <th className="px-4 py-2">Method</th>                        
                        {/* <th className="px-4 py-2">Date Verified</th> */}
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2 min-w-[150px] sm:min-w-0">Proof of Payment</th>
                        <th className="px-4 py-2 min-w-[150px] sm:min-w-0">Payment Receiept</th>

                    </tr>
                </thead>
                <tbody>
                    {currentItems.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-4 text-black">
                            No history was found.
                        </td>
                    </tr> 
                    ) : (currentItems.map((todo, idx) => (
                        <Todo 
                        key={todo.monthlyPayment_id} 
                        todo={todo} 
                        className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
/>
                        ))
                    )}
                </tbody>
            </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Todos;