// import { Button } from "@/components/ui/button";

// export const PaymentPage = () => {
//     const outstandingBalance = 2000;

//     const transactionHistory = [
//         {
//             orNo: "000123",
//             date: "2025-03-01",
//             amount: 3000,
//             method: "GCASH",
//             refNo: "GC123456",
//             remarks: "Initial Payment",
//         },
//         {
//             orNo: "000124",
//             date: "2025-04-01",
//             amount: 2000,
//             method: "Cash",
//             refNo: "-",
//             remarks: "Cash at cashier",
//         },
//     ];

//     return (
//         <div className="flex flex-col gap-6 p-6">
//             {/* Section 1: Balance Summary */}
//             <div className="text-xl font-bold text-dGreen">Tuition Balance</div>
//             <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between">
//                 <div className="text-lg font-semibold">
//                     Outstanding Balance: <span className="text-red-600">₱{outstandingBalance.toLocaleString()}</span>
//                 </div>
//                 <Button variant="mButton" className="px-6 py-3 text-white">
//                     Pay Now
//                 </Button>
//             </div>

//             {/* Section 2: Transaction History */}
//             <div className="text-xl font-bold text-dGreen">Transaction History</div>
//             <table className="w-full border-collapse border border-green-600 text-center">
//                 <thead>
//                     <tr className="bg-green-600 text-white">
//                         <th className="border border-green-600 p-2">OR No.</th>
//                         <th className="border border-green-600 p-2">Date</th>
//                         <th className="border border-green-600 p-2">Amount Paid</th>
//                         <th className="border border-green-600 p-2">Method</th>
//                         <th className="border border-green-600 p-2">Reference No.</th>
//                         <th className="border border-green-600 p-2">Remarks</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactionHistory.map((tx, index) => (
//                         <tr key={index} className="border border-green-600">
//                             <td className="border border-green-600 p-2">{tx.orNo}</td>
//                             <td className="border border-green-600 p-2">{tx.date}</td>
//                             <td className="border border-green-600 p-2">₱{tx.amount.toLocaleString()}</td>
//                             <td className="border border-green-600 p-2">{tx.method}</td>
//                             <td className="border border-green-600 p-2">{tx.refNo}</td>
//                             <td className="border border-green-600 p-2">{tx.remarks}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };


"use client";
import { Button } from "@/components/ui/button";

export const PaymentPage = () => {
    const outstandingBalance = 2000;

    const allTransactions = [
        {
            date: "2025-03-01",
            amount: 3000,
            method: "GCASH",
            refNo: "GC123456",
            remarks: "Initial Payment",
        },
        {
            date: "2025-04-01",
            amount: 2000,
            method: "Cash",
            refNo: "-",
            remarks: "Cash at cashier",
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

            {/* Section 2: Filter-like UI (just for look) */}
            <div className="bg-white p-4  rounded-lg flex flex-wrap gap-4 items-center">
                {/* Date Inputs */}
                <input
                    type="date"
                    placeholder="From Date"
                    className="border border-gray-400 p-2 rounded"
                    disabled
                />
                <input
                    type="date"
                    placeholder="To Date"
                    className="border border-gray-400 p-2 rounded"
                    disabled
                />

                {/* Reference No. Input */}
                <input
                    type="text"
                    placeholder="Reference No."
                    className="border border-gray-400 p-2 rounded"
                    disabled
                />

                {/* Payment Method Dropdown */}
                <select
                    className="border border-gray-400 p-2 rounded"
                    disabled
                >
                    <option value="">All Methods</option>
                    <option value="GCASH">GCASH</option>
                    <option value="Cash">Cash</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank">Bank</option>
                </select>

                {/* Clear Filters Button */}
                <Button
                    variant="mButton"
                    className="text-white px-6 rounded-lg" 
                >
                    Clear Filter
                </Button>
            </div>

            {/* Section 3: Transaction History */}
            <div className="text-xl font-bold text-dGreen">Transaction History</div>
            <table className="w-full border-collapse border border-green-600 text-center">
                <thead>
                    <tr className="bg-green-600 text-white">
                        <th className="border border-green-600 p-2">Date</th>
                        <th className="border border-green-600 p-2">Amount Paid</th>
                        <th className="border border-green-600 p-2">Method</th>
                        <th className="border border-green-600 p-2">Reference No.</th>
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
                                <td className="border border-green-600 p-2">{tx.refNo}</td>
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
