"use client";
import { FC, useState } from "react";
import { PaymentHistory } from "@/src/type/STUDENT/student";
import Todo from "./paymentHistoryTodo";
import { Button } from "@/components/ui/button";

interface Props {
    todos: PaymentHistory[];
}

const Todos: FC<Props> = ({ todos }) => {
    const [paymentHistoryItems] = useState<PaymentHistory[]>(todos);
    // Filter states
    const [filterDate, setFilterDate] = useState("");
    const [filterSINumber, setFilterSINumber] = useState("");
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filtering logic
    const filteredItems = paymentHistoryItems.filter((item) => {
        const matchesDate = filterDate === "" || (item.dateOfPayment ? item.dateOfPayment === filterDate : false);
        const matchesSINumber = filterSINumber === "" || (item.siNumber ? item.siNumber.includes(filterSINumber) : false);
        return matchesDate && matchesSINumber;
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.max(1,Math.ceil(filteredItems.length / itemsPerPage));

    return (
        <main className="w-full text-center">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <label className="text-green-900 font-bold text-lg">Filter By:</label>
                <input
                    type="date"
                    placeholder="Date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                />
                <input
                    type="text"
                    placeholder="SI Number"
                    value={filterSINumber}
                    onChange={(e) => setFilterSINumber(e.target.value)}
                    className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                />
                <Button
                    onClick={() => {
                        setFilterDate("");
                        setFilterSINumber("");
                    }}
                    variant={"confirmButton"}
                    className="h-[40px] w-[110px] rounded-xl"
                >
                    Clear Filter
                </Button>
            </div>
            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg border border-green-300 bg-green-50">
            <table className="w-full text-sm text-center">
                <thead>
                    <tr className="bg-green-600 text-white">
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Method</th>                        
                        <th className="px-4 py-2">SI Number</th>
                        <th className="px-4 py-2">Date of Verification</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="p-4 text-black">
                            No recent applicants found.
                        </td>
                    </tr> 
                    ) : (currentItems.map((todo, idx) => (
                        <Todo 
                        key={todo.month_id} 
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
        </main>
    );
}

export default Todos;