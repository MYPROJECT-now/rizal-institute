// "use client";
// import { Button } from "@/components/ui/button";
// import { getStudentData, getStudentTransactionHistory } from "@/src/actions/studentAction";
// import { useEffect, useState } from "react";
// import { PaymentModal } from "./payment";
// import { usePaymentModal } from "@/src/store/payment";

// interface Transaction {
//   date: string | null;
//   amount: number;
//   method: string;
//   siNumber: string | null;
//   status: string;
//   proofOfPayment: string | null;
// }

// export const PaymentPage = () => {
//     // const outstandingBalance = 1500;
//     const [outstandingBalance, setOutstandingBalance] = useState<number|null>(null);
//     const [transactions, setTransactions] = useState<Transaction[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const { open } = usePaymentModal();

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//             const data = await getStudentData();
//             // Only set if data is an object and has outstandingBalance
//             if (data && typeof data === 'object' && 'outstandingBalance' in data) {
//                 setOutstandingBalance((data as any).outstandingBalance ?? 0);
//             } else {
//                 setOutstandingBalance(0);
//             }

//             // Fetch transaction history
//             await fetchTransactionHistory();
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setOutstandingBalance(0);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchTransactionHistory = async () => {
//         try {
//             const result = await getStudentTransactionHistory();
//             if (result.success && result.transactions) {
//                 // Filter out transactions with null dates and format the date
//                 const validTransactions = result.transactions
//                     .filter(tx => tx.date !== null)
//                     .map(tx => ({
//                         ...tx,
//                         date: tx.date ? new Date(tx.date).toLocaleDateString() : 'N/A'
//                     }));
//                 setTransactions(validTransactions);
//             } else {
//                 console.error('Failed to fetch transaction history:', result.error);
//                 setTransactions([]);
//             }
//         } catch (error) {
//             console.error('Error fetching transaction history:', error);
//             setTransactions([]);
//         }
//     };

//     const handlePaymentSuccess = () => {
//         // Refresh data after successful payment
//         fetchData();
//     };

//     return (
//         <div className="flex flex-col gap-6 p-6">
//             {/* Section 1: Balance Summary */}
//             <div className="text-xl font-bold text-dGreen">Tuition Balance</div>
//             <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between">
//                 <div className="text-lg font-semibold">
//                     Outstanding Balance: <span className="text-red-600">₱{outstandingBalance === null ? 'Loading...' : outstandingBalance.toLocaleString()}</span>
//                 </div>
//                 <PaymentModal />
//                 <Button 
//                 onClick={open}
//                 variant="mButton" className="px-6 py-3 text-white">
//                     Pay Now
//                 </Button>
//             </div>

//             {/* Section 2: Filter UI */}
//             <div className="bg-white p-4 rounded-lg flex flex-wrap gap-4 items-center">
//                 <input type="date" className="border border-gray-400 p-2 rounded" disabled />
//                 <input type="date" className="border border-gray-400 p-2 rounded" disabled />
//                 <input type="text" placeholder="SI Number" className="border border-gray-400 p-2 rounded" disabled />
//                 <select className="border border-gray-400 p-2 rounded" disabled>
//                     <option value="">All Methods</option>
//                     <option value="GCash">GCash</option>
//                     <option value="Cash">Cash</option>
//                     <option value="Bank">Bank</option>
//                 </select>
//                 <Button variant="mButton" className="text-white px-6 rounded-lg">
//                     Clear Filter
//                 </Button>
//             </div>

//             {/* Section 3: Transaction History */}
//             <div className="text-xl font-bold text-dGreen">Transaction History</div>
//             {isLoading ? (
//                 <div className="text-center py-8">
//                     <p className="text-gray-600">Loading transaction history...</p>
//                 </div>
//             ) : (
//                 <table className="w-full border-collapse border border-green-600 text-center">
//                     <thead>
//                         <tr className="bg-green-600 text-white">
//                             <th className="border border-green-600 p-2">Date</th>
//                             <th className="border border-green-600 p-2">Amount</th>
//                             <th className="border border-green-600 p-2">Method</th>
//                             <th className="border border-green-600 p-2">SI Number</th>
//                             <th className="border border-green-600 p-2">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {transactions.length > 0 ? (
//                             transactions.map((tx, index) => (
//                                 <tr key={index} className="border border-green-600">
//                                     <td className="border border-green-600 p-2">{tx.date || 'N/A'}</td>
//                                     <td className="border border-green-600 p-2">₱{tx.amount.toLocaleString()}</td>
//                                     <td className="border border-green-600 p-2">{tx.method}</td>
//                                     <td className="border border-green-600 p-2">{tx.siNumber || "—"}</td>
//                                     <td className="border border-green-600 p-2">
//                                         <span className={`px-2 py-1 rounded text-sm ${
//                                             tx.status === 'Approved' ? 'bg-green-100 text-green-800' :
//                                             tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                                             'bg-red-100 text-red-800'
//                                         }`}>
//                                             {tx.status}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={5} className="p-4 text-gray-600">No transactions found.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };
