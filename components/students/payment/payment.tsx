"use client";
import { Button } from "@/components/ui/button";

export const PaymentPage = () => {
    const outstandingBalance = 1500;

    const allTransactions = [
        {
            date: "2024-09-16",
            amount: 1500,
            method: "Cash",
            siNumber: "0032839",
            remarks: "OTC - RI",
        },
        {
            date: "2024-10-16",
            amount: 1500,
            method: "Bank",
            siNumber: "0032870",
            remarks: "Bank Transfer",
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Section 1: Balance Summary */}
            <div className="text-xl font-bold text-dGreen">Tuition Balance</div>
            <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between">
                <div className="text-lg font-semibold">
                    Outstanding Balance: <span className="text-red-600">₱{outstandingBalance.toLocaleString()}</span>
                </div>
                <Button variant="mButton" className="px-6 py-3 text-white">
                    Pay Now
                </Button>
            </div>

            {/* Section 2: Fake Filter UI */}
            <div className="bg-white p-4 rounded-lg flex flex-wrap gap-4 items-center">
                <input type="date" className="border border-gray-400 p-2 rounded" disabled />
                <input type="date" className="border border-gray-400 p-2 rounded" disabled />
                <input type="text" placeholder="SI Number" className="border border-gray-400 p-2 rounded" disabled />
                <select className="border border-gray-400 p-2 rounded" disabled>
                    <option value="">All Methods</option>
                    <option value="GCash">GCash</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                </select>
                <Button variant="mButton" className="text-white px-6 rounded-lg">
                    Clear Filter
                </Button>
            </div>

            {/* Section 3: Transaction History */}
            <div className="text-xl font-bold text-dGreen">Transaction History</div>
            <table className="w-full border-collapse border border-green-600 text-center">
                <thead>
                    <tr className="bg-green-600 text-white">
                        <th className="border border-green-600 p-2">Date</th>
                        <th className="border border-green-600 p-2">Amount</th>
                        <th className="border border-green-600 p-2">Method</th>
                        <th className="border border-green-600 p-2">SI Number</th>
                        <th className="border border-green-600 p-2">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {allTransactions.length > 0 ? (
                        allTransactions.map((tx, index) => (
                            <tr key={index} className="border border-green-600">
                                <td className="border border-green-600 p-2">{tx.date}</td>
                                <td className="border border-green-600 p-2">₱{tx.amount.toLocaleString()}</td>
                                <td className="border border-green-600 p-2">{tx.method}</td>
                                <td className="border border-green-600 p-2">{tx.siNumber || "—"}</td>
                                <td className="border border-green-600 p-2">{tx.remarks}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="p-4">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
