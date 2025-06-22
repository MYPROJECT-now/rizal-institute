"use client";
import { FC, useState } from "react";
import { VerifyPayment } from "@/src/type/CASHIER/VERIFY_PAYMENTS/verify";
import VerifyTodo from "./VerifyTodo";

interface Props {
  VerifyTodos: VerifyPayment[];
}

const VerifyTodos: FC<Props> = ({ VerifyTodos }) => {
    const [verifyTodos] = useState<VerifyPayment[]>(VerifyTodos);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredData = verifyTodos.filter((item) => {
        const matchesSearch = 
            item.SInumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.modeOfPayment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.amount.toString().includes(searchTerm);
        
        return matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <main className="mx-auto max-w-8xl w-full p-8 text-center">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <label className="text-green-900 font-bold text-lg">Filter By:</label>
                
                <input
                    type="text"
                    placeholder="Search by SI Number, Payment Mode, or Amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-3 py-1"
                />
                
                <button
                    onClick={() => {
                        setSearchTerm("");
                        setCurrentPage(1);
                    }}
                    className="bg-green-700 text-white font-bold px-4 py-1 rounded hover:bg-green-800"
                >
                    Clear Filter
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-green-600 text-white">
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">SI Number</th>
                        <th className="px-4 py-2">Proof of Payment</th>
                        <th className="px-4 py-2">Mode of Payment</th>
                        <th className="px-4 py-2">Date of Payment</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((verifyTodo) => (
                        <VerifyTodo 
                            key={verifyTodo.monthlyPayment_id} 
                            VerifyTodo={verifyTodo} 
                        />
                    ))}
                </tbody>
            </table>

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
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </main>
    );
};

export default VerifyTodos;