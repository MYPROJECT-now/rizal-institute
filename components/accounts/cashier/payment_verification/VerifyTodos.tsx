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
    const [filterMop, setFilterMop] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredData = verifyTodos.filter((payment) => {
        const MatchMop = (payment.modeOfPayment ?? "").includes(filterMop);
        const MatchDate = (payment.dateOfPayment ?? "").includes(filterDate);
        const MatchStatus = (payment.status ?? "").includes(filterStatus);

        return  MatchMop && MatchDate && MatchStatus;
    });

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
    <main className=" min-h-[600px] lg:min-h-0 text-xs sm:text-sm   w-full  px-8 py-6 sm:pt-6 text-center">

    <div className="flex  flex-col sm:flex-row  items-start sm:items-center gap-1 sm:gap-3 lg:gap-4 mb-4">
      <label className="text-green-900 font-bold text-xs  sm:text-lg">Filter By:</label>


        <select
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
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
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
        />
        
        <select
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
        >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
        </select>

        <Button
            onClick={() => {
                setFilterMop("");
                setFilterDate("");
                setFilterStatus("");
            }}
    className=" rounded-lg text-xs sm:text-sm  xl:px-5 px-3 lg:py-5 py-4 sm:mt-0 mt-2   "
            variant={"confirmButton"}
        >
            Clear Filter
        </Button>
    </div>

<div className=" overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">
  <table className="w-full text-xs sm:text-sm text-center">
        <thead>
            <tr className="bg-green-600 text-white">
                {/* <th className="px-4 py-2">SI Number</th> */}
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
                    // onAccept={() => {}}
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
    </div>
</main>
    );
};

export default VerifyTodos;