// "use client"

// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { getStudentSOA } from "@/src/actions/cashierAction";
// import { StudentSOAData } from "@/src/type/CASHIER/STUDENT/student";
// import { useShowSOAModal } from "@/src/store/CASHIER/student";

// export const SOA = () => {
//   const { isOpen, close, selectedLRN } = useShowSOAModal();
//   const [soaData, setSoaData] = useState<StudentSOAData | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchSOAData = async () => {
//       if (selectedLRN && isOpen) {
//         setLoading(true);
//         try {
//           const data = await getStudentSOA(selectedLRN);
//           setSoaData(data);
//         } catch (error) {
//           console.error("Error fetching SOA data:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchSOAData();
//   }, [selectedLRN, isOpen]);

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-PH', {
//       style: 'currency',
//       currency: 'PHP',
//       minimumFractionDigits: 2
//     }).format(amount);
//   };

//   const formatDate = (date: string | null) => {
//     if (!date) return "";
//     return new Date(date).toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: '2-digit'
//     });
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={close}>
//       <DialogContent className="w-[700px] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
//         <DialogHeader>
//           <DialogTitle 
//             className="text-2xl font-bold text-white bg-dGreen h-[60px] items-center justify-center flex"
//           >
//             Statement of Account
//           </DialogTitle>
//         </DialogHeader>

//         {loading ? (
//           <div className="px-4 py-8 text-center">
//             <p>Loading...</p>
//           </div>
//         ) : soaData ? (
//           <div className="px-4 py-4 space-y-4 text-sm text-gray-800">
//             <div className="space-y-1">
//               <p><strong>Student Name:</strong> {soaData.student.lastName}, {soaData.student.firstName} {soaData.student.middleName} {soaData.student.suffix}</p>
//               <p><strong>LRN:</strong> {soaData.student.lrn}</p>
//               <p><strong>School Year:</strong> 2025 - 2026</p>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full border text-xs">
//                 <thead className="bg-gray-200 text-gray-700">
//                   <tr>
//                     <th className="px-2 py-1 border">Payment</th>
//                     <th className="px-2 py-1 border">Amount</th>
//                     <th className="px-2 py-1 border">Date</th>
//                     <th className="px-2 py-1 border">SI Number</th>
//                     <th className="px-2 py-1 border">Remarks</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Down Payment Row */}
//                   {soaData.downPayment && (
//                     <tr>
//                       <td className="px-2 py-1 border">Downpayment (upon enrollment)</td>
//                       <td className="px-2 py-1 border">{formatCurrency(soaData.downPayment.amount)}</td>
//                       <td className="px-2 py-1 border">-</td>
//                       <td className="px-2 py-1 border">{soaData.downPayment.SINumberDP}</td>
//                       <td className="px-2 py-1 border">{soaData.downPayment.remarksDP}</td>
//                     </tr>
//                   )}
                  
//                   {/* Monthly Payments */}
//                   {soaData.monthlyPayments.map((payment, i) => (
//                     <tr key={i}>
//                       <td className="px-2 py-1 border">{payment.month}</td>
//                       <td className="px-2 py-1 border">{formatCurrency(payment.monthlyDue)}</td>
//                       <td className="px-2 py-1 border">{formatDate(payment.dateOfPayment)}</td>
//                       <td className="px-2 py-1 border">{payment.SInumber || ""}</td>
//                       <td className="px-2 py-1 border">{payment.remarks || ""}</td>
//                     </tr>
//                   ))}
                  
//                   {/* Summary Rows */}
//                   <tr className="font-bold bg-yellow-100">
//                     <td className="px-2 py-1 border text-right" colSpan={4}>Remaining Balance</td>
//                     <td className="px-2 py-1 border">{formatCurrency(soaData.totals.remainingBalance)}</td>
//                   </tr>
//                   <tr className="font-bold bg-yellow-200">
//                     <td className="px-2 py-1 border text-right" colSpan={4}>Total Amount Due</td>
//                     <td className="px-2 py-1 border text-red-600">{formatCurrency(soaData.totals.totalAmountDue)}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : (
//           <div className="px-4 py-8 text-center">
//             <p>No SOA data found for this student.</p>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   )
// }
