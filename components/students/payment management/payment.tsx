// "use client";

// import { ChangeEvent, useRef, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { usePaymentModal } from "@/src/store/payment";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { usePreviewModal } from "@/src/store/preview";
// import { PreviewModal } from "@/components/landing_page_portal/preview/preview_modal";
// // import { submitStudentPayment, getStudentUnpaidMonths } from "@/src/actions/studentAction";
// import { useEffect } from "react";

// interface UnpaidMonth {
//   month_id: number;
//   month: string;
//   amount: number;
//   dateOfPayment: string | null;
//   totalPaid: number;
//   remainingBalance: number;
// }

// export const PaymentModal = () => {
//   const { isOpen, close } = usePaymentModal();
//   const { open: openPreview } = usePreviewModal();
  
//   const [unpaidMonths, setUnpaidMonths] = useState<UnpaidMonth[]>([]);
//   const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
//   const [modeOfPayment, setModeOfPayment] = useState<string>("");
//   const [receipt, setReceipt] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [customAmount, setCustomAmount] = useState<string>("");
//   const [selectedMonthData, setSelectedMonthData] = useState<UnpaidMonth | null>(null);

//   const receiptRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (isOpen) {
//       fetchUnpaidMonths();
//     }
//   }, [isOpen]);

//   const fetchUnpaidMonths = async () => {
//     try {
//       const result = await getStudentUnpaidMonths();
//       if (result.success && result.unpaidMonths) {
//         setUnpaidMonths(result.unpaidMonths);
//       } else {
//         toast.error(result.error || 'Failed to fetch unpaid months');
//       }
//     } catch (error) {
//       toast.error('Failed to fetch unpaid months');
//     }
//   };

//   const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const monthId = parseInt(e.target.value);
//     setSelectedMonth(monthId);
    
//     // Set the selected month data but don't auto-fill amount
//     const selectedMonthData = unpaidMonths.find(month => month.month_id === monthId);
//     if (selectedMonthData) {
//       setSelectedMonthData(selectedMonthData);
//       setCustomAmount(""); // Don't auto-fill, let user enter amount manually
//     } else {
//       setSelectedMonthData(null);
//       setCustomAmount("");
//     }
//   };

//   const handleModeOfPaymentChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setModeOfPayment(e.target.value);
//   };

//   const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // Only allow numbers and decimal point
//     if (/^\d*\.?\d*$/.test(value) || value === "") {
//       setCustomAmount(value);
//     }
//   };

//   const handleReceiptChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setReceipt(file);
//     }
//   };

//   const previewImage = (file: File | null) => {
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (typeof reader.result === "string") {
//         openPreview(reader.result);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async () => {
//     if (!selectedMonth) {
//       toast.error("Please select a month to pay");
//       return;
//     }

//     if (!modeOfPayment) {
//       toast.error("Please select a mode of payment");
//       return;
//     }

//     if (!customAmount || parseFloat(customAmount) <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     if (!receipt) {
//       toast.error("Please upload a receipt");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Upload image to Cloudinary
//       const uploadImage = async (file: File) => {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'my_preset');
//         formData.append('folder', 'paymentReceipts');

//         const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         const data = await response.json();
//         return data.secure_url;
//       };

//       const uploadedReceiptUrl = await uploadImage(receipt);

//       // Submit payment with custom amount
//       const result = await submitStudentPayment(
//         parseFloat(customAmount),
//         modeOfPayment,
//         uploadedReceiptUrl,
//         selectedMonth,
//         undefined // Remove SI Number for now
//       );

//       if (result.success) {
//         toast.success(result.message || "Payment submitted successfully!");
//         close();
//         // Reset form
//         setSelectedMonth(null);
//         setSelectedMonthData(null);
//         setModeOfPayment("");
//         setReceipt(null);
//         setCustomAmount("");
//         if (receiptRef.current) receiptRef.current.value = "";
//         // Refresh unpaid months
//         fetchUnpaidMonths();
//       } else {
//         toast.error(result.error || "Failed to submit payment");
//       }
//     } catch (error) {
//       toast.error("Failed to submit payment");
//       console.error('Error submitting payment:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={close}>
//       <DialogContent className="flex flex-col items-center h-[600px] w-[600px] rounded-t-lg overflow-y-auto">
//         <DialogHeader className="h-[70px] w-full rounded-t-lg bg-dGreen flex items-center justify-center">
//           <DialogTitle className="text-center text-white text-2xl">Payment</DialogTitle>
//         </DialogHeader>
        
//         <PreviewModal />
        
//         <div className="w-full p-6 space-y-6">
//           {/* Month Selection */}
//           <div className="space-y-2">
//             <label className="font-semibold text-dGreen text-lg">Select Month to Pay:</label>
//             <select
//               value={selectedMonth || ""}
//               onChange={handleMonthChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dGreen"
//             >
//               <option value="">Select a month</option>
//               {unpaidMonths.map((month) => (
//                 <option key={month.month_id} value={month.month_id}>
//                   {month.month} - Remaining: ₱{month.remainingBalance.toLocaleString()}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Custom Amount Input */}
//           <div className="space-y-2">
//             <label className="font-semibold text-dGreen text-lg">Payment Amount:</label>
//             <div className="space-y-2">
//               <input
//                 type="text"
//                 value={customAmount}
//                 onChange={handleCustomAmountChange}
//                 placeholder="Enter amount to pay"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dGreen"
//               />
//               {selectedMonthData && (
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <p className="font-semibold text-dGreen">Put amount to pay</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mode of Payment */}
//           <div className="space-y-2">
//             <label className="font-semibold text-dGreen text-lg">Mode of Payment:</label>
//             <select
//               value={modeOfPayment}
//               onChange={handleModeOfPaymentChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dGreen"
//             >
//               <option value="">Select payment method</option>
//               <option value="GCash">GCash</option>
//               <option value="Bank Transfer">Bank Transfer</option>
//               <option value="OTC">Over the Counter (OTC)</option>
//             </select>
//           </div>

//           {/* Receipt Upload */}
//           <div className="space-y-2">
//             <label className="font-semibold text-dGreen text-lg">Upload Receipt:</label>
//             {receipt ? (
//               <div className="flex items-center gap-2 w-full">
//                 <button
//                   type="button"
//                   onClick={() => previewImage(receipt)}
//                   className="text-dGreen underline text-sm bg-gray-200 rounded flex-1 text-left truncate p-3 w-full"
//                   title="Click to preview"
//                 >
//                   {receipt.name}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setReceipt(null);
//                     if (receiptRef.current) receiptRef.current.value = "";
//                   }}
//                   className="text-red-500 hover:text-red-700 font-bold"
//                   title="Remove file"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ) : (
//               <input
//                 type="file"
//                 ref={receiptRef}
//                 accept="image/*"
//                 onChange={handleReceiptChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dGreen"
//               />
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center pt-4">
//             <Button
//               onClick={handleSubmit}
//               disabled={isSubmitting || !selectedMonth || !modeOfPayment || !receipt || !customAmount || parseFloat(customAmount) <= 0}
//               variant="mButton"
//               className="w-full h-[45px] text-xl rounded-xl"
//             >
//               {isSubmitting ? "Submitting..." : "Submit Payment"}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
