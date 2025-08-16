"use client";
import { FC, useState } from "react";
import { VerifyPayment } from "@/src/type/CASHIER/VERIFY_PAYMENTS/verify";
import VerifyTodo from "./VerifyTodo";
import { Button } from "@/components/ui/button";

interface Props {
  VerifyTodos: VerifyPayment[];
}

const VerifyTodos: FC<Props> = ({ VerifyTodos }) => {
    const [verifyTodos] = useState<VerifyPayment[]>(VerifyTodos);
    const [filterSiNumber, setFilterSiNumber] = useState("");
    const [filterMop, setFilterMop] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredData = verifyTodos.filter((payment) => {
        const MatchSiNumber = (payment.SInumber ?? "").includes(filterSiNumber);
        const MatchMop = (payment.modeOfPayment ?? "").includes(filterMop);
        const MatchDate = (payment.dateOfPayment ?? "").includes(filterDate);
        const MatchStatus = (payment.status ?? "").includes(filterStatus);

        return MatchSiNumber && MatchMop && MatchDate && MatchStatus;
    });

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <main className="mx-auto max-w-8xl w-full p-8 text-center">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <label className="text-green-900 font-bold text-lg">Filter By:</label>
                
                <input
                    type="text"
                    placeholder="SI Number"
                    className="border-2 border-gray-300 rounded px-1 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    value={filterSiNumber}
                    onChange={(e) => setFilterSiNumber(e.target.value)}
                />

                <select
                    className="border-2 border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    value={filterMop}
                    onChange={(e) => setFilterMop(e.target.value)}
                >
                    <option value="">Mode of Payment</option>
                    <option value="GCash">GCash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="OTC">OTC</option>
                </select>

                <input
                    type="date"
                    className="border-2 border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
                
                <select
                    className="border-2 border-gray-300 rounded px-5 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                </select>

                <Button
                    onClick={() => {
                        setFilterSiNumber("");
                        setFilterMop("");
                        setFilterDate("");
                        setFilterStatus("");
                    }}
                    className="px-4 py-2"
                    variant={"confirmButton"}
                >
                    Clear Filter
                </Button>
            </div>

          <div className="overflow-x-auto shadow-lg rounded-lg border border-green-300 bg-green-50">
        <table className="w-full text-sm text-center">
                <thead>
                    <tr className="bg-green-600 text-white">
                        <th className="px-4 py-2">SI Number</th>
                        <th className="px-4 py-2">Proof of Payment</th>
                        <th className="px-4 py-2">Mode of Payment</th>
                        <th className="px-4 py-2">Date of Payment</th>
                        <th className="px-4 py-2">Status</th>
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
                            onAccept={() => {}}
                            onDecline={() => {}}
                        />
                    ))
                )}
                </tbody>
            </table>
</div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 gap-4">
                <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1"
                    variant={"prevButton"}
                >
                    Previous
                </Button>
                <span className="font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1"
                    variant={"prevButton"}
                >
                    Next
                </Button>
            </div>
        </main>
    );
};

export default VerifyTodos;